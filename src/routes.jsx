import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ArticlePage from "./pages/ArticlePage";
import TopicsList from "./pages/TopicsList";
import UserProfile from "./pages/UserProfile";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
             <Route path="/articles/:article_id" element={<ArticlePage />} />
             <Route path="/topics" element={<TopicsList />} />
            <Route path="/users/:username" element={<UserProfile />} />
        </Routes>
    )
}

export default AppRoutes;