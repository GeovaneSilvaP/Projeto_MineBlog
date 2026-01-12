import styles from "./EditarPost.module.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

const EditarPost = () => {
  const { id } = useParams();
  const { document: post, loading } = useFetchDocument("posts", id);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();
  const navigate = useNavigate();

  const { updateDocument, response } = useUpdateDocument("posts");

  // ✅ CORREÇÃO AQUI
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);
      setTags(post.tagsArray.join(", "));
    }
  }, [post]); // 👈 DEPENDÊNCIA CORRETA

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    try {
      new URL(image);
    } catch {
      setFormError("A imagem precisa ser uma URL válida.");
      return;
    }

    const tagsArray = tags
      .split(",")
      .map((tag) => tag.replace("#", "").trim().toLowerCase())
      .filter((tag) => tag !== "");

    if (!title || !image || !body || tagsArray.length === 0) {
      setFormError("Preencha todos os campos!");
      return;
    }

    // ✅ UPDATE (não insert)
    updateDocument(id, {
      title,
      image,
      body,
      tagsArray,
    });

    navigate("/dashboard");
  };

  if (loading) return <p>Carregando post...</p>;

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Editando post: {post.title}</h2>
          <p>Altere os dados do post como desejar.</p>

          <form onSubmit={handleSubmit}>
            <label>
              <span>Título:</span>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>

            <label>
              <span>Imagem (URL):</span>
              <input
                type="text"
                required
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </label>

            <label>
              <span>Conteúdo: {post.body}</span>
              <textarea
                required
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </label>

            <label>
              <span>Tags: {post.tagsArray}</span>
              <input
                type="text"
                required
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </label>

            {!response.loading && (
              <button className="btn">Salvar alterações</button>
            )}
            {response.loading && (
              <button className="btn" disabled>
                Salvando...
              </button>
            )}

            {formError && <p className="error">{formError}</p>}
            {response.error && <p className="error">{response.error}</p>}
          </form>
        </>
      )}
    </div>
  );
};

export default EditarPost;
