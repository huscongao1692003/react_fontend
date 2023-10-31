import "@/src/styles/index.scss";
import { StoreProvider } from "../store";
import { AuthProvider } from "@/utils/AuthContext";
import { ProtectedRoutes } from "@/utils/ProtectedRoutes";
if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}
const App = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <ProtectedRoutes>
        <StoreProvider>
          <Component {...pageProps} />
        </StoreProvider>
      </ProtectedRoutes>
    </AuthProvider>
  );
};
export default App;
