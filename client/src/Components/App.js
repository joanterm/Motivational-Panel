import "../Styling/App.css"
import {Routes, Route} from "react-router-dom"
import {useState} from "react"
import Quotes from "./Quotes";
import SignUp from "./SignUp"
import Login from "./Login"
import Favorites from "./Favorites";
import Navigation from "./Navigation";
import Context from "./context"

function App() {
    const [authData, setAuthData] = useState({
        username: "",
        password: ""
    })
    const [formErrors, setFormErrors] = useState("")

    const handleAuthFormChange = (e) => {
      setAuthData({
          ...authData,
          [e.target.name]: e.target.value
      })      
  }

  return (
    <Context.Provider value={{authData, setAuthData, handleAuthFormChange, formErrors, setFormErrors}}>
    <div>
      <div className="quotes-navigation">
        <Navigation />
      </div>

      <Routes>
        <Route exact path="/" />
        <Route exact path="/quotes" element={<Quotes />}/>
        <Route exact path="/signup" element={<SignUp />}/>
        <Route exact path="/login" element={<Login />}/>
        <Route exact path="/favorites" element={<Favorites />}/>
      </Routes>
    </div>
    </Context.Provider>
    
  );
}

export default App;
