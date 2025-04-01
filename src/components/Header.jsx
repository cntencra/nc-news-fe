import { Link } from "react-router-dom"
const Header = () => {

    return (
        <div id="header-container">
            <Link to ='/'>
            <div id="home-icon-container"><img src="src/assets/news-icon.png" alt="Chris's News Logo" /></div>
            </Link>
            <h1>Chris's NC News</h1>
        </div>
    )

}

export default Header