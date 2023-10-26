import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useRouter} from 'next/router';
import Form from 'react-bootstrap/Form';

const Settings = () => {
    const router = useRouter();
    const [fullName, setFullName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const [skillNames, setSkillName] = useState('');
    const [selectedSkillId, setSelectedSkillId] = useState(1);
    const [skills, setSkills] = useState([]); // State to store skills fetched from the API
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const response = await axios.get('https://drawproject-production.up.railway.app/api/v1/profile', {
                    headers: {Authorization: `Bearer ${accessToken}`}
                });
                const {data} = response;
                setFullName(data.fullName);
                setMobileNumber(data.mobileNumber);
                setEmail(data.email);
                setAvatar(data.avatar);
                setSkillName(data.skill.skillId);

                // Initialize selectedSkillId with the user's existing skill ID
                setSelectedSkillId(data.skill.skillId);
            } catch (error) {
                console.error('Failed to fetch profile:', error);
            }
        };

        const fetchSkills = async () => {
            try {
                const response = await axios.get('https://drawproject-production.up.railway.app/api/v1/skill');
                const {data} = response;
                setSkills(data);
            } catch (error) {
                console.error('Failed to fetch skills:', error);
            }
        };

        fetchProfile();
        fetchSkills();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const accessToken = localStorage.getItem('accessToken');
            const formData = new FormData();
            formData.append('fullName', fullName);
            formData.append('mobileNumber', mobileNumber);
            formData.append('email', email);
            formData.append('image', selectedFile);
            if (selectedSkillId) {
                formData.append('skill', selectedSkillId);
            }

            await axios.post('https://drawproject-production.up.railway.app/api/v1/profile', formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
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


    const handleFileInputChange = (e) => {
        const file = e.target.files[0]; // Get the selected file
        setSelectedFile(file);
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
                                  <div className="circular-avatar">
                                        <img
                                            src={avatar || 'https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'}
                                            alt="Profile Picture"

                                        />

                                    </div>
                                  <label htmlFor="fileInput">
                                    <i className="settingsPPIcon far fa-user-circle"></i>
                                  </label>
                                  <input
                                    id="fileInput"
                                    type="file"
                                    accept=".jpg,.jpeg,.png"
                                    onChange={handleFileInputChange} // Handle file input change
                                    style={{display: 'none'}}
                                  />
                                    <div className="mt-10"></div>
                                    <label htmlFor="name">Full Name <span>**</span></label>
                                    <input id="name" type="text" placeholder="Enter your full name" value={fullName}
                                           onChange={(e) => setFullName(e.target.value)}/>
                                    <label htmlFor="mobile">Mobile Number <span>**</span></label>
                                    <input id="mobile" type="tel" placeholder="Enter your mobile number"
                                           value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)}/>
                                    <label htmlFor="email">Email <span>**</span></label>
                                    <input id="email" type="email" placeholder="Enter your email address" value={email}
                                           onChange={(e) => setEmail(e.target.value)}/>

                                    <label htmlFor="skill">Skill <span>**</span></label>
                                    <Form.Control
                                        className="mt-10"
                                        as="select"
                                        name="skillId"
                                        value={selectedSkillId}
                                        onChange={(e) => setSelectedSkillId(e.target.value)} // Handle skill selection
                                        required
                                    >
                                        <option value="">Select a skill</option>
                                        {skills.map((skill) => (
                                            <option key={skill.skillId} value={skill.skillId}>
                                                {skill.skillName}
                                            </option>
                                        ))}
                                    </Form.Control>
                                    <div className="mt-10"></div>
                                    <button className="tp-btn w-100">Update Profile</button>
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
