import {useState} from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const SignUp = () => {
    const [signUpData, setSignUpData] = useState({
        username: "",
        password: ""
    })
    const navigate = useNavigate()

    const handleSignupSubmit = (e) => {
        e.preventDefault()
        axios
        .post("/auth/register", {
            username: signUpData.username,
            password: signUpData.password
        })     
        .then((response) => {
            console.log("SIGNUP:", response)
            navigate("/login")
        })
        .catch((err) => {
            console.log("Error")
        })          
    }

    const handleSignupChange = (e) => {
        setSignUpData({
            ...signUpData,
            [e.target.name]: e.target.value
        })
        console.log(signUpData);    
    }

    return ( 
        <div>
            <h1>SIGN UP</h1>
        <form onSubmit={handleSignupSubmit}>
            <label htmlFor="username">Username:</label>
            <input 
              type="text"
              name="username"
              value={signUpData.username}
              onChange={handleSignupChange}
            />
            <label htmlFor="password">Password:</label>
            <input 
              type="text"
              name="password"
              value={signUpData.password}
              onChange={handleSignupChange}
            />
            <button className="submit-button">Submit</button>
        </form>

        </div>
     );
}
 
export default SignUp;