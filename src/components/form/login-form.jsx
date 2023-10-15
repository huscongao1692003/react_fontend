import Link from "next/link";
import React, { useState } from "react";
import { getData, postData } from "@/src/api/api";
import api from "@/src/api/api2";
import axios from "axios";
import { useRouter } from "next/router";

const LoginForm = () => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [LoginError, setLoginError] = useState(false);
  const router = useRouter();

  function onsubmit(e) {
    e.preventDefault();
    setLoginError(false);

    postData("/auth/login", {
      username: name,
      pwd: pass,
    })
      .then((response) => {
        localStorage.setItem("accessToken", response.accessToken);
        router.push("/");
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error("Error making POST request: ", error);
        setLoginError(true);
      });
  }
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
                <h3 className="text-center mb-60">Login From Here</h3>
                <form
                  onSubmit={(e) => {
                    onsubmit(e);
                  }}
                >
                  <label htmlFor="name">
                    Username <span>**</span>
                  </label>
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    id="name"
                    required
                    type="text"
                    placeholder="Enter Username"
                  />
                  <label htmlFor="pass">
                    Password <span>**</span>
                  </label>
                  <input
                    value={pass}
                    onChange={(event) => setPass(event.target.value)}
                    id="pass"
                    required
                    type="password"
                    placeholder="Enter password..."
                  />
                  <p style={{ color: "red" }}>
                    {LoginError ? "User account or password incorrect" : ""}
                  </p>
                  <div className="mt-10"></div>
                  <button className="tp-btn w-100">login Now</button>
                  <div className="or-divide">
                    <span>or</span>
                  </div>
                  <Link href="/register" className="tp-border-btn w-100">
                    Register Now
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

export default LoginForm;
