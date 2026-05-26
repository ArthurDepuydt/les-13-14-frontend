import "./Posts.css";

import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState([]);

  async function fetchPosts() {
    try {
      const result = await axios.get(
        "https://novi-backend-api-wgsgz.ondigitalocean.app/api/blogposts",
        {
          headers: {
            "novi-education-project-id": "0aa01fc3-b0dd-4ad7-9f9e-82b0c9688601",
          },
        },
      );
      setPosts(result.data);
      console.log(result.data);
    } catch (e) {
      console.error(e);
      setError("Er ging iets fout bij het laden van de post.");
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <section>
        <h1>Posts</h1>
        <p>{posts.length} posts</p>
      </section>
      {posts.length > 0 ? (
        <section className="posts">
          {posts.map((post) => {
            return (
              <article key={post.id}>
                <Link to={`/posts/${post.id}`}>
                  <h2>
                    {post.title} ({post.author})
                  </h2>
                </Link>
                <p>
                  {post.comments} reacties - {post.shares} keer gedeeld
                </p>
              </article>
            );
          })}
        </section>
      ) : (
        <p>Aan het laden...</p>
      )}
      {error && <p className="error">{error}</p>}
    </>
  );
}

export default Posts;
