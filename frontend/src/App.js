import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CollapsibleNav from "./components/NavBar";
import Footer from "./components/Footer";
import PostCards from "./components/Posts";
import { usePostList } from "./hooks/usePostList";
import SignIn from "./pages/auth/SignInForm";
import SignUp from "./pages/auth/SignUpForm";
import PostDetail from "./components/PostDetail";
import jwtDecode from "jsonwebtoken/decode";
import fetchUsername from "./util/fetchUsername";
import { logoutUser } from "./components/Logout";

function App() {
  const { PostList } = usePostList();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [user_id, setUserId] = useState(null);

  const handleLogin = (token) => {
    const decodedToken = jwtDecode(token);
    setIsUserLoggedIn(true);
    setUserId(decodedToken.user_id);
    fetchUsername(decodedToken.user_id)
      .then((username) => {
        setUserName(username);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogout = () => {
    logoutUser();
    setUserId(null);
    setUserName("");
    setIsUserLoggedIn(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      const decodedToken = jwtDecode(token);
      setIsUserLoggedIn(true);
      setUserId(decodedToken.user_id);
      fetchUsername(decodedToken.user_id)
        .then((username) => {
          setUserName(username);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <BrowserRouter>
      <div>
        <CollapsibleNav
          isUserLoggedIn={isUserLoggedIn}
          userName={userName}
          handleLogout={handleLogout}
        />
        <Routes>
          <Route path="/" element={<PostCards />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="signin" element={<SignIn onLogin={handleLogin} />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
