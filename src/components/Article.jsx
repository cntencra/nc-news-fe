import '../css/article.css'

import { useParams } from 'react-router-dom';

import Comments from './Comments';
import MainArticle from './MainArticle';

import { getArticle } from '../api';
import useApiRequest from '../useApiRequest';


const Article = () => {

    const { article_id } = useParams();

    const{data:article, isLoading, error} = useApiRequest(getArticle, article_id)
    
    if (error) return <p>Error {error.msg}</p>

    if (isLoading) return <p>Loading... </p>

    return (
    <>
        <MainArticle article={article}/>
        <Comments articleId={article_id}/>
    </>
    )

}

export default Article