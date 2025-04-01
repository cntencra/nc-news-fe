import '../css/articleandcomments.css'

import { useParams } from 'react-router-dom';
import Article from './Article';
import Comments from './Comments';

const ArticleAndComments = () => {

    const { article_id } = useParams();
    return (
    <>
        <Article articleId={article_id}/>
        <Comments articleId={article_id}/>
    </>
    )

}

export default ArticleAndComments