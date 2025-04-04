import { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import { fetchAllArticles } from "../utils/api";
import { equalizeArticleCardHeights } from "../utils/equalizeHeights";

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   useEffect(() => {
    setLoading(true);
    fetchAllArticles(sortBy, order)
      .then((data) => {
        console.log("API Response:", data); 
        if (data.articles && data.articles.length > 0) {
          console.log("First Article:", data.articles[0]); 
        }
        setArticles(data.articles);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch articles:", err);
        setError("Error fetching articles");
        setLoading(false);
      });
}, [sortBy, order]); 

  // Apply height equalization after articles are loaded
  useEffect(() => {
    if (!loading && articles.length > 0) {
      // Small delay to ensure all content is rendered
      const timeoutId = setTimeout(() => {
        const cleanup = equalizeArticleCardHeights();
        return () => {
          cleanup();
          clearTimeout(timeoutId);
        };
      }, 100);
    }
  }, [loading, articles, sortBy, order]);

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="article-list">
      <div className="feature-card">
      <div className="feature-title">All Articles</div>

        <label className="feature-text">Sort By</label>
        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
          <option value="created_at">Date</option>
          <option value="votes">Votes</option>
          <option value="comment_count">Comments</option>
        </select>

        <label className="feature-text">Order</label>
        <select onChange={(e) => setOrder(e.target.value)} value={order}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
      <div className="article-cards">
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </div>
    </div>
  );
}

export default ArticleList;