import { postData } from "@/src/api/api";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const RegisterhtmlForm = () => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [errorMess, setErrorMess] = useState("");
  const [LoginError, setLoginError] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    postData("auth/register", {
      username: data.username,
      skillId: 1,
      pwd: data.pwd,
      confirmEmail: data.email,
      email: data.email,
      mobileNum: data.mobileNum,
      confirmPwd: data.pwd,
      fullName: data.fullName,
      roleName: "CUSTOMER",
    })
      .then((response) => {
        setErrorMess("Sign Up Success");
        localStorage.setItem("accessToken", response.accessToken);
        setTimeout(() => {
          router.push("/sign-in");
        }, 2000);
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error("Error making POST request: ", error);
        setLoginError(true);
        setErrorMess(error?.response?.data);
      });
  };
  return (
    <>
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
                <form onSubmit={handleSubmit(onSubmit)}>
                  <label htmlFor="name">
                    Username <span>**</span>
                  </label>
                  <input
                    {...register("username", {
                      required: { value: true, message: "Please enter" },
                      minLength: {
                        value: 4,
                        message: "Please enter all 4 characters",
                      },
                      maxLength: {
                        value: 40,
                        message: "Maximum length is 40 characters",
                      },
                    })}
                    id="name"
                    type="text"
                    placeholder="Enter Username"
                  />
                  <p style={{ color: "red" }}> {errors.username?.message}</p>
                  <label htmlFor="fullName">
                    Full Name <span>**</span>
                  </label>
                  <input
                    {...register("fullName", {
                      required: { value: true, message: "Please enter" },
                      minLength: {
                        value: 6,
                        message: "Please enter all 6 characters",
                      },
                      maxLength: {
                        value: 20,
                        message: "Maximum length is 20 characters",
                      },
                    })}
                    id="fullName"
                    type="text"
                    placeholder="Enter Full Name"
                  />
                  <p style={{ color: "red" }}>{errors.fullName?.message}</p>
                  <label htmlFor="email-id">
                    Email Address <span>**</span>
                  </label>
                  <input
                    id="email-id"
                    {...register("email", {
                      required: { value: true, message: "Please enter" },
                      minLength: {
                        value: 6,
                        message: "Please enter all 6 characters",
                      },
                      maxLength: {
                        value: 40,
                        message: "Maximum length is 40 characters",
                      },
                    })}
                    type="email"
                    placeholder="Email address..."
                  />
                  <p style={{ color: "red" }}>{errors.email?.message}</p>
                  <label htmlFor="phone-id">
                    Phone <span>**</span>
                  </label>
                  <input
                    {...register("mobileNum", {
                      required: { value: true, message: "Please enter" },
                      minLength: {
                        value: 10,
                        message: "Please enter all 10 characters",
                      },
                      maxLength: {
                        value: 10,
                        message: "Maximum length is 10 characters",
                      },
                    })}
                    id="phone-id"
                    type="text"
                    placeholder="Phone..."
                  />
                  <p style={{ color: "red" }}>{errors.mobileNum?.message}</p>
                  <label htmlFor="pass">
                    Password <span>**</span>
                  </label>
                  <input
                    id="pass"
                    {...register("pwd", {
                      required: { value: true, message: "Please enter" },
                      minLength: {
                        value: 6,
                        message: "Please enter all 6 characters",
                      },
                      maxLength: {
                        value: 20,
                        message: "Maximum length is 20 characters",
                      },
                    })}
                    type="password"
                    placeholder="Enter password..."
                  />
                  <p style={{ color: "red" }}>{errors.pwd?.message}</p>
                  <div className="mt-10"></div>
                  <p style={{ color: "red" }}>{LoginError ? errorMess : ""}</p>
                  <button className="tp-btn w-100">Register Now</button>
                  <div className="or-divide">
                    <span>or</span>
                  </div>
                  <Link href="/sign-in" className="tp-border-btn w-100">
                    login Now
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterhtmlForm;
