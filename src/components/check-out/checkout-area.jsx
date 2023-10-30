
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import Spinner from 'react-bootstrap/Spinner';

const CheckoutArea = () => {
  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState({});
  const router = useRouter();
  const { idCourse } = router.query;
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('idCourse', JSON.stringify({
        id: Number(idCourse)
      }));

      axios
        .get(`https://drawproject-production.up.railway.app/api/v1/courses/${idCourse}`)
        .then((response) => {
          setCourseData(response.data.data);
          console.log(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
           console.error('Error fetching course data:', error);
        });
    }
     }, [idCourse]);
     const handelPay = async (e) => {
        e.preventDefault();

        try {
           const response = await axios.post(
              "https://drawproject-production.up.railway.app/api/v1/pay",
              {
                 description: "test",
                 courseId: courseData.courseId,
                 price: courseData.price,
                 totalPrice: courseData.price,
                 url: "https://react-fontend.vercel.app",
              },
              { headers: {"Authorization" : `Bearer ${accessToken}`} });

            await  router.push(response.data);

        } catch (error) {
           console.error('Error fetching course data:', error);
        }
     };

  return (
    <>
      <section className="checkout-area pb-70 wow fadeInUp" data-wow-duration=".8s" data-wow-delay=".2s">
        <div className="container">
          {loading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="row">
                <div className="col-lg-6 col-md-12">
                  <div className="checkbox-form">
                    <h3>Billing Details</h3>
                    <div className="container">
                      <div className="row">
                        <div className="col-12">
                          {courseData != null ? (
                             <div className="table-content table-responsive">
                                <table className="table">
                                   <thead>
                                      <tr>
                                         <th className="product-thumbnail">Images</th>
                                         <th className="cart-product-name">Courses</th>
                                         <th className="product-price">Unit Price</th>
                                         <th className="product-subtotal">Total</th>
                                         <th className="product-remove">Remove</th>
                                      </tr>
                                   </thead>
                                   <tbody>
                                      {/*{courseData.map((item, i) => (*/}
                                         <tr>
                                            <td className="product-thumbnail">
                                               <Link href="/course-details">
                                                  <img src={courseData.image} alt="" />
                                               </Link>
                                            </td>
                                            <td className="product-name">
                                               <Link href="/course-details">{courseData.courseTitle}</Link>
                                            </td>
                                            <td className="product-price">
                                               <span className="amount">${courseData.price}</span>
                                            </td>
                                            <td className="product-subtotal">
                                               <span className="amount">${courseData.price}</span>
                                            </td>
                                            <td className="product-remove">
                                               <Link href={`course-details?id=${idCourse}`}>
                                                  <i className="fa fa-times"></i>
                                               </Link>
                                            </td>
                                         </tr>
                                         {/*))}*/}
                                   </tbody>
                                </table>
                             </div>
                             ) : (
                                <p>Your cart is empty.</p>
                                )}
                           <div className="row">
                              <div className="col-12">
                                 <div className="coupon-all">
                                    <div className="coupon">
                                       <input
                                          id="coupon_code"
                                          className="input-text"
                                          name="coupon_code"
                                          placeholder="Coupon code"
                                          type="text"
                                       />
                                       <button className="tp-btn" name="apply_coupon" type="submit">
                                          Apply coupon
                                       </button>
                                    </div>
                                    <div className="coupon2">
                                       <button className="tp-btn" name="update_cart" type="submit">
                                          Update cart
                                       </button>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                 <div className="col-lg-6 col-md-12">
                    <div className="your-order mb-30 ">
                       <h3>Your order</h3>
                       <div className="your-order-table table-responsive">
                          <table>
                             <thead>
                                <tr>
                                   <th className="product-name">Product</th>
                                   <th className="product-total">Total</th>
                                </tr>
                             </thead>
                             <tbody>
                                <tr>
                                   <td className="product-name">Cart Subtotal</td>
                                   <td className="product-total">
                                      <span className="amount">${courseData.price}</span>
                                   </td>
                                </tr>
                             </tbody>
                             <tfoot>
                                <tr className="order-total">
                                   <th>Order Total</th>
                                   <td>
                                      <strong>
                                         <span className="amount">${courseData.price}</span>
                                      </strong>
                                   </td>
                                </tr>
                             </tfoot>
                          </table>
                       </div>
                       <div className="payment-method">
                          <div className="accordion" id="checkoutAccordion">
                             <div className="accordion-item">
                                <h2 className="accordion-header" id="paypalThree">
                                   <button
                                      className="accordion-button collapsed"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#paypal"
                                      aria-expanded="false"
                                      aria-controls="paypal"
                                      >
                                      PayPal
                                   </button>
                                </h2>
                                <div
                                   id="paypal"
                                   className="accordion-collapse collapse"
                                   aria-labelledby="paypalThree"
                                   data-bs-parent="#checkoutAccordion"
                                   >
                                   <div className="accordion-body">Pay via PayPal</div>
                                </div>
                             </div>
                          </div>
                          <div className="order-button-payment mt-20">
                             <button type="submit" className="tp-btn" onClick={handelPay}>
                                Place order
                             </button>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
            </form>
            )}
        </div>
      </section>
    </>
    );
};

export default CheckoutArea;
