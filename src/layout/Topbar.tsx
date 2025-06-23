import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { Dropdown } from "react-bootstrap";
import { getAuth, signOut } from "firebase/auth";
import { firebaseApp } from "src/service/firebase";
import { useState } from "react";
import { stopLoading } from "src/redux/reducers/auth.reducer";

export default function Topbar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [search, setSearch] = useState("");
  const handleLogout = () => {
    const auth = getAuth(firebaseApp);
    signOut(auth)
      .then(() => {
        localStorage.clear();
        window.location.href = "/login";
        dispatch(stopLoading())
      })
      .catch((error) => {
        console.log("Logout error:", error);
      });
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
        {import.meta.env.VITE_APP_NAME}
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                aria-current="page"
                to="/friends"
              >
                Friends
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/chat">
                Chat
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                aria-current="page"
                to="/profile"
              >
                Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                aria-current="page"
                to="/peoples"
              >
                Peoples
              </NavLink>
            </li>
          </ul>
          <div className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={() => {
              navigate(`/peoples?search=${search}`);
            }} className="btn btn-outline-success" type="submit">
              Search
            </button>
          </div>
          
          <Dropdown>
            <Dropdown.Toggle as='div' id="dropdown-basic">
            <img
            src={user?.photoURL}
            alt="profile"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              marginLeft: 10,
            }}
            className="dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item  disabled>{user?.displayName}</Dropdown.Item>
              <Dropdown.Item  disabled>{user?.email}</Dropdown.Item>
              <Dropdown.Item  onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
}
