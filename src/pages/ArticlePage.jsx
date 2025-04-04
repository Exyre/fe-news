import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById, fetchCommentsByArticleId, insertCommentByArticleId, updateArticleVotes, deleteCommentById } from "../utils/api";

function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCommentBody, setNewCommentBody] = useState("")
  const [isVoting, setIsVoting] = useState(false);

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

  const handleVote = (voteChange) => {
    if (!article || isVoting) return;
    
    setIsVoting(true);
    setArticle((prevArticle) => ({
      ...prevArticle,
      votes: prevArticle.votes + voteChange,
    }));

    updateArticleVotes(article_id, voteChange)
      .then((updatedArticle) => {
        setArticle(updatedArticle);
      })
      .catch(() => {
        alert("Failed to update vote. Please try again.");
        setArticle((prevArticle) => ({
          ...prevArticle,
          votes: prevArticle.votes - voteChange, 
        }));
      })
      .finally(() => setIsVoting(false));
  };

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

  const handleDeleteComment = (comment_id) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      deleteCommentById(comment_id)
        .then(() => {
          setComments((prevComments) =>
            prevComments.filter((comment) => comment.comment_id !== comment_id)
          );
        })
        .catch((err) => setError("Error deleting comment"));
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
        <div className="vote-container">
          <p className="article-votes">Votes: {article.votes}</p>
          <div className="vote-buttons">
            <button onClick={() => handleVote(1)} disabled={isVoting}>+</button>
            <button onClick={() => handleVote(-1)} disabled={isVoting}>-</button>
          </div>
        </div>
        <p className="article-created-at">Created At: {new Date(article.created_at).toLocaleDateString()}</p>
      </div>

       <section className="comments-section">
        <h3>Comments</h3>
        <ul>
          {comments.map((comment) => (
            <li key={comment.comment_id} className="comment-card">
              <p><strong>{comment.author}</strong>: {comment.body}</p>
              <p>👍 {comment.votes} | 🗓 {new Date(comment.created_at).toLocaleDateString()}</p>
              <button 
                onClick={() => handleDeleteComment(comment.comment_id)} 
                className="delete-comment-btn">
              </button>
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