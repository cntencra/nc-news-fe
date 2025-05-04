
import { Link } from 'react-router-dom';
import { getArticles } from '../api';
import ErrorMsg from '../components/ErrorMsg';
import HomeCard from '../components/HomeCard';
import '../css/homepage.css'
import Loading from './Loading';
import { useEffect, useState } from 'react';

const HomePage = () => {
    const [popularArticles, setPopularArticles] = useState(null);
    const [cookingArticles, setCookingArticles] = useState(null);
    const [codingArticles, setCodingArticles] = useState(null);
    const [footballArticles, setFootballArticles] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        setError(null);
        setIsLoading(true);
        const params = {sort_by: 'votes', order: 'desc', limit: 5}
        Promise.all([
            getArticles(params),
            getArticles({...params, topic: 'cooking'}),
            getArticles({...params, topic: 'coding'}),
            getArticles({...params, topic: 'football'}),
        ])
        .then(([popularData, cookingData,codingData, footballData]) => {
            setPopularArticles(popularData);
            setCookingArticles(cookingData);
            setCodingArticles(codingData);
            setFootballArticles(footballData);
        })
        .catch((err) => {
            setError({status:404, msg: `Failed to load resource`})
        })
        .finally(() => {
            setIsLoading(false)
        }
        )
    },[]);

    if (error) return <ErrorMsg error={error} />

    if (isLoading) return <Loading/>

    const articleSections = [
        { title: "Popular", articles: popularArticles },
        { title: "Cooking", articles: cookingArticles },
        { title: "Coding", articles: codingArticles },
        { title: "Football", articles: footballArticles },
      ];
    
    return (
        <> 
            {articleSections.map(({ title, articles }) => (
            <div key={title}>
                <Link to={title === 'Popular' ? `articles/?order=desc&sort_by=votes` : `articles/?topic=${title.toLowerCase()}`}><h2 className="home-title">{title}</h2></Link>
                <ul className="home-grid">
                {articles.map((article, index) => (
                    <li key={article.article_id} 
                    className={`home-list-${index}`}>
                        <HomeCard article={article} index={index} />
                    </li>
                ))}
                </ul>
            </div>
            ))}
        </>
    )
}

export default HomePage