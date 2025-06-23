import axios from "axios";
import { get } from "lodash";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { setSnack } from "src/redux/reducers/snack.reducer";
import { Icon } from "@iconify/react";
/* eslint-disable @typescript-eslint/no-explicit-any */

export default function CreatePostComponent() {
  const dispatch = useAppDispatch();
  const [showMediaDialog, setShowMediaDialog] = React.useState(false);
  const [media, setMedia] = React.useState<any>(null);
  const [value, setValue] = React.useState<string>("");
  const photoInputRef = React.useRef<HTMLInputElement>(null);
  const videoInputRef = React.useRef<HTMLInputElement>(null);
  const { user, socket } = useAppSelector((state) => ({
    user: state.auth.user,
    socket: state.socket.socket,
  }));

  function convertFileToDataURL(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  async function handleCreatePost() {
    try {
      setShowMediaDialog(false);
      let obj: any = {
        content: value,
        type: "text",
        text: value,
        owner: user?._id,
      };
      if (media) {
        const formData = new FormData();
        formData.append("file", media.file);
        const { data } = await axios.post(
          `${import.meta.env.VITE_express_server}/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        obj = {
          ...obj,
          type: media.type.includes("image")
            ? "image"
            : media.type.includes("video")
            ? "video"
            : "text",
          content: data.fileUrl,
        };
      }
      socket?.emit("create-post", obj);
      setValue("");
    } catch (error: any) {
      dispatch(setSnack({ open: true, message: error.message, type: "error" }));
    }
  }
  return (
    <div
      className="p-4 mb-4"
      style={{
        border: "1px solid lightgray",
        width: "calc(100% - 24px)",
        margin: "auto",
      }}
    >
      <h2>Create Post</h2>
      <Modal
        show={showMediaDialog}
        onHide={() => {
          setShowMediaDialog(false);
          setMedia(null);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Media</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {media && (
            <>
              {media.type.includes("image") ? (
                <img
                  src={media.url}
                  style={{ objectFit: "cover" }}
                  className="rounded mb-4"
                  width="100%"
                  height={300}
                />
              ) : (
                <video
                  src={media.url}
                  width="100%"
                  height={300}
                  controls
                ></video>
              )}
            </>
          )}
          <input
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCreatePost();
              }
            }}
            className="form-control p-3"
            placeholder="Type a message"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowMediaDialog(false);
              setMedia(null);
              setValue("");
            }}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreatePost}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <input
        type="file"
        ref={photoInputRef}
        accept="image/*"
        style={{ display: "none" }}
        id="image"
        onChange={async (e) => {
          const file: any = get(e, "target.files[0]", null);
          if (file) {
            const url = await convertFileToDataURL(file);
            setMedia({
              url,
              type: file.type,
              file,
            });
            setShowMediaDialog(true);
          }
        }}
      />
      <input
        type="file"
        ref={videoInputRef}
        accept="video/*"
        style={{ display: "none" }}
        id="video"
        onChange={async (e) => {
          const file: any = get(e, "target.files[0]", null);
          try {
            if (file) {
              const url = await convertFileToDataURL(file);
              setMedia({
                url,
                type: file.type,
                file,
              });
              setShowMediaDialog(true);
            }
          } catch (error: any) {
            console.log(error.message);
          }
        }}
      />
      <div className="form-outline">
        <input
          type="file"
          ref={photoInputRef}
          accept="image/*"
          style={{ display: "none" }}
          id="image"
          onChange={async (e) => {
            const file: any = get(e, "target.files[0]", null);
            if (file) {
              const url = await convertFileToDataURL(file);
              setMedia({
                url,
                type: file.type,
                file,
              });
              setShowMediaDialog(true);
            }
          }}
        />
        <input
          type="file"
          ref={videoInputRef}
          accept="video/*"
          style={{ display: "none" }}
          id="video"
          onChange={async (e) => {
            const file: any = get(e, "target.files[0]", null);
            try {
              if (file) {
                const url = await convertFileToDataURL(file);
                setMedia({
                  url,
                  type: file.type,
                  file,
                });
                setShowMediaDialog(true);
              }
            } catch (error: any) {
              console.log(error.message);
            }
          }}
          onAbort={(e) => {
            console.log(e);
          }}
        />
        <div className="d-flex mb-2">
          <button
            className="border-0"
            onClick={() => videoInputRef.current?.click()}
          >
            <Icon style={{ fontSize: 24 }} icon="mingcute:video-fill" />
          </button>
          <button
            className="border-0 ms-2"
            onClick={() => photoInputRef.current?.click()}
          >
            <Icon style={{ fontSize: 24 }} icon="ic:outline-image" />
          </button>
        </div>
        <input
          className="form-control p-3"
          id="textAreaExample2"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              socket?.emit("create-post", {
                content: e.currentTarget.value,
                type: "text",
                text: e.currentTarget.value,
                owner: user?._id,
              });
              setValue("");
            }
          }}
          placeholder="Type a message"
        />
      </div>
    </div>
  );
}
