import "./App.css";

import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import Home from "./pages/Home/Home";
import NotFound from "./pages/404/404";
import NewPost from "./pages/NewPost/NewPost";
import Posts from "./pages/Posts/Posts";
import Blogpost from "./pages/Blogpost/Blogpost";

function App() {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/new-post" element={<NewPost />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/posts/:id" element={<Blogpost />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
