import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import Alert from 'react-bootstrap/Alert';
import { Form, Dropdown } from "react-bootstrap";

const RegisterhtmlForm = () => {
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    skillId: 0,
    pwd: "",
    confirmEmail: "",
    email: "",
    mobileNum: "",
    confirmPwd: "",
    fullName: "",
    roleName: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://drawproject-production.up.railway.app/api/auth/register",
        formData
        );

      setShowAlert(true);
      console.log("Registration successful:", response.data);
      const delayDuration = 3000; // 3 seconds (adjust as needed)
      setTimeout(() => {
        router.push('/sign-in');
        }, delayDuration);
    } catch (error) {
      console.error("Registration failed:", error);

    }
  };

  return (

    <>
    <Alert
      variant="success"
      show={showAlert}
      onClose={() => setShowAlert(false)}
      dismissible
      >
      <Alert.Heading>Register Successful!</Alert.Heading>
      <p>You have successfully Register.</p>
    </Alert>
      <section
        className="login-area pt-100 pb-100 wow fadeInUp"
        data-wow-duration=".8s"
        data-wow-delay=".5s"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="basic-login">
                <h3 className="text-center mb-60">Sign up From Here</h3>
                <Form onSubmit={handleSubmit}>
                  <label htmlFor="username">
                    Username <span>**</span>
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
                  <label htmlFor="fullName">
                    Fullname <span>**</span>
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
                  <label htmlFor="mobileNum">
                    Mobile Number <span>**</span>
                  </label>
                  <input
                    id="mobileNum"
                    type="number"
                    placeholder="Mobile..."
                    name="mobileNum"
                    required
                    value={formData.mobileNum}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="email">
                    Email Address <span>**</span>
                  </label>
                  <input
                    id="email"
                    type="text"
                    placeholder="Email address..."
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="confirmEmail">
                    Confirm Email <span>**</span>
                  </label>
                  <input
                    id="confirmEmail"
                    type="text"
                    placeholder="Email confirm..."
                    name="confirmEmail"
                    required
                    value={formData.confirmEmail}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="pwd">
                    Password <span>**</span>
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
                  <label htmlFor="confirmPwd">
                    Confirm Password <span>**</span>
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
                  <label htmlFor="roleName">
                    Select Role <span>**</span>
                  </label>
                  <Dropdown onSelect={(eventKey, event) => handleInputChange({ target: { name: "roleName", value: eventKey } })}>
                    <Dropdown.Toggle variant="success">
                      {formData.roleName || "Select Role"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="CUSTOMER">Customer</Dropdown.Item>
                      <Dropdown.Item eventKey="INSTRUCTOR">Instructor</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <label htmlFor="skillId" className="mt-10">
                    Select Skill <span>**</span>
                  </label>
                  <Form.Control className="mt-10" as="select" name="skillId" value={formData.skillId} onChange={handleInputChange} required>
                    <option value={1}>Beginner</option>
                    <option value={2}>Intermediate</option>
                    <option value={3}>Advance</option>
                    <option value={4}>Profession</option>

                  </Form.Control>
                  <div className="mt-10"></div>
                  <button className="tp-btn w-100" type="submit">Register Now</button>
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
