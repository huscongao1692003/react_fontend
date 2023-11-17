import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Link from "next/link";

const Collection = () => {
  const [loading, setLoading] = useState(false);
  const [dataInstructor, setDataInstructor] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [bio, setBio] = useState("");
  const [payment, setPayment] = useState("");
  const [education, setEducation] = useState("");
  const [id, setId] = useState("");
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [styles, setStyles] = useState([]);

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  useEffect(() => {
    // Fetch instructor data and set the initial state
    axios
      .get(`https://drawproject-production-012c.up.railway.app/api/v1/users/id`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        const userId = response.data;
        setId(userId);

        axios
          .get(
            `https://drawproject-production-012c.up.railway.app/api/v1/instructor/${userId}`,
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          )
          .then((response) => {
            const instructorData = response.data;
            setDataInstructor(instructorData);
            setBio(instructorData.bio);
            setPayment(instructorData.payment);
            setEducation(instructorData.education);
            setLoading(false);
            axios
              .get(
                `https://drawproject-production-012c.up.railway.app/api/v1/instructor/${userId}/experiences`,
                {
                  headers: { Authorization: `Bearer ${accessToken}` },
                }
              )
              .then((response) => {
                const experienceData = response.data.data;
                setExperiences(experienceData);
                axios
                  .get(
                    `https://drawproject-production-012c.up.railway.app/api/v1/style`
                  )
                  .then((response) => {
                    const stylesData = response.data.data;
                    setStyles(stylesData);
                  })
                  .catch((error) => {
                    console.error("Error fetching styles:", error);
                  });
              })
              .catch((error) => {
                console.error("Error fetching instructor experiences:", error);
              });
          })
          .catch((error) => {
            console.error("Error fetching instructor data:", error);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.error("Error fetching user ID:", error);
        setLoading(false);
      });
  }, [accessToken]);

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handlePaymentChange = (e) => {
    setPayment(e.target.value);
  };

  const handleEducationChange = (e) => {
    setEducation(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const accessToken = localStorage.getItem("accessToken");
      const userId = dataInstructor.userId;
      const updatedInstructorData = {
        bio: bio,
        payment: payment,
        education: education,
        styles: selectedStyles,
      };

      await axios.put(
        `https://drawproject-production-012c.up.railway.app/api/v1/instructor/${userId}`,
        updatedInstructorData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      alert("Instructor profile updated successfully");
      window.location.reload();
    } catch (error) {
      console.error("Failed to update instructor profile:", error);
    }
  };
  const handleStyleChange = (styleId) => {
    if (selectedStyles.includes(styleId)) {
      setSelectedStyles(selectedStyles.filter((id) => id !== styleId));
    } else {
      setSelectedStyles([...selectedStyles, styleId]);
    }
  };

  return (
    
      <section
        className="login-area pt-100 pb-100 wow fadeInUp"
        data-wow-duration=".8s"
        data-wow-delay=".5s"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div>
                <h3 className="text-center mb-60">
                  Update Your Profile Instructor
                </h3>
                <form className="" onSubmit={handleSubmit}>
                <div className="basic-login">
                  <label>Profile Picture</label>
                  <div className="circular-avatar">
                    <img
                      src={
                        dataInstructor.avatar ||
                        "/assets/img/zdJeuso-_400x400.jpg"
                      }
                      alt="Profile Picture"
                    />
                  </div>
                  <div className="mt-10"></div>
                  <label htmlFor="name">User Name</label>
                  <input
                    id="name"
                    type="text"
                    value={dataInstructor.userName}
                    readOnly // Make the input read-only
                  />
                  <label htmlFor="mobile">Mobile Number</label>
                  <input
                    id="mobile"
                    type="tel"
                    value={dataInstructor.mobileNum}
                    readOnly // Make the input read-only
                  />
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={dataInstructor.email}
                    readOnly // Make the input read-only
                  />

                  <label htmlFor="skill">Skill</label>
                  <input
                    id="email"
                    type="email"
                    value={dataInstructor.skillName}
                    readOnly // Make the input read-only
                  />

                  <label htmlFor="bio">
                    Bio <span>**</span>
                  </label>
                  <input
                    placeholder="Enter your bio"
                    id="bio"
                    type="text"
                    value={bio}
                    onChange={handleBioChange} // Handle bio field change
                  />
                  <label htmlFor="payment">
                    Payment <span>**</span>
                  </label>
                  <input
                    id="payment"
                    placeholder="Enter your payment"
                    type="text"
                    value={payment}
                    onChange={handlePaymentChange} // Handle payment field change
                  />
                  <label htmlFor="education">
                    Education <span>**</span>
                  </label>
                  <input
                    id="education"
                    type="text"
                    placeholder="Enter your education"
                    value={education} 
                    onChange={handleEducationChange} // Handle education field change
                  />
                  <h5>Instructor's Experiences</h5>
                  <ul>
                    {experiences.map((experience) => (
                      <li key={experience.drawingStyleId}>
                        {experience.drawingStyleName}
                      </li>
                    ))}
                  </ul>
                  </div>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="style-dropdown">
                      Select Styles
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                    <Form.Group>
                    {styles.map((style) => (
                      <div key={`style-${style.drawingStyleId}`}>
                        <Form.Check
                          type="radio"
                          id={`style-${style.drawingStyleId}`}
                          label={style.drawingStyleName}
                          checked={selectedStyles.includes(style.drawingStyleId)}
                          onChange={() => handleStyleChange(style.drawingStyleId)}
                        />
                      </div>
                    ))}
                  </Form.Group>
                  </Dropdown.Menu>
                  </Dropdown>
                  <div className="mt-30"></div>
                  <button className="tp-btn w-100">Update Profile</button>
                </form>
                <Link className="tp-btn mt-20 w-100" href={`/artwork?id=${id}`}>
                  Artwork
                </Link>
                <Link
                  className="tp-btn mt-20 w-100"
                  href={`/cetificate?id=${id}`}
                >
                  Cetificate
                </Link>
                <div className="mt-20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    
  );
};

export default Collection;
