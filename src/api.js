import axios from "axios";


const api = axios.create({
  baseURL: "https://chris-nc-news.onrender.com/api",
  timeout: 1000,
});


export const getArticles = ( searchParams) => {
  return api.get("/articles", { params: searchParams }).then((response) => {
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

export const getUserComments = (userName) => {
  return api.get(`/comments/${userName}`).then(({ data }) => {
    return data.comments
  })
}

export const getTopics = () => {
  return api.get(`/topics`).then(({data}) => {
    return data.topics
  })
}

export const patchArticleVotes = (articleId, vote) => {
  return api.patch(`/articles/${articleId}`, {inc_votes: vote}).then((response) => {
    return response.data.comment
  })
}

export const postComment = (articleId, author, body) => {
  return api.post(`/articles/${articleId}/comments`, {author, body}).then(({ data }) => {
    return data.comment
  })
}

export const deleteComment = (commentId) => {
  return api.delete(`/comments/${commentId}`)
}