import "./Posts.css";

import posts from "../../../src/constants/data.json";

import { Link } from "react-router-dom";

function Posts() {
  return (
    <>
      <section>
        <h1>Posts</h1>
        <p>{posts.length} posts</p>
      </section>
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
    </>
  );
}

export default Posts;
