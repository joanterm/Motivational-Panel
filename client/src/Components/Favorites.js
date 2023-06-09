import axios from "axios"
import {useEffect, useState} from "react"
import { Navigate } from 'react-router-dom'

const Favorites = () => { 
    const [displayFavoriteQuoteData, setDisplayFavoriteQuoteData] = useState([])

    useEffect(() => {
        axios
        .get("/favorites")
        .then((data) => {     
          setDisplayFavoriteQuoteData(data.data)
        })
        .catch((error) => {
          console.log("GET ERROR", error)
        })
      }, [])

    const deleteFavorite = (quoteID) => {
      axios    
      .delete(`/favorites/${quoteID}`)     
      .then(() => {  
        setDisplayFavoriteQuoteData(displayFavoriteQuoteData.filter((backendQuoteId) => { 
          return backendQuoteId.id !== quoteID
        }))
      })
      .catch((error) => {
        console.log("DELETE ERROR", error)
      })    
    }
   
    return ( 
        <div className="outer-card">
          <div className="inner-card">
            <h1>My favorite quotes:</h1>
            {window.localStorage.getItem("token") ? 
              displayFavoriteQuoteData.map((item) =>
              <div key={item.id} className="favorites-quotes">
                <h2>{item.favoriteQuote}</h2>
                <p>{item.favoriteAuthor}</p>
                <button onClick={() => deleteFavorite(item.id)}>DELETE FAVORITE</button>
              </div>
              ) : 
              <Navigate to="/login/favorites"/>}
          </div>
        </div>
        
     );
}
 
export default Favorites;