import Link from 'next/link';
import React, { useState } from 'react';

import axios from "axios";
import { useRouter } from 'next/router';
import Alert from 'react-bootstrap/Alert';

const LoginForm = () => {

   const [username, setUsername] = useState("");
   const [pwd, setPwd] = useState("");
   const [accessToken, setAccessToken] = useState("");
   const router = useRouter();
   const [showAlert, setShowAlert] = useState(false);
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [userRole, setUserRole] = useState("");


   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const response = await axios.post(
            "https://drawproject-production.up.railway.app/api/auth/login", // Replace with your actual authentication API endpoint
            {
               username: username,
               pwd: pwd,
            }
            );
         const { data } = response;
         console.log(data.accessToken);
         const responseRole = await axios.get("https://drawproject-production.up.railway.app/api/v1/dashboard",
                                              { headers: {"Authorization" : `Bearer ${data.accessToken}`} });
         const roles = responseRole.data.roles;
         const rolesString = roles.map(role => role.authority).join(', ');
         console.log(rolesString);
         setAccessToken(data.accessToken);
         setUserRole(rolesString);
         localStorage.setItem("accessToken", data.accessToken);
         localStorage.setItem("roles", rolesString)
         setShowAlert(true);

         setIsLoggedIn(true);


         
         const delayDuration = 30000; // 30 seconds (adjust as needed)
      setTimeout(() => {
        router.push('/');
      }, delayDuration);
      } catch (error) {
         console.error("Login failed:", error);

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
           <Alert.Heading>Login Successful!</Alert.Heading>
           <p>You have successfully logged in.</p>
        </Alert>
        <section className="login-area pt-100 pb-100 wow fadeInUp" data-wow-duration=".8s" data-wow-delay=".5s">
         <div className="container">
               <div className="row">
                  <div className="col-lg-8 offset-lg-2">
                     <div className="basic-login">
                           <h3 className="text-center mb-60">Login From Here</h3>
                        <form onSubmit={handleSubmit}>
                              <label htmlFor="name">Username <span>**</span></label>
                              <input id="name" type="text" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} value={username} />
                              <label htmlFor="pass">Password <span>**</span></label>
                              <input id="pwd" type="password" placeholder="Enter password..." value={pwd} onChange={(e) => setPwd(e.target.value)} />
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