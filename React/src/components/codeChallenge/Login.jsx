import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import usersService from "../../services/usersService";
import { toast } from "react-toastify";

function Login(props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    tenantId: "U03N9SMR39B",
  });

  const navigate = useNavigate();

  const onFormFieldChange = (e) => {
    //console.log(e)

    const target = e.target;
    const name = e.target.name;
    const value = target.value;

    const updatedFormData = { ...formData };

    setFormData(() => {
      updatedFormData[name] = value;
      return updatedFormData;
    });
  };

  const onSubmitClick = (e) => {
    e.preventDefault();
    var onLoginSuccess = () => {
      props.setUser((prevState) => {
        const newData = { ...prevState };
        newData.id = "";
        newData.firstName = "";
        newData.lastName = "";
        newData.email = "";
        newData.avatarUrl = "";
        newData.loggedIn = false;

        return newData;
      });
      //console.log(props.user);
      navigate("/");
      toast.success("You are now logged in");
    };
    var onLoginError = () => {
      toast.error("Could not sign in");
    };
    //console.log(formData);
    usersService.login(formData).then(onLoginSuccess).catch(onLoginError);
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    className="img-fluid"
                    src="https://sabio-apps-pub.s3-us-west-2.amazonaws.com/RCB/199ccec6-f4b7-4358-9b6d-1e4c4209919f/IMG-0798.jpg"
                    alt="img here"
                    style={{
                      borderRadius: "1rem 0 0 1rem",
                      objectFit: "cover",
                      height: "100%",
                    }}
                  />
                </div>

                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i
                          className="fas fa-cubes fa-2x me-3"
                          style={{ color: "orange" }}
                        ></i>
                        <span className="h1 fw-bold mb-0">Login</span>
                      </div>

                      <h5
                        className="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: "1px" }}
                      >
                        Sign into your account
                      </h5>
                      <div className="form-outline mb-4">
                        <label htmlFor="emailInput" className="form-label">
                          Email Address
                        </label>
                        <input
                          placeholder="bobbobberson@email.com"
                          value={formData.email}
                          onChange={onFormFieldChange}
                          type="text"
                          id="email"
                          className="form-control form-control-lg"
                          name="email"
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <label htmlFor="passwordInput" className="form-label">
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          value={formData.password}
                          onChange={onFormFieldChange}
                          className="form-control form-control-lg"
                          name="password"
                        />
                      </div>
                      <div className="pt-1 mb-4">
                        <button
                          onClick={onSubmitClick}
                          className="btn btn-dark btn-lg btn-block"
                          type="submit"
                          id="loginButton"
                        >
                          Login
                        </button>
                      </div>

                      <a href="#!" className="small text-muted">
                        Forgot Password?
                      </a>
                      <p className="mb-5 pb-lg-2" style={{ color: "393f81" }}>
                        Don't have an account?{" "}
                        <Link to="/register" style={{ paddingLeft: "5px" }}>
                          Register here
                        </Link>
                      </p>
                      <p>
                        <a href="#!" className="small text-muted">
                          Terms of use
                        </a>
                      </p>
                      <p>
                        <a href="#!" className="small text-muted">
                          Privacy Policy
                        </a>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
