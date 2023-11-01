import Link from 'next/link';
import React, {useState} from 'react';
import axios from "axios";
import {useRouter} from 'next/router';
import Alert from 'react-bootstrap/Alert';

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "https://drawproject-production.up.railway.app/api/auth/login",
                {
                    username: username,
                    pwd: pwd,
                }
            );
            const {data} = response;
            console.log(data.accessToken);
            const responseRole = await axios.get(
                "https://drawproject-production.up.railway.app/api/v1/dashboard",
                {headers: {Authorization: `Bearer ${data.accessToken}`}}
            );

            const roles = responseRole.data.roles;
            const rolesString = roles.map((role) => role.authority).join(", ");
            console.log(rolesString);
            setAccessToken(data.accessToken);
            setUserRole(rolesString);
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("roles", rolesString);
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
                    setErr(error.response.data.message || "Bad request");
                    console.log(err)
                } else {
                    setErr("An error occurred during login.");
                }
            } else {
                setErr("An error occurred during login.");
            }
            setSuccessMsg("");
        }
    };

    return (
        <>
            <Alert
                variant={err ? "danger" : "success"}
                show={showAlert || err || successMsg}
                onClose={() => {
                    setShowAlert(false);
                    setSuccessMsg("");
                }}
                dismissible
            >
                <Alert.Heading>{err ? "Login Failed" : "Login Successful"}</Alert.Heading>
                <p>{err || successMsg || "You have successfully logged in."}</p>
            </Alert>

            <section className="login-area pt-100 pb-100 wow fadeInUp" data-wow-duration=".8s" data-wow-delay=".5s">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="basic-login">
                                <h3 className="text-center mb-60">Login From Here</h3>
                                <form onSubmit={handleSubmit}>
                                    <label htmlFor="name">Username <span>**</span></label>
                                    <input id="name" type="text" placeholder="Enter Username"
                                           onChange={(e) => setUsername(e.target.value)} value={username}/>
                                    <label htmlFor="pass">Password <span>**</span></label>
                                    <input id="pwd" type="password" placeholder="Enter password..." value={pwd}
                                           onChange={(e) => setPwd(e.target.value)}/>
                                    <div className="mt-10"></div>
                                    <button className="tp-btn w-100">login Now</button>
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
