import { animationCreate } from "@/utils/utils";
import React, {useEffect} from "react";
import BackToTop from "../lib/BackToTop";
import FooterThree from "./footers/footer-3";
import HeaderThree from "./headers/header-3";

const WrapperThree = ({ children }) => {

  useEffect(() => {
    setTimeout(() => {
      animationCreate()
    }, 500);
  },[])


  return (
    <>
      <HeaderThree />
      {children}
      <FooterThree />
      <BackToTop />
    </>
  );
};

export default WrapperThree;
