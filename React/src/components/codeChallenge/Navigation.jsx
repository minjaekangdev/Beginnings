import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import usersService from "../../services/usersService";

function NavigationBar(props) {
  const navigate = useNavigate();
  const onLogOutClick = (e) => {
    e.preventDefault();

    var onLogOutSuccess = (response) => {
      console.log(response);
      toast.success("You have been logged out");
      props.setUser(() => {
        const removeUser = {
          id: "",
          firstName: "",
          lastName: "",
          email: "",
          avatarUrl: "",
          loggedIn: false,
        };
        return removeUser;
      });
    };
    var onLogOutError = (error) => {
      console.log(error);
      toast.error("An error occurred");
    };
    usersService.logout().then(onLogOutSuccess).catch(onLogOutError);
    navigate("/");
  };
  return (
    <React.Fragment>
      <nav
        className="navbar navbar-expand-md navbar-dark bg-dark"
        aria-label="Fourth navbar example"
      >
        <div className="container">
          <a className="navbar-brand" href="/">
            <img
              src="https://pw.sabio.la/images/Sabio.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Sabio"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample04"
            aria-controls="navbarsExample04"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExample04">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <Link to="/" className="nav-link px-2 text-white link-button">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/friends"
                  className="nav-link px-2 text-white link-button"
                >
                  Friends
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/jobs"
                  className="nav-link px-2 text-white link-button"
                >
                  Jobs
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/techcompanies"
                  className="nav-link px-2 text-white link-button"
                >
                  Tech Companies
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/events"
                  className="nav-link px-2 text-white link-button"
                >
                  Events
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/upload"
                  className="nav-link px-2 text-white link-button"
                >
                  Test and Ajax Call
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/checkout"
                  className="nav-link px-2 text-white link-button"
                >
                  Checkout
                </Link>
              </li>
            </ul>
            <div className="text-end" style={{ width: "30%" }}>
              <a
                href="/"
                className="align-items-center mb-2 me-2 mb-lg-0 text-white text-decoration-none font-weight-bold"
              >
                {props.user.firstName} {props.user.lastName}
              </a>
              {props.user.loggedIn && (
                <>
                  <img
                    className="rounded-circle"
                    // src={job.techCompany.images[0].imageUrl}
                    //placeholder image
                    src={props.user.avatarUrl}
                    style={{
                      objectFit: "cover",
                      width: "10%",
                      height: "10%",
                      border: "1px solid lightgrey",
                    }}
                    alt="avatar"
                  />

                  <Link
                    onClick={onLogOutClick}
                    to="/"
                    type="button"
                    className="btn btn-outline-light me-2"
                  >
                    Logout
                  </Link>
                </>
              )}
              {!props.user.loggedIn && (
                <>
                  <Link
                    to="/login"
                    type="button"
                    className="btn btn-outline-light me-2"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    type="button"
                    className="btn btn-warning"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default NavigationBar;
