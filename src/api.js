import axios from "axios";


const api = axios.create({
  baseURL: "https://chris-nc-news.onrender.com/api",
  timeout: 1000,
});


export const getArticles = () => {
    return api.get("/articles").then((response) => {
        return response.data.articles
    })
}

export const getArticle = (articleId) => {
  return api.get(`/articles/${articleId}`).then((response) => {
    return response.data.article
  })
}

export const getComments = (articleId) => {
  return api.get(`/articles/${articleId}/comments`).then((response => {
    return response.data.comments
  }))
}

export const patchArticleVotes = (articleId, vote) => {
  return api.patch(`/articles/${articleId}`, {inc_votes: vote}).then((response) => {
    return response.data.comment
  })
}