import '../css/articleandcomments.css'

import { useParams } from 'react-router-dom';

import Article from './Article';
import Comments from './Comments';

import { getArticle } from '../api';
import useApiRequest from '../useApiRequest';


const ArticleAndComments = () => {

    const { article_id } = useParams();


    const{data:article, isLoading, error} = useApiRequest(getArticle, article_id)

    if (error) return <p>Error {error.msg}</p>

    if (isLoading) return <p>Loading... </p>

    return (
    <>
        <Article article={article}/>
        <Comments articleId={article_id}/>
    </>
    )

}

export default ArticleAndComments