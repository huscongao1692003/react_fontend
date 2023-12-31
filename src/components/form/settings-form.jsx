import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Form from "react-bootstrap/Form";
import { Spin, message } from "antd";

const Settings = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [skillNames, setSkillName] = useState("");
  const [selectedSkillId, setSelectedSkillId] = useState(1);
  const [skills, setSkills] = useState([]); // State to store skills fetched from the API
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [err, setErr] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const error = (notifi) => {
    message.error(err);
    message.config({
      maxCount: 3,
    });
    setErr("");
  };

  const success = () => {
    message.success("Update profile successful");
    message.config({
      maxCount: 1,
    });
    setSuccessMsg("");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(
          "https://drawproject-production-012c.up.railway.app/api/v1/profile",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        const { data } = response;
        setFullName(data.fullName);
        setMobileNumber(data.mobileNumber);
        setEmail(data.email);
        setAvatar(data.avatar);
        setSkillName(data.skill.skillId);

        // Initialize selectedSkillId with the user's existing skill ID
        setSelectedSkillId(data.skill);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    const fetchSkills = async () => {
      try {
        const response = await axios.get(
          "https://drawproject-production-012c.up.railway.app/api/v1/skill"
        );
        const { data } = response;
        setSkills(data);
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      }
    };

    fetchProfile();
    fetchSkills();
  }, []);

  const handleSubmit = async (e) => {
    const loadingMessage = message.loading('Processing...', 0);
    setIsloading(true);
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");

    try {
      
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("mobileNumber", mobileNumber);
      formData.append("email", email);
      if(selectedFile != null){
        formData.append("image", selectedFile);
      }
      if (selectedSkillId) {
        formData.append("skill", selectedSkillId);
      }

      await axios.post(
        "https://drawproject-production-012c.up.railway.app/api/v1/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Show success message or redirect to dashboard
      setErr("");
      setSuccessMsg("You have successfully logged in.");
      if(selectedFile !== null) {
        const responseAvatar = await axios.get (
          "https://drawproject-production-012c.up.railway.app/api/v1/users/avatar",
          {headers: {Authorization: `Bearer ${accessToken}`}}
        )
        localStorage.setItem("avatar", responseAvatar.data);
      }
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      setErr("An error occurred during updating! Please try again.");
      // Show error message
      setSuccessMsg("");
    }
    loadingMessage();
    setIsloading(false);
  };

  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewImage(""); // Clear the preview when no file is selected
    }
  }, [selectedFile]);

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setSelectedFile(file);
  };
  

  return (
    <>
        {
                (err !== "" && successMsg === "") ? error() : (err === "" && successMsg !== "") && success()
            }
      <section
        className="login-area pt-100 pb-100 wow fadeInUp"
        data-wow-duration=".8s"
        data-wow-delay=".5s"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="basic-login">
                <h3 className="text-center mb-60">Update Your Account</h3>
                <form className="settingsForm" onSubmit={handleSubmit}>
                  <label>Profile Picture</label>
                  <div className="circular-avatar">
                
                    {previewImage != null && (
                      <img
                        src={previewImage || avatar || "/assets/img/zdJeuso-_400x400.jpg"}
                        alt="Avatar Preview"
                        style={{ scale: 2, width:"100%", height:"100%" }}
                      />
                    )}
                
                  </div>
                  <label htmlFor="fileInput">
                    <i className="settingsPPIcon far fa-user-circle"></i>
                  </label>
                  <input
                    id="fileInput"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileChange} // Handle file input change
                    style={{ display: "none" }}
                  />
                  <div className="mt-10"></div>
                  <label htmlFor="name">
                    Full Name <span>**</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  <label htmlFor="mobile">
                    Mobile Number <span>**</span>
                  </label>
                  <input
                    id="mobile"
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
                  <label htmlFor="email">
                    Email <span>**</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <label htmlFor="skill">
                    Skill <span>**</span>
                  </label>
                  <Form.Control
                    className="mt-10"
                    as="select"
                    name="skillId"
                    value={selectedSkillId}
                    onChange={(e) => setSelectedSkillId(e.target.value)} // Handle skill selection
                    required
                  >
                    {skills.map((skill) => (
                      <option key={skill.skillId} value={skill.skillId}>
                        {skill.skillName}
                      </option>
                    ))}
                  </Form.Control>
                  <div className="mt-10"></div>
                  <Spin spinning={isLoading}>
                    <button className="tp-btn w-100">Update Profile</button>
                  </Spin>
                </form>
                <div className="mt-20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Settings;
