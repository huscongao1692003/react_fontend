import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import Spinner from 'react-bootstrap/Spinner';
import OrderNotFound from "../error/order-not-found";


const MyOrderLists = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]); // Store orders here
  const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`https://drawproject-production-012c.up.railway.app/api/v1/users/orders`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        setOrders(response.data); // Store the orders in state
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  }, [accessToken]);

  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ paddingTop: '300px', paddingBottom: '300px' }}>
        <Spinner animation="grow" variant="success" size="lg"/>
      </div>
    );
  }

  return (
    <>
      <section
        className="course-list-area pb-120 wow fadeInUp"
        data-wow-duration=".8s"
        data-wow-delay=".2s"
      >
        <div className="container">
          <div className="row text-center">
            <div className="col-lg-12">
              <div className="section-title mb-60">
                <span className="tp-sub-title-box mb-15">My Orders</span>
              </div>
            </div>
          </div>
          <ul className="list-group">
            {orders.length === 0 ? (
              <OrderNotFound className="" />
            ) : (
              orders.map((order, index) => (
                <li key={index} className="list-group-item">
                  <h5 className="pt-10 tp-sub-title-box">{order.courseName}</h5>
                  <p>Username: {order.username}</p>
                  <p>Full Name: {order.fullName}</p>
                  <p>Status: {order.status}</p>
                  <b>Price: {order.price}$</b>
                </li>
              ))
            )}
          </ul>
        </div>
      </section>
    </>
  );
};

export default MyOrderLists;
