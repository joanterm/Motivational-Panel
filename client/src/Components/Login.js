import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"
import { useContext } from "react"
import Context from "./context"

const Login = () => {
    const {authData, setAuthData, handleAuthFormChange, formErrors, setFormErrors} = useContext(Context)
    const navigate = useNavigate()

    //WILL MAKE SURE THE FORM FIELD IS ALWAYS CLEAR
    useEffect(() => {
        setAuthData({
            username: "",
            password: ""
        })
    }, [])
    
    const handleLoginSubmit = (e) => {
        e.preventDefault()
        axios
        .post("/auth/login", {
            username: authData.username,
            password: authData.password
        })     
        .then((response) => {
            const clientToken = response.data.jwtToken
            localStorage.setItem("token", clientToken)
            setAuthData({
                username: "",
                password: ""
            })
            navigate("/quotes")
        })
        .catch((err) => {
            setFormErrors(err.response.data.message)
        })  
    }

    const cleaFormField = () => {
        setAuthData({
            username: "",
            password: ""
        })
    }

    return ( 
        <div className="outer-card">
            <div className="inner-card">
                <h1>Log in to your account.</h1>
                <form onSubmit={handleLoginSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text"
                        name="username"
                        value={authData.username}
                        onChange={handleAuthFormChange} 
                    
                    />
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="text" 
                        name="password"
                        value={authData.password}
                        onChange={handleAuthFormChange}
                    />
                    <h4>{formErrors}</h4>
                    <button className="submit-button">Submit</button>
                </form>
                <h1>Don't have an account?</h1>
                <Link to="/signup" onClick={cleaFormField}>Sign Up</Link>  
            </div>
        </div>
     );
}
 
export default Login;