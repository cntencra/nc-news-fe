import { Link } from "react-router-dom"

const HomeCard = ({article, index}) => {

    const date  = (new Date(article.created_at)).toLocaleDateString('en-GB')
    return (
    <div className={`home-article-container`}>
        <Link to={`/article/${article.article_id}`}>
        <img src={article.article_img_url} alt="" />
        <h4>
            {article.title}
        </h4>
        </Link>
    </div>
    )
}

export default HomeCard