import ArticleVotes from "./ArticleVotes"

const Article = ({article}) => {

    const date  = (new Date(article.created_at)).toLocaleDateString('en-GB')

    return (
        <div id="article-container">
            <h2>{article.title}</h2>
            <img src={article.article_img_url} alt="" />
            <p>Author | {article.author}</p>
            <p>{date}</p>
            <p>{article.body}</p>
        <ArticleVotes article={article}/>
        </div>
    )

}
export default Article