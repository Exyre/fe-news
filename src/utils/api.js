import axios from 'axios';

const API_URL = 'https://be-news-ksrf.onrender.com/api'; 

export const fetchAllArticles = async (sort_by, order, topic, limit = 10, p = 1) => {
    try {
        const response = await axios.get(`${API_URL}/articles`, {
            params: { sort_by, order, topic, limit, p },
        });
        return response.data; 
    } catch (error) {
        console.error("Error fetching articles", error);
        throw error;
    }
};

export const fetchArticleById = async (article_id) => {
    try {
        const response = await axios.get(`${API_URL}/articles/${article_id}`);
        return response.data.article;
    } catch (error) {
        console.error(`Error fetching article ${article_id}`, error);
        throw error;
    }
};

export const updateArticleVotes = async (article_id, inc_votes) => {
    try {
        const response = await axios.patch(`${API_URL}/articles/${article_id}`, {
            inc_votes
        });
        return response.data.article; 
    } catch (error) {
        console.error(`Error updating votes for article ${article_id}`, error);
        throw error;
    }
};

export const insertArticle = async (author, title, body, topic, article_img_url) => {
    try {
        const response = await axios.post(`${API_URL}/articles`, {
            author,
            title,
            body,
            topic,
            article_img_url
        });
        return response.data.article; 
    } catch (error) {
        console.error("Error posting new article", error);
        throw error;
    }
};

export const deleteArticleById = async (article_id) => {
    try {
        await axios.delete(`${API_URL}/articles/${article_id}`);
    } catch (error) {
        console.error(`Error deleting article ${article_id}`, error);
        throw error;
    }
};

export const fetchCommentsByArticleId = async (article_id, limit = 10, p = 1) => {
    try {
        const response = await axios.get(`${API_URL}/articles/${article_id}/comments`, {
            params: { limit, p },
        });
        return response.data; 
    } catch (error) {
        console.error("Error fetching comments", error);
        throw error;
    }
};


export const insertCommentByArticleId = async (article_id, username, body) => {
    try {
        const response = await axios.post(`${API_URL}/articles/${article_id}/comments`, {
            username,
            body,
        });
        return response.data; 
    } catch (error) {
        console.error("Error inserting comment", error);
        throw error;
    }
};


export const updateVotesOnComment = async (comment_id, inc_votes) => {
    try {
        const response = await axios.patch(`${API_URL}/comments/${comment_id}`, {
            inc_votes,
        });
        return response.data; 
    } catch (error) {
        console.error("Error updating votes on comment", error);
        throw error;
    }
};

export const deleteCommentById = async (comment_id) => {
  try {
    const response = await axios.delete(`${API_URL}/comments/${comment_id}`);
    return response.data;  
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};