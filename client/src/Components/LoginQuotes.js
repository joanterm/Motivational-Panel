import { Link} from "react-router-dom"
import { useContext } from "react"
import Context from "./context"

const LoginQuotes = () => {
    const {cleaFormField, handleLoginSubmit, authData, handleAuthFormChange, formErrors} = useContext(Context)

    const handleRedirectToQuotes = (e) => {
        handleLoginSubmit(e, "/quotes")
    }
 
    return ( 
        <div className="outer-card">
            <div className="inner-card">
                <h1>Log in to your account.</h1>
                <form onSubmit={handleRedirectToQuotes}>
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
 
export default LoginQuotes;