import {useState} from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const SignUp = () => {
    const [signUpData, setSignUpData] = useState({
        username: "",
        password: ""
    })
    const [formErrors, setFormErrors] = useState("")
    const navigate = useNavigate()

    const handleSignupSubmit = (e) => {
        e.preventDefault()
        axios
        .post("/auth/register", {
            username: signUpData.username,
            password: signUpData.password
        })     
        .then(() => {
            navigate("/login")
        })
        .catch((err) => {
            setFormErrors(err.response.data.message)
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
        <div className="outer-card">
            <div className="inner-card">
                <h1>Sign up to create an account.</h1>
                <form onSubmit={handleSignupSubmit}>
                    <label htmlFor="username">Username (min 3 characters long):</label>
                    <input 
                    type="text"
                    name="username"
                    value={signUpData.username}
                    onChange={handleSignupChange}
                    />
                    <label htmlFor="password">Password (min 3 characters long):</label>
                    <input 
                    type="text"
                    name="password"
                    value={signUpData.password}
                    onChange={handleSignupChange}
                    />
                    <h4>{formErrors}</h4>
                    <button className="submit-button">Submit</button>
                </form>
            </div>
        </div>
     );
}
 
export default SignUp;