import Link from "next/link";
import React from "react";
import Breadcrumb from "../bredcrumb/breadcrumb";

const PaymentCancel = () => {
  return (
    <>
    <section className="error-area pt-120 pb-115">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="error-item text-center">
                        <div className="error-thumb mb-50">
                            <img src="/assets/img/payment-cancel.jpg" alt="error-bg" />
                        </div>
                        <div className="error-content">
                            <h4 className="error-title mb-35">
                                Oops! You are not complete <br /> PAYMENT yet!
                            </h4>
                            <Link href="/" className="tp-btn">
                                Back To Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
    );
};

export default PaymentCancel;
