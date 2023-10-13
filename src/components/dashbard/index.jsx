
import React from "react";
import Breadcrumb from "../bredcrumb/breadcrumb";
import LoginForm from "../form/login-form";
import DashboardForm from "../form/Dashboard-form";

const Dashboard = () => {
  return (
    <>
    {/* <Breadcrumb title="Log In" subtitle="Dashboard" isDbbl="Pages" /> */}
      <DashboardForm/>
    </>
  );
};

export default Dashboard;
