import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Alert from "react-bootstrap/Alert";
import { Button, Popover, Space, Checkbox} from "antd";
import { Form, Dropdown } from "react-bootstrap";
import { Spin, message } from "antd";
import {
  validateConfirmPassword,
  validateName,
  validateMobilePhone,
  validatePassword,
  validateConfirmEmail,
} from "./validate";

const RegisterhtmlForm = () => {
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();
  const [usernameError, setUsernameError] = useState("");
  const [mobileNumError, setMobileNumError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPwdError, setConfirmPwdError] = useState("");
  const [confirmEmailError, setConfirmEmailError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [err, setErr] = useState("");
  const checkLogin =
    typeof window !== "undefined" ? localStorage.getItem("isLoggedIn") : null;

  if (checkLogin) {
    router.push("/");
  }

  const content = [
    <div className="d-flex flex-column">
      <div className="content-1">
        <span style={{ fontWeight: "bold" }}>Customer: </span>
        <span>Who want attend and buy course</span>
      </div>
      <div className="content-2">
        <span style={{ fontWeight: "bold" }}>Instructor: </span>{" "}
        <span>Who want share and sell my course</span>
      </div>
    </div>,
    <div className="d-flex flex-column">
      <span>This option will help us more understand about you.</span>
      <span>Instructor will easily to contact with you.</span>
    </div>,
  ];

  const [formData, setFormData] = useState({
    username: "",
    skillId: 1,
    pwd: "",
    confirmEmail: "",
    email: "",
    mobileNum: "",
    confirmPwd: "",
    fullName: "",
    roleName: "CUSTOMER",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let isValid = true;
    let dataValidate = validateName(formData.username);
    // Validate username
    if (dataValidate.isError) {
      setUsernameError(dataValidate.message);
      isValid = false;
    } else {
      setUsernameError("");
    }

    // Validate mobile number (assuming it should be exactly 10 digits)
    dataValidate = validateMobilePhone(formData.mobileNum);
    if (dataValidate.isError) {
      setMobileNumError(dataValidate.message);
      isValid = false;
    } else {
      setMobileNumError("");
    }

    dataValidate = validateConfirmEmail(formData.email, formData.confirmEmail);
    if (dataValidate.isError) {
      setConfirmEmailError(dataValidate.message);
      isValid = false;
    } else {
      setConfirmEmailError("");
    }

    // Validate password (assuming it must be at least 8 characters long)
    dataValidate = validatePassword(formData.pwd);
    if (dataValidate.isError) {
      setPasswordError(dataValidate.message);
      isValid = false;
    } else {
      setPasswordError("");
    }

    dataValidate = validateConfirmPassword(formData.pwd, formData.confirmPwd);
    if (dataValidate.isError) {
      setConfirmPwdError(dataValidate.message);
      isValid = false;
    } else {
      setConfirmPwdError("");
    }

    return isValid;
  };

  const error = () => {
    message.error(err);
    message.config({
      maxCount: 3,
    });
    setErr("");
  };

  const success = () => {
    message.success("Register successful");
    message.config({
      maxCount: 1,
    });
    setSuccessMsg("");
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    const loadingMessage = message.loading("Processing login...", 0);
    setIsloading(true);
    e.preventDefault();
    if (!validateForm()) {
      setErr("Invalid some fields! Please try again.");
      setSuccessMsg("");
      loadingMessage();
      setIsloading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://drawproject-production-012c.up.railway.app/api/auth/register",
        formData
      );
      const delayDuration = 2000;
      setErr("");
      setSuccessMsg("You have successfully logged in.");
      setTimeout(() => {
        router.push("/sign-in");
      }, delayDuration);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400 && error.response.data) {
          setErr(error.response.data.message || "Bad request");
          console.log(err);
        } else {
          setErr(error.response.data.message);
        }
      } else {
        setErr(error.response.data.message);
      }
      setErr("Cannot register! Please try again.");
      setSuccessMsg("");
    }
    loadingMessage();
    setIsloading(false);
  };

  return (
    <>
      {err !== "" && successMsg === ""
        ? error()
        : err === "" && successMsg !== "" && success()}

      <section
        className="login-area pt-100 pb-100 wow fadeInUp"
        data-wow-duration=".8s"
        data-wow-delay=".5s"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="basic-login">
                <h3 className="text-center mb-60">Sign up</h3>
                <Form onSubmit={handleSubmit}>
                  <div className="fullName">
                    <label htmlFor="fullName">
                      Full name <span>**</span>
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      placeholder="Enter Fullname"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mobile-number">
                    <label htmlFor="mobileNum">
                      Mobile number
                      <span style={{ marginRight: "1rem" }}>**</span>
                      <span className="error-message">{mobileNumError}</span>
                    </label>
                    <input
                      id="mobileNum"
                      type="text"
                      placeholder="Mobile..."
                      name="mobileNum"
                      required
                      value={formData.mobileNum}
                      onChange={handleInputChange}
                      min={0}
                      max={99999999999}
                    />
                  </div>

                  <div className="email">
                    <label htmlFor="email">
                      Email Address <span>**</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Email address..."
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="confirmEmail">
                    <label htmlFor="confirmEmail">
                      Confirm Email Address
                      <span style={{ marginRight: "1rem" }}>**</span>
                      <span className="error-message">{confirmEmailError}</span>
                    </label>
                    <input
                      id="confirmEmail"
                      type="email"
                      placeholder="Email address..."
                      name="confirmEmail"
                      required
                      value={formData.confirmEmail}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="username">
                    <label htmlFor="username">
                      Username
                      <span style={{ marginRight: "1rem" }}>**</span>
                      <span className="error-message">{usernameError}</span>
                    </label>
                    <input
                      id="username"
                      type="text"
                      placeholder="Enter Username"
                      name="username"
                      required
                      value={formData.username}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="password">
                    <label htmlFor="pwd">
                      Password
                      <span style={{ marginRight: "1rem" }}>**</span>
                      <span className="error-message">{passwordError}</span>
                    </label>
                    <input
                      id="pwd"
                      type="password"
                      placeholder="Enter password..."
                      name="pwd"
                      required
                      value={formData.pwd}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="confirm-password">
                    <label htmlFor="confirmPwd">
                      Confirm Password
                      <span style={{ marginRight: "1rem" }}>**</span>
                      <span className="error-message">{confirmPwdError}</span>
                    </label>
                    <input
                      id="confirmPwd"
                      type="password"
                      placeholder="Enter confirm password..."
                      name="confirmPwd"
                      required
                      value={formData.confirmPwd}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="feature d-flex">
                    <div className="role" style={{ marginRight: "3rem" }}>
                      <label
                        htmlFor="role-id"
                        className="mt-10"
                        style={{ fontWeight: "bold" }}
                      >
                        Select Role
                        <Popover
                          content={content[0]}
                          title="Choosing the appropriate role "
                          trigger="hover"
                        >
                          <i
                            className="fa-regular fa-circle-question"
                            style={{ marginLeft: "0.3rem" }}
                          ></i>
                        </Popover>
                      </label>
                      <Form.Control
                        className="mt-10"
                        as="select"
                        name="roleName"
                        value={formData.roleName}
                        onChange={handleInputChange}
                        required
                      >
                        <option value={"CUSTOMER"}>Customer</option>
                        <option value={"INSTRUCTOR"}>Instructor</option>
                      </Form.Control>
                    </div>
                    <div className="skill">
                      <label
                        htmlFor="skill-Id"
                        className="mt-10"
                        style={{ fontWeight: "bold" }}
                      >
                        Select Skill
                        <Popover
                          content={content[1]}
                          title="Current level"
                          trigger="hover"
                        >
                          <i
                            className="fa-regular fa-circle-question"
                            style={{ marginLeft: "0.3rem" }}
                          ></i>
                        </Popover>
                      </label>
                      <Form.Control
                        className="mt-10"
                        as="select"
                        name="skillId"
                        value={formData.skillId}
                        onChange={handleInputChange}
                        required
                      >
                        <option value={1}>Beginner</option>
                        <option value={2}>Intermediate</option>
                        <option value={3}>Advance</option>
                        <option value={4}>Profession</option>
                      </Form.Control>
                    </div>
                  </div>

                  <div className="mt-10 d-flex flex-row policy-checkbox align-items-center">
                    <Checkbox style={{paddingTop: "5%"}} required></Checkbox>
                    <a href="/privacy" target="_blank" style={{marginLeft: "0.5rem", cursor: "pointer"}} >Terms of Use and Privacy Policy</a>
                  </div>
                  <Spin spinning={isLoading}>
                    <button
                      className="tp-btn w-100"
                      type="submit"
                    >
                      Register Now
                    </button>
                  </Spin>
                  <div className="or-divide">
                    <span>or</span>
                  </div>
                  <Link href="/sign-in" className="tp-border-btn w-100">
                    Login Now
                  </Link>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterhtmlForm;
