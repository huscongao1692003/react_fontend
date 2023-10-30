import "@/src/styles/index.scss"
import { AuthProvider } from "@/utils/AuthContext";
import { ProtectedRoutes } from "@/utils/ProtectedRoutes";
if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

const App = ({ Component, pageProps }) => {
  
  return (
   <AuthProvider>
    <ProtectedRoutes>
          <Component {...pageProps} />
          </ProtectedRoutes>
       </AuthProvider>
  )
  }
  export default App
