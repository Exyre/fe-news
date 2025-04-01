import { Link } from "react-router-dom";
import placeholderImage from "../assets/default-article.png";

function ArticleCard({ article }) {
  return (
    <div className="article-card">
      <img 
        src={article.article_img_url || placeholderImage} 
        alt={article.title} 
        className="article-img"
     />
      <h3>{article.title}</h3>
     <p>By <strong>{article.author}</strong> in <em>{article.topic}</em></p>
      <p>🗓 {new Date(article.created_at).toLocaleDateString()} | 👍 {article.votes} | 💬 {article.comment_count}</p>
      <p>{article.body.slice(0, 150)}...</p> 
      <Link to={`/articles/${article.article_id}`} className="read-more-link">
        Read More
      </Link>
    </div>
  );
}

export default ArticleCard;