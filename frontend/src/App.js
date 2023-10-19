import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CollapsibleNav from "./components/NavBar";
import Footer from "./components/Footer";
import PostCards from "./components/Posts";
import SignIn from "./pages/auth/SignInForm";
import SignUp from "./pages/auth/SignUpForm";
import PostDetail from "./components/PostDetail";
import CreatePost from "./pages/posts/CreatePost";
import EditPost from "./pages/posts/EditPost";
import useUsername from "./hooks/useUsername";

function App() {
  const { isUserLoggedIn, userName, handleLogout, handleLogin } = useUsername();

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
          <Route path="newpost" element={<CreatePost />} />
          <Route path="/editpost/:id" element={<EditPost />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
