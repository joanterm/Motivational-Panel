import {useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

const Login = () => {
    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    })
    const [formErrors, setFormErrors] = useState("")
    const navigate = useNavigate()
    
    const handleLoginSubmit = (e) => {
        e.preventDefault()
        axios
        .post("/auth/login", {
            username: loginData.username,
            password: loginData.password
        })     
        .then((response) => {
            console.log("LOGIN:", response)
            console.log("JWT:", response.data.jwtToken)
            const clientToken = response.data.jwtToken
            localStorage.setItem("token", clientToken)
            setLoginData({
                username: "",
                password: ""
            })
            navigate("/quotes")
        })
        .catch((err) => {
            setFormErrors(err.response.data.message)
        })  
    }

    const handleLoginChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        })
        console.log(loginData);       
    }

    // const logout = () => {
    //     if(window.localStorage.getItem("token")) {
    //         localStorage.removeItem("token")
    //     }           
    // }

    return ( 
        <div>
            <h1>LOGIN</h1>
            <form onSubmit={handleLoginSubmit}>
                <label htmlFor="username">Username:</label>
                <input 
                    type="text"
                    name="username"
                    value={loginData.username}
                    onChange={handleLoginChange} 
                
                />
                <label htmlFor="password">Password:</label>
                <input 
                    type="text" 
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                />
                <h4>{formErrors}</h4>
                <button className="submit-button">Submit</button>
            </form>
            <h1>Don't have an account?</h1>
            <Link to="/signup">Sign Up</Link>
            {/* <button onClick={logout}>LOGOUT</button> */}
        </div>
     );
}
 
export default Login;