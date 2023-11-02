import React, { useState } from 'react';
import axios from 'axios';

const InstructorReport = () => {
    const [studentId, setStudentId] = useState("");
    const [courseId, setCourseId] = useState("");
    const [message, setMessage] = useState("");
    const [image, setImage] = useState("");

    const handleReport = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(
            "https://drawproject-production.up.railway.app/api/v1/courses/student/report",
            {
              studentId: studentId,
              courseId: courseId,
              message: message,
            },
            { headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` } }
          );
          const { data } = response;
          console.log(data.accessToken);
        } catch (error) {
          console.error(error);
        }
      };

    return (
        <>
            <section className='instructorReportForm'>
                <div className="reportContainer">
                    <form onSubmit={handleReport}>
                        <h4>Create New Report</h4>
                        <div>
                            <label htmlFor="studentId">Student Id</label>
                            <input
                                type="text"
                                placeholder='Student Id'
                                onChange={(e) => setStudentId(e.target.value)}
                                value={studentId}
                            />
                            <label htmlFor="courseId">Course Id</label>
                            <input
                                type="text"
                                placeholder='Course Id'
                                onChange={(e) => setCourseId(e.target.value)}
                                value={courseId}
                            />
                            <label htmlFor="message">Message</label>
                            <textarea
                                placeholder='Message'
                                onChange={(e) => setMessage(e.target.value)}
                                value={message}
                            />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </section>
        </>
    );
};

export default InstructorReport;
