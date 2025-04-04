import { Link } from "react-router-dom";
import placeholderImage from "../assets/default-article.png";

function ArticleCard({ article }) {
  return (
    <Link to={`/articles/${article.article_id}`} className="article-card-link">
      <div className="article-card">
        <img 
          src={article.article_img_url || placeholderImage} 
          alt={article.title} 
          className="article-img"
          />
        
      <div className="article-card-author">By <strong>{article.author}</strong> in <em>{article.topic}</em></div>
        <div className="article-card-date">{new Date(article.created_at).toLocaleDateString()} | 👍 {article.votes || 0} &nbsp;| &nbsp;💬 {article.comment_count || 0}</div>
        <div className="article-card-title">{article.title}</div>
        <div className="article-card-body">{article.body.slice(0, 150)}...</div> 

      </div>
    </Link>
  );
}

export default ArticleCard;