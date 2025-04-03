import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../contexts/User"
const Header = () => {

    const { userName } = useContext(UserContext)

    return (
        <div id="header-container">
            <Link to ='/'>
            <div id="home-icon-container"><img src="http://i.imgur.com/i48gxxj.jpg" alt="Chris's News Logo" /></div>
            </Link>
            <h1>Chris's NC News</h1>
            <div id="header-logged-in-user">
                <Link to='/user'>
                <img src="../../src/assets/profile-default-svgrepo-com.svg" alt="user" />
                    <p id="header-username">
                        {userName}
                    </p>
                </Link>
            </div>
        </div>
    )

}

export default Header