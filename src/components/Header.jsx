import '../css/header.css'

import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../contexts/User"
const Header = () => {

    const { userName } = useContext(UserContext)

    return (
        <>
        <div id="header-container">
            <Link to ='/'>
            <div id="home-icon-container"><img src="/news-icon.jpg" alt="Chris's News Logo" /></div>
            </Link>
            <h1>Chris's NC News</h1>
            <div id="header-logged-in-user">
                <Link to='/user'>
                    <img src="https://www.svgrepo.com/show/335455/profile-default.svg" alt={`Logged in User ${userName}`} />
                </Link>
                <div className="hidden-user">{userName}</div>
            </div>
        </div>
       
        </>

    )

}

export default Header
