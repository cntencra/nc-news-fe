import '../css/article.css'

import { useParams } from 'react-router-dom';

import Comments from './Comments';
import MainArticle from './MainArticle';

import { getArticle } from '../api';
import useApiRequest from '../useApiRequest';
import ErrorMsg from './ErrorMsg';


const Article = () => {

    const { article_id } = useParams();

    const{data:article, isLoading, error} = useApiRequest(getArticle, article_id)
    
    if (error) return <ErrorMsg error={error} />

    if (isLoading) return <p>Loading... </p>

    return (
    <>
        <MainArticle article={article}/>
        <Comments articleId={article_id}/>
    </>
    )

}

export default Article