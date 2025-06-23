import { Button, Form, Modal } from "react-bootstrap";
import { useAppSelector } from "src/redux/hooks";

interface CommentDialogProps {
  _id: string;
  value: string;
  onChange: (value: string) => void;
  show: boolean;
  onClose: (show: boolean) => void;
}

export default function CommentDialog({
  onClose,
  show,
  _id,
  value,
  onChange,
}: CommentDialogProps) {
  const handleClose = () => onClose(false);
  const { user, socket } = useAppSelector((state) => ({
    user: state.auth.user,
    socket: state.socket.socket,
  }));

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Comment on this post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Type something here..."
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            socket?.emit("comment-post", {
              post_id: _id,
              user_id: user._id,
              text: value,
            });
            onChange("");
            onClose(false);
          }}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
