import ArticleList from "../components/ArticleList"
import "../styles/global.css"

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">FE News</h1>
        <p className="home-greeting">Stay informed with the latest stories</p>
        <p>Browse the latest articles curated just for you.</p>
      </header>
      <ArticleList />
    </div>
  );
}

export default Home;