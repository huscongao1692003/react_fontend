import React from "react";
import Breadcrumb from "../bredcrumb/breadcrumb";
import ContactForm from "../form/contact-form";
import CounterArea from "../homes/home/counter-area";
import LocationArea from "./location-area";

const Contact = () => {
  return (
    <>
      <Breadcrumb  title="Contact Us" subtitle="contact" />
      <LocationArea />
      <ContactForm />
      <CounterArea />
    </>
  );
};

export default Contact;
