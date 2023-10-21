import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Settings = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [skillId, setSkillId] = useState('');
  const [skillName, setSkillName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://drawproject-production.up.railway.app/api/v1/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        const { data } = response;
        setFullName(data.fullName);
        setMobileNumber(data.mobileNumber);
        setEmail(data.email);
        setAvatar(data.avatar);
        setSkillId(data.skill.skillId);
        setSkillName(data.skill.skillName);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleFileInputChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('mobileNumber', mobileNumber);
      formData.append('email', email);
      if (selectedFile) {
        formData.append('avatar', selectedFile);
      }
      formData.append('skillId', skillId);
      formData.append('skillName', skillName);

      const response = await axios.put('https://drawproject-production.up.railway.app/api/user', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('User data updated:', response.data);

      router.push('/dashboard');
    } catch (error) {
      console.error('Failed to update user data:', error);
    }
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
                      style={{ display: 'none' }}
                      className="settingsPPInput"
                      onChange={handleFileInputChange}
                    />
                  </div>
                  <label>Full Name</label>
                  <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                  <label>Mobile Number</label>
                  <input type="tel" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
                  <label>Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <label>Skill ID</label>
                  <input type="number" value={skillId} onChange={(e) => setSkillId(e.target.value)} max={3} min={1} />
                  <label>Skill Name</label>
                  <input type="text" value={skillName} onChange={(e) => setSkillName(e.target.value)} />

                  <div className="mt-10"></div>
                  <button className="tp-btn w-100" type="submit">
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Settings;
