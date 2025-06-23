/* eslint-disable @typescript-eslint/no-explicit-any */
import Page from "components/Page";
import "./profile.css";
import { useEffect, useRef } from "react";
import { setSnack } from "src/redux/reducers/snack.reducer";
import { setUser } from "src/redux/reducers/auth.reducer";
import { setProfile } from "src/redux/reducers/profile.reducer";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { useParams } from "react-router-dom";
export default function Profile() {
  const params = useParams();
  const profileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { socket, user, profileData } = useAppSelector((state) => ({
    socket: state.socket.socket,
    user: state.auth.user,
    profileData: state.profile.data,
  }));

  const { control, getValues, setValue } = useForm({
    defaultValues: {
      displayName: "",
      email: "",
      phoneNumber: "",
      dob: new Date(),
      address: "",
    },
  });

  async function saveProfile() {
    const values = getValues();
    const obj = { ...values, _id: profileData?._id };
    socket?.emit("update-profile", obj);
    dispatch(setProfile(obj));
    dispatch(
      setSnack({ open: true, message: "Profile updated", type: "success" })
    );
  }

  async function handleFileUpload(
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) {
    try {
      if (e.target.files) {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        const { data } = await axios.post(
          `${import.meta.env.VITE_express_server}/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const obj = {
          ...profileData,
          [type]: data.fileUrl,
        };
        socket?.emit("update-profile", obj);
        dispatch(setProfile(obj));
        dispatch(
          setUser({
            ...user,
            [type]: data.fileUrl,
          })
        );
        dispatch(
          setSnack({ open: true, message: "Profile updated", type: "success" })
        );
      }
    } catch (error: any) {
      dispatch(setSnack({ open: true, message: error.message, type: "error" }));
    }
  }
  useEffect(() => {
    if (socket && user?._id && !profileData) {
      const tempId = params.id || user?._id;
      socket.emit("get-profile-request", tempId);
    }
    if (profileData) {
      setValue("displayName", profileData.displayName);
      setValue("email", profileData.email);
      setValue("phoneNumber", profileData.phoneNumber);
      setValue("dob", new Date(profileData.dob));
      setValue("address", profileData.address);
    }
  }, [
    params.id,
    socket,
    user?._id,
    dispatch,
    user?.email,
    profileData,
    setValue,
  ]);
  return (
    <Page title="Profile">
      <div className="container">
        <input
          ref={coverInputRef}
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => handleFileUpload(e, "cover")}
        />
        <input
          ref={profileInputRef}
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => handleFileUpload(e, "photoURL")}
        />
        <div className="row">
          {/* <div className="col-md-5  toppad  pull-right col-md-offset-3 ">
            <a href="edit.html">Edit Profile</a>

            <a href="edit.html">Logout</a>
            <br />
            <p className=" text-info">May 05,2014,03:00 pm </p>
          </div> */}
          <div className="toppad">
            <div className="panel panel-info">
              <div className="panel-heading">
                <h3 className="panel-title">{profileData?.displayName}</h3>
              </div>
              <div className="panel-body">
                <div className="row">
                  <div
                    className="col-md-3 col-lg-3 "
                    style={{ alignItems: "center" }}
                  >
                    <img
                      alt="User Pic"
                      src={user?.photoURL}
                      className="img-circle img-responsive"
                      style={{
                        width: 200,
                        height: 200,
                      }}
                    />{" "}
                  </div>

                  <div className=" col-md-9 col-lg-9">
                    <table className="table table-user-information">
                      <tbody>
                        <tr>
                          <td>Full Name:</td>
                          <td>
                            <Controller
                              name="displayName"
                              control={control}
                              render={({ field }) => (
                                <input
                                  type="text"
                                  className="form-control"
                                  id="fullName"
                                  placeholder="Enter full name"
                                  {...field}
                                />
                              )}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Email:</td>
                          <td>
                            <Controller
                              name="email"
                              control={control}
                              render={({ field }) => (
                                <input
                                  type="email"
                                  disabled
                                  className="form-control"
                                  id="email"
                                  placeholder="Enter email"
                                  {...field}
                                />
                              )}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Date of Birth</td>
                          <td>
                            <Controller
                              name="dob"
                              control={control}
                              render={({ field }) => (
                                <input
                                  type="date"
                                  className="form-control"
                                  id="dob"
                                  {...field}
                                />
                              )}
                            />
                          </td>
                        </tr>

                        <tr>
                          <td>Phone Number</td>
                          <td>
                            <Controller
                              name="phoneNumber"
                              control={control}
                              render={({ field }) => (
                                <input
                                  type="phone"
                                  className="form-control"
                                  id="phoneNumber"
                                  placeholder="Enter phone number"
                                  {...field}
                                />
                              )}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Home Address</td>
                          <td>
                            <Controller
                              name="address"
                              control={control}
                              render={({ field }) => (
                                <input
                                  type="text"
                                  className="form-control"
                                  id="address"
                                  placeholder="Enter Address"
                                  {...field}
                                />
                              )}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <button
                      onClick={saveProfile}
                      type="button"
                      id="submit"
                      name="submit"
                      className="btn btn-primary ms-2"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
