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

function App() {
  const { PostList } = usePostList();
  console.log(PostList);

  return (
    <BrowserRouter>
      <div>
        <CollapsibleNav />
        <Routes>
          <Route path="/" element={<PostCards />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
