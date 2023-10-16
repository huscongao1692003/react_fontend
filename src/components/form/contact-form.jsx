import React, {useState} from "react";
import axios from "axios";


const ContactForm = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Get form data
    const formData = new FormData(e.target);

    // Convert form data to JSON object
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Send POST request using Axios
    try {
      console.log(data);
      const response = await axios.post(
        "https://drawproject-production.up.railway.app/api/v1/contact",
        data
        );

      // Handle success
      console.log("Request successful", response.data);
      setLoading(false);

      // Reload the page on success
      window.location.reload();

      // Optionally, you can display a success message or perform other actions here
    } catch (error) {
      // Handle error
      console.error("Error sending the request", error);
      setLoading(false);

      // Optionally, you can display an error message or perform other actions here
    }
  };
  return (
    <>
      <section
        className="contact-area pb-60 wow fadeInUp"
        data-wow-duration=".8s"
        data-wow-delay=".2s"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-12">
              <div className="contact-wrapper mr-65 mb-60">
                <div className="sub-contact-title">
                  <h5 className="contact-title mb-30">Send Us Message</h5>
                </div>
                <div className="contact-form">
                <form id="contact-form" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="contact-form-input mb-25">
                          <span>Name</span>
                          <input
                            type="name"
                            placeholder="Your Name"
                            name="name"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="contact-form-input mb-25">
                          <span>Email Id</span>
                          <input
                            type="email"
                            placeholder="Your Email"
                            name="email"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="contact-form-input mb-40">
                          <span>Mobile Number</span>
                          <input
                            type="number"
                            placeholder="MobileNumber"
                            name="mobileNum"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="contact-form-input mb-40">
                          <span>Comments</span>
                          <textarea
                            placeholder="Enter Your Message"
                            name="message"
                            required
                          ></textarea>
                        </div>
                        <button className="tp-btn" type="submit">
                          Submit Now
                        </button>
                      </div>
                    </div>
                  </form>
                  <p className="ajax-response"></p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-12">
              <div className="contact-bg mb-60">
                <img
                  src="/assets/img/bg/contact-sub-bg-01.png"
                  alt="contact-bg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactForm;
