import { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import { fetchAllArticles } from "../utils/api";

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
        console.log(data);
        setArticles(data.articles);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching articles");
        setLoading(false);
      });
  }, [sortBy, order]); 

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="article-list">
      <h2>All Articles</h2>

      <label>Sort By:</label>
      <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
        <option value="created_at">Date</option>
        <option value="votes">Votes</option>
        <option value="comment_count">Comments</option>
      </select>

      <label>Order:</label>
      <select onChange={(e) => setOrder(e.target.value)} value={order}>
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>

      <div className="article-cards">
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </div>
    </div>
  );
}

export default ArticleList;