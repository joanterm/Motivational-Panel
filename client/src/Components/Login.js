import {useState} from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Login = () => {
    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    })
    
    const handleLoginSubmit = (e) => {
        // e.preventDefault()
        // axios
        // .post("/auth/login", {
        //     loginUsername: loginData.loginUsername,
        //     loginPassword: loginData.loginPassword
        // })
        // .then((response) => {
        //     console.log(response)
        // })
        // .catch((error) => {
        //     console.log(error)
        // })
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
        })
        .catch((err) => {
            console.log(err)
        })  
    }

    const handleLoginChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        })
        console.log(loginData);       
    }

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
                <button className="submit-button">Submit</button>
            </form>
        </div>
     );
}
 
export default Login;