import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById, fetchCommentsByArticleId, insertCommentByArticleId } from "../utils/api";

function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCommentBody, setNewCommentBody] = useState("")

  useEffect(() => {
    setLoading(true);
    fetchArticleById(article_id)
      .then((data) => {
        setArticle(data);
        return fetchCommentsByArticleId(article_id)
      })
      .then((commentData) => {
        setComments(commentData.comments);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching article");
        setLoading(false);
      });
  }, [article_id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newCommentBody.trim() !== "") {
      insertCommentByArticleId(article_id, newCommentBody) 
        .then((newComment) => {
          setComments((prevComments) => [newComment, ...prevComments]); 
          setNewCommentBody(""); 
        })
        .catch((err) => setError("Error posting comment"));
    }
  };

  if (loading) return <p>Loading article...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="article-page">
      <h1 className="article-title">{article.title}</h1>
      <h4 className="article-author">By {article.author}</h4>
      <p className="article-body">{article.body}</p>
      <div className="article-footer">
        <p className="article-votes">Votes: {article.votes}</p>
        <p className="article-created-at">Created At: {new Date(article.created_at).toLocaleDateString()}</p>
      </div>

       <section className="comments-section">
        <h3>Comments</h3>
        <ul>
          {comments.map((comment) => (
            <li key={comment.comment_id} className="comment-card">
              <p><strong>{comment.author}</strong>: {comment.body}</p>
              <p>👍 {comment.votes} | 🗓 {new Date(comment.created_at).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>

        <form onSubmit={handleCommentSubmit}>
          <textarea 
            value={newCommentBody}
            onChange={(e) => setNewCommentBody(e.target.value)}
            placeholder="Add a comment"
          />
          <button type="submit">Post Comment</button>
        </form>
      </section>
    </div>
  );
}


export default ArticlePage;