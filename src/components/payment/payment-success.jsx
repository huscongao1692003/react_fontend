import Link from "next/link";
import React,{useEffect,useState} from "react";
import Breadcrumb from "../bredcrumb/breadcrumb";
import { useRouter } from 'next/router';
import axios from "axios";



const PaymentSuccess = () => {
    const [loading, setLoading] = useState(true);
    const [courseData, setCourseData] = useState({});
    const router = useRouter();
    const [idCourse, setIdCourse] = useState(null); // State to store idCourse
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    console.log(accessToken)

    useEffect(() => {
    const idCourseString = typeof window !== 'undefined' ? localStorage.getItem('idCourse') : null;
    const idCourse = idCourseString ? JSON.parse(idCourseString) : null;
    const { paymentId, token, PayerID } = router.query;
    setIdCourse(idCourse);

    if (idCourse && idCourse.id && accessToken) {
        console.log("idCourse, accessToken, paymentId, token, PayerID:", idCourse, accessToken, paymentId, token, PayerID);

        try {
            (async () => {
                const courseResponse = await axios.get(`https://drawproject-production.up.railway.app/api/v1/courses/${idCourse.id}`, {
                    headers: { "Authorization": `Bearer ${accessToken}` }
                });

                setCourseData(courseResponse.data.data);
                const paymentData = {
                    description: "test",
                    courseId: idCourse.id,
                    price: courseResponse.data.data.price,
                    totalPrice: courseResponse.data.data.price,
                };
                const paymentResponse = await axios
                .post(`https://drawproject-production.up.railway.app/api/v1/pay/success?paymentId=${paymentId}&token=${token}&PayerID=${PayerID}`,
                     paymentData,
                    {headers: { "Authorization": `Bearer ${accessToken}` }
                });

                console.log("Payment response:", paymentResponse.data);
                console.log(courseResponse.data.data);
                setLoading(false)
            })();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    } else {
        console.error('The "idCourse" data is not found in localStorage or does not contain an "id" property.');
    }
    }, [router.query, accessToken]);

    return (
        <>
        <section className="error-area pt-120 pb-115">
            <div className="container">
                {loading ? (
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    ) : (
                <div className="row">
                    <div className="col-12">
                        <div className="error-item text-center">
                            <div className="error-thumb mb-50">
                                <img src="/assets/img/payment-success.jpg" alt="error-bg" />
                            </div>
                            <div className="error-content">
                                <h4 className="error-title mb-35">
                                    Thanks for purchars the course <br /> Have fun Learning
                                </h4>
                                <Link href="/" className="tp-btn">
                                    Back To Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                )}
            </div>
        </section>
        </>
        );
};

export default PaymentSuccess;
