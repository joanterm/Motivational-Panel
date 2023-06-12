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
        <div className="navigation">
            <Link to="/" className="link">Home</Link>
            <Link to="/quotes" className="link">Quotes</Link>
            <Link to="/favorites" className="link">Favorites</Link>
            <Link to="/login/quotes" className="link">Login</Link>
            <button onClick={logout}>Log Out</button>
        </div>
     );
}
 
export default Navigation;