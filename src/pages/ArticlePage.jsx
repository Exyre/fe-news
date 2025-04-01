import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById } from "../utils/api";

function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchArticleById(article_id)
      .then((data) => {
        setArticle(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching article");
        setLoading(false);
      });
  }, [article_id]);

  if (loading) return <p>Loading article...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{article.title}</h1>
      <h4>By {article.author}</h4>
      <p>{article.body}</p>
      <p>Votes: {article.votes}</p>
      {/* Add comments section here */}
    </div>
  );
}

export default ArticlePage;