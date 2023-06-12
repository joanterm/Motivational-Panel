import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useContext, useEffect } from "react"
import Context from "./context"

const SignUp = () => {
    const {authData, setAuthData, handleAuthFormChange, formErrors, setFormErrors} = useContext(Context)
    const navigate = useNavigate()

    useEffect(() => {
        setFormErrors("")
    }, [])

    const handleSignupSubmit = (e) => {
        e.preventDefault()
        axios
        .post("/auth/register", {
            username: authData.username,
            password: authData.password
        })     
        .then(() => {
            setAuthData({
                username: "",
                password: ""
            })
            setFormErrors("")
            navigate("/login/quotes")
        })
        .catch((err) => {
            setFormErrors(err.response.data.message)
        })          
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
                    value={authData.username}
                    onChange={handleAuthFormChange}
                    />
                    <label htmlFor="password">Password (min 3 characters long):</label>
                    <input 
                    type="text"
                    name="password"
                    value={authData.password}
                    onChange={handleAuthFormChange}
                    />
                    <h4>{formErrors}</h4>
                    <button className="submit-button">Submit</button>
                </form>
            </div>
        </div>
     );
}
 
export default SignUp;