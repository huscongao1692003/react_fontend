import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Alert from "react-bootstrap/Alert";
import { Button, Popover, Space, Checkbox } from "antd";
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
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

    const content = [
        <div className="d-flex flex-column">
            <div className="content-1">
                <span style={{ fontWeight: "bold" }}>Staff: </span>
                <span>Who will manage the customer and Instructor</span>
            </div>
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
        roleName: "STAFF",
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
                "https://drawproject-production-012c.up.railway.app/api/v1/admin/user",
                formData,
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );
            const delayDuration = 2000;
            setErr("");
            setSuccessMsg("You have successfully logged in.");
            setTimeout(() => {
                // router.push("/sign-in");
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
                    <div className="row" >
                        <div className="col-lg-8 offset-lg-2">
                            <div className="basic-login" style={{ border: '1px solid #333' }}>
                                <h3 className="text-center mb-60">Create Staff Account</h3>
                                <Form onSubmit={handleSubmit}>
                                    <div className="fullName">
                                        <label htmlFor="fullName">
                                            Full name <span>**</span>
                                        </label>
                                        <input
                                            style={{ border: '1px solid #333' }}
                                            className="bg-transparent"
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
                                            style={{ border: '1px solid #333' }}
                                            className="bg-transparent"
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
                                            className="bg-transparent"
                                            style={{ border: '1px solid #333' }}
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
                                            style={{ border: '1px solid #333' }}
                                            className="bg-transparent"
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
                                            style={{ border: '1px solid #333' }}
                                            className="bg-transparent"
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
                                            style={{ border: '1px solid #333' }}
                                            className="bg-transparent"
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
                                            style={{ border: '1px solid #333' }}
                                            className="bg-transparent"
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
                                                style={{ border: '1px solid #333' }}
                                                className="mt-10 bg-transparent"
                                                as="select"
                                                name="roleName"
                                                value={formData.roleName}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                <option value={"STAFF"}>Staff</option>
                                            </Form.Control>
                                        </div>
                                    </div>
                                    <Spin spinning={isLoading}>
                                        <button
                                            className="tp-btn w-100"
                                            type="submit"
                                        >
                                            Create Now
                                        </button>
                                    </Spin>

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
