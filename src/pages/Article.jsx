import '../css/article.css'

import { useParams } from 'react-router-dom';

import Comments from '../components/Comments';
import MainArticle from '../components/MainArticle';

import { getArticle } from '../api';
import useApiRequest from '../useApiRequest';
import ErrorMsg from '../components/ErrorMsg';
import Loading from './Loading';


const Article = () => {

    const { article_id } = useParams();

    const{data:article, isLoading, error} = useApiRequest(getArticle, article_id)
    
    if (error) return <ErrorMsg error={error} />

    if (isLoading) return <Loading/>

    return (
    <>
        <MainArticle article={article}/>
        <Comments articleId={article_id}/>
    </>
    )

}

export default Article