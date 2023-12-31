import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useRouter} from 'next/router';
import { Spin, message, Space } from 'antd';

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [pwd, setPwd] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const router = useRouter();
    const [showAlert, setShowAlert] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState("");
    const [err, setErr] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [isLoading, setIsloading] = useState(false);
    const checkLogin = typeof window !== 'undefined' ? localStorage.getItem('isLoggedIn') : null;

    if(checkLogin) {
        router.push('/');
    }

    const error = () => {
        message.error(err);
        message.config({
            maxCount: 2,
            duration: 5000
        })
        setErr("");
      };

      const success = () => {
        message.success("Login successful")
        message.config({
            maxCount: 1
        })
        setSuccessMsg("");
      }

    const handleSubmit = async (e) => {
        const loadingMessage = message.loading('Processing login...', 0);
        setIsloading(true);
        e.preventDefault();

        try {
            const response = await axios.post(
                "https://drawproject-production-012c.up.railway.app/api/auth/login",
                {
                    username: username,
                    pwd: pwd,
                }
            );
            const {data} = response;
            const responseRole = await axios.get(
                "https://drawproject-production-012c.up.railway.app/api/v1/dashboard",
                {headers: {Authorization: `Bearer ${data.accessToken}`}}
            );

            const roles = responseRole.data.roles;
            const rolesString = roles.map((role) => role.authority).join(", ");
            setAccessToken(data.accessToken);
            setUserRole(rolesString);
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("roles", rolesString);
            const responseAvatar = await axios.get (
                "https://drawproject-production-012c.up.railway.app/api/v1/users/avatar",
                {headers: {Authorization: `Bearer ${data.accessToken}`}}
            )
            localStorage.setItem("avatar", responseAvatar.data);
            setShowAlert(true);
            localStorage.setItem("isLoggedIn", true.toString());
            setIsLoggedIn(true);
            setErr("");
            setSuccessMsg("You have successfully logged in.");

            if (rolesString === "ROLE_ADMIN") {
                router.push("/dashboard");
            } else if (rolesString === "ROLE_STAFF") {
                router.push("/dashboard-staff");
            } else if (rolesString === "ROLE_INSTRUCTOR") {
                router.push("/");
            } else if (rolesString === "ROLE_CUSTOMER") {
                router.push("/");
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400 && error.response.data) {
                    // Extract the error message from the response data
                    setErr("Invalid your username or password");
                } else if(error.response.status === 429) {
                    setErr("You entered incorrectly too many times! please try again after 5 minutes.");
                } else {
                    setErr("An error occurred during login.");
                }
            } else {
                setErr("An error occurred during login.");
            }
            setSuccessMsg("");
        }
        loadingMessage();
        setIsloading(false);
    };

    return (
        <>  
            {
                (err !== "" && successMsg === "") ? error() : (err === "" && successMsg !== "") && success()
            }
            

            <section className="login-area pt-100 pb-100 wow fadeInUp" data-wow-duration=".8s" data-wow-delay=".5s">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="basic-login">
                                <h3 className="text-center mb-60">Login From Here</h3>
                                <form onSubmit={handleSubmit}>
                                    <label htmlFor="name">Username <span>**</span></label>
                                    <input id="name" type="text" placeholder="Enter Username"
                                           onChange={(e) => setUsername(e.target.value)} value={username} required/>
                                    <label htmlFor="pass">Password <span>**</span></label>
                                    <input id="pwd" type="password" placeholder="Enter password..." value={pwd}
                                           onChange={(e) => setPwd(e.target.value)} required />
                                    <div className="mt-10"></div>
                                    <Spin spinning={isLoading}>
                                        <button className="tp-btn w-100">login Now</button>
                                    </Spin>
                                    <div className="or-divide"><span>or</span></div>
                                </form>
                                <Link href="/register" className="tp-border-btn w-100">Register Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default LoginForm;
