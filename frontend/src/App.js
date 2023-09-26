import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CollapsibleNav from "./components/NavBar";
import Footer from "./components/Footer";
import PostCards from "./components/Posts";
import { usePostList } from "./hooks/usePostList";

function App() {
  const { PostList } = usePostList();
  console.log(PostList);

  return (
    <BrowserRouter>
      <div>
        <CollapsibleNav />
        <PostCards />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
