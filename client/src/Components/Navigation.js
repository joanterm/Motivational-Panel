import {Link, useNavigate} from "react-router-dom"

const Navigation = () => {
    const navigate = useNavigate()

    const logout = () => {
        if(window.localStorage.getItem("token")) {
            localStorage.removeItem("token")
            navigate("/")
        }           
    }

    return ( 
        <div>
            NAVIGATION
            <Link to="/">Home</Link>
            <Link to="/quotes">Quotes</Link>
            <Link to="/login">Login</Link>
            <Link to="/favorites">Favorites</Link>
            <button onClick={logout}>Log Out</button>
        </div>
     );
}
 
export default Navigation;