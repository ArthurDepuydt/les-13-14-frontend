import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { calculateReadTime } from "../../helpers/readTime";
import "./NewPost.css";

import axios from "axios";

function NewPost() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    author: "",
    content: "",
  });

  const [errors, setErrors] = useState({});
  const [submitErrors, setSubmitErrors] = useState(null);
  const [success, setSuccess] = useState(false);
  const [url, setUrl] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Titel is verplicht.";
    if (!form.subtitle.trim()) newErrors.subtitle = "Subtitel is verplicht.";
    if (!form.author.trim()) newErrors.author = "Auteur is verplicht.";
    if (!form.content.trim()) {
      newErrors.content = "Bericht is verplicht.";
    } else if (form.content.length < 300) {
      newErrors.content = "Bericht moet minimaal 300 karakters bevatten.";
    } else if (form.content.length > 2000) {
      newErrors.content = "Bericht mag maximaal 2000 karakters bevatten.";
    }
    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const post = {
      title: form.title,
      subtitle: form.subtitle,
      content: form.content,
      author: form.author,
      created: new Date().toISOString(),
      readTime: calculateReadTime(form.content),
      comments: 0,
      shares: 0,
    };

    try {
      const result = await axios.post(
        "https://novi-backend-api-wgsgz.ondigitalocean.app/api/blogposts",
        {
          title: post.title,
          subtitle: post.subtitle,
          content: post.content,
          author: post.author,
          created: post.created,
          readTime: post.readTime,
          comments: post.comments,
          shares: post.shares,
        },
        {
          headers: {
            "novi-education-project-id": "0aa01fc3-b0dd-4ad7-9f9e-82b0c9688601",
          },
        },
      );
      console.log(result);
      setUrl(`http://localhost:5173/posts/${result.data.id}`);
      setSuccess(true);
    } catch (e) {
      console.error(e);
      setSubmitErrors(e.message);
    }
  }

  return (
    <div>
      <h1>Nieuwe blogpost</h1>
      {success == false ? (
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="title">Titel</label>
            <input
              id="title"
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
            />
            {errors.title && <span className="error">{errors.title}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="subtitle">Subtitel</label>
            <input
              id="subtitle"
              name="subtitle"
              type="text"
              value={form.subtitle}
              onChange={handleChange}
            />
            {errors.subtitle && (
              <span className="error">{errors.subtitle}</span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="author">Auteur</label>
            <input
              id="author"
              name="author"
              type="text"
              value={form.author}
              onChange={handleChange}
            />
            {errors.author && <span className="error">{errors.author}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="content">Bericht</label>
            <textarea
              id="content"
              name="content"
              rows={10}
              value={form.content}
              onChange={handleChange}
            />
            {errors.content && <span className="error">{errors.content}</span>}
          </div>

          <button type="submit">Verzenden</button>

          {submitErrors && <p className="error">{submitErrors}</p>}
        </form>
      ) : (
        <p>
          De blogpost is succesvol toegevoegd. Je kunt deze hier
          <a href={url}> {url} </a> bekijken.
        </p>
      )}
    </div>
  );
}

export default NewPost;
