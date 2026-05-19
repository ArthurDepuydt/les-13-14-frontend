import { useParams } from "react-router-dom";
import "./Blogpost.css";
import posts from "../../../src/constants/data.json";
import { Link } from "react-router-dom";

function Blogpost() {
  const { id } = useParams();
  let rightPost = null;
  for (const post of posts) {
    if (post.id === parseInt(id)) {
      rightPost = post;
      break;
    }
  }

  return (
    <div>
      <h1>
        {rightPost.title} <span> - {rightPost.readTime} minuten leestijd</span>
      </h1>
      <p>
        Geschreven door {rightPost.author} op {new Date(rightPost.created).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
      </p>
      <h2>{rightPost.subtitle}</h2>
      <p>{rightPost.content}</p>
      <p>
        {rightPost.comments} reacties - {rightPost.shares} keer gedeeld
      </p>
      <Link to="/posts">Terug naar de overzichtspagina</Link>
    </div>
  );
}

export default Blogpost;
