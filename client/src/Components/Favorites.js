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
        <div>
          {window.localStorage.getItem("token") ? 
            displayFavoriteQuoteData.map((item) =>
            <div key={item.id}>
              <p>{item.favoriteAuthor}</p>
              <button onClick={() => deleteFavorite(item.id)}>DELETE</button>
            </div>
            ) : 
            <Navigate to="/login/favorites"/>}
        </div>
        
     );
}
 
export default Favorites;