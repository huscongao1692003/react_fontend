import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Settings = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [skillName, setSkillName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get('https://drawproject-production.up.railway.app/api/v1/profile', {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        const { data } = response;
        setFullName(data.fullName);
        setMobileNumber(data.mobileNumber);
        setEmail(data.email);
        setAvatar(data.avatar);
        setSkillName(data.skill.skillName);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const accessToken = localStorage.getItem('accessToken');
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('mobileNumber', mobileNumber);
      formData.append('email', email);
      formData.append('skill', JSON.stringify({ skillName }));
      if (selectedFile) {
        formData.append('avatar', selectedFile);
      }
  
      await axios.put('https://drawproject-production.up.railway.app/api/v1/profile', formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Show success message or redirect to dashboard
      console.log('Profile updated successfully');
      router.push('/');
    } catch (error) {
      console.error('Failed to update profile:', error);
      // Show error message
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    router.push('/');
  };
  

  const handleFileInputChange = (e) => {
    // Handle file input change logic here
  };

  return (
    <>
      <section className="login-area pt-100 pb-100 wow fadeInUp" data-wow-duration=".8s" data-wow-delay=".5s">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="basic-login">
                <h3 className="text-center mb-60">Update Your Account</h3>
                <form className="settingsForm" onSubmit={handleSubmit}>
                  <label>Profile Picture</label>
                  <div className="settingsPP">
                    <img
                      src={avatar || 'https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'}
                      alt="Profile Picture"
                    />
                    <label htmlFor="fileInput">
                      <i className="settingsPPIcon far fa-user-circle"></i>
                    </label>
                    <input
                      id="fileInput"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={handleFileInputChange}
                      style={{ display: 'none' }}
                    />
                  </div>
                  <div className="mt-10"></div>
                  <label htmlFor="name">Full Name <span>**</span></label>
                  <input id="name" type="text" placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                  <label htmlFor="mobile">Mobile Number <span>**</span></label>
                  <input id="mobile" type="tel" placeholder="Enter your mobile number" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
                  <label htmlFor="email">Email <span>**</span></label>
                  <input id="email" type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <label htmlFor="skill">Skill <span>**</span></label>
                  <input id="skill" type="text" placeholder="Enter your skill" value={skillName} onChange={(e) => setSkillName(e.target.value)} />
                  <div className="mt-10"></div>
                  <button className="tp-btn w-100">Update Profile</button>
                </form>
                <div className="mt-20"></div>
                <button onClick={handleLogout} className="tp-btn w-100">Logout</button>              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Settings;
