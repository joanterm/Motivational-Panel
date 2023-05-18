import axios from "axios"
import {useEffect, useState} from "react"

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
            {displayFavoriteQuoteData.map((item) =>
            <div>
              <p>{item.favoriteAuthor}</p>
              <button onClick={() => deleteFavorite(item.id)}>DELETE</button>
            </div>
            )}
        </div>
        
     );
}
 
export default Favorites;