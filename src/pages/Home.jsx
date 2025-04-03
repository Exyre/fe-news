import ArticleList from "../components/ArticleList"

function Home() {
  return (
    <div className="home-container">
      <h2>Welcome to My News App</h2>
      <p>Browse the latest articles on different topics.</p>
      <ArticleList />
    </div>
  );
}

export default Home;