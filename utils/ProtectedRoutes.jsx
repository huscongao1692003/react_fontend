import { useRouter } from "next/router";
import { useEffect } from "react";
import useAuth from "./useAuth";
export const ProtectedRoutes = ({ children, allowedRoles }) => {
    const router = useRouter();
    const userRole = typeof window !== "undefined" ? localStorage.getItem("roles") : null;
    const { isAuthenticated } = useAuth(); 
  
   if (
      !isAuthenticated &&
      (
        router.pathname.startsWith("/dashboard")||
        router.pathname.startsWith("/checkout")||
        router.pathname.startsWith("/Settings")||
        router.pathname.startsWith("/cart")||
        router.pathname.startsWith("/course-create-topic")||
        router.pathname.startsWith("/course-create")||
        router.pathname.startsWith("/create-post")||
        router.pathname.startsWith("/my-courses")||
        router.pathname.startsWith("/my-orders")||
        router.pathname.startsWith("/my-collection")||
        router.pathname.startsWith("/study")||
        router.pathname.startsWith("/view-post")
        )
    ) {
      return (
     <p className="">You are not allowed here, Please make sure you login</p>
  )
  }


    return children;
  };