import { useParams } from "react-router-dom";
import "./Blogpost.css";
import posts from "../../../src/constants/data.json";
import { Link } from "react-router-dom";

import axios from "axios";
import { useEffect, useState } from "react";

function Blogpost() {
  const { id } = useParams();
  console.log(id);
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  async function fetchPosts() {
    try {
      const result = await axios.get(
        "https://novi-backend-api-wgsgz.ondigitalocean.app/api/blogposts",
        {
          headers: {
            "novi-education-project-id": "0aa01fc3-b0dd-4ad7-9f9e-82b0c9688601",
          },
          params: {
            id: id,
          },
        },
      );
      setPost(result.data[0]);
      console.log(result.data[0]);
    } catch (e) {
      console.error(e);
      setError("Er ging iets fout bij het laden van de posts.");
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      {post ? (
        <>
          <h1>
            {post.title} <span> - {post.readTime} minuten leestijd</span>
          </h1>
          <p>
            Geschreven door {post.author} op
            {new Date(post.created).toLocaleDateString("nl-NL", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <h2>{post.subtitle}</h2>
          <p>{post.content}</p>
          <p>
            {post.comments} reacties - {post.shares} keer gedeeld
          </p>
          <Link to="/posts">Terug naar de overzichtspagina</Link>
        </>
      ) : (
        <p>Aan het laden...</p>
      )}
      {error && <p className="error">{error}</p>}
    </>
  );
}

export default Blogpost;
