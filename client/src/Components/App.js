import "../Styling/App.css"
import {Routes, Route} from "react-router-dom"
import {useState, useEffect} from "react"
import Home from "./Home";
import Quotes from "./Quotes";
import SignUp from "./SignUp"
import Favorites from "./Favorites";
import Navigation from "./Navigation"
import LoginFavorites from "./LoginFavorites"
import LoginQuotes from "./LoginQuotes"
import Context from "./context"
import { useNavigate} from "react-router-dom"
import axios from "axios"

function App() {
    const [authData, setAuthData] = useState({
        username: "",
        password: ""
    })
    const [formErrors, setFormErrors] = useState("")
    const navigate = useNavigate()

    //WILL MAKE SURE THE FORM FIELD IS ALWAYS CLEAR
    useEffect(() => {
        setAuthData({
            username: "",
            password: ""
        })
    }, [])

    const handleAuthFormChange = (e) => {
      setAuthData({
          ...authData,
          [e.target.name]: e.target.value
      })      
    }

    const handleLoginSubmit = (e, location) => {
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
          navigate(location)
          
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
      <Context.Provider value={{authData, setAuthData, handleAuthFormChange, formErrors, setFormErrors, handleLoginSubmit, cleaFormField}}>
      <div>
        <div className="test">
          <Navigation />
        </div>

        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/quotes" element={<Quotes />}/>
          <Route exact path="/signup" element={<SignUp />}/>
          <Route exact path="/login/quotes" element={<LoginQuotes />}/>
          <Route exact path="/login/favorites" element={<LoginFavorites />}/>
          <Route exact path="/favorites" element={<Favorites />}/>
        </Routes>
      </div>
      </Context.Provider>     
    )
}

export default App;
