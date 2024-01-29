import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import authService from "./appwriteBackend/auth";
import { login, logout } from "./store/authSlice";
import "./index.css";
// import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
  // const { loading, setLoading } = useState(false);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   authService
  //     .getCurrentUser()
  //     .then((userData) => {
  //       if (userData) {
  //         dispatch(login({ userData }));
  //       } else {
  //         dispatch(logout());
  //       }
  //     })
  //     .finally(() => setLoading(false));
  // }, []);

  // return !loading ? (
  //   <>
  //     <Header />

  //     <Footer />
  //   </>
  // ) : (
  //   <div>Loading...</div>
  // );
};

export default App;
