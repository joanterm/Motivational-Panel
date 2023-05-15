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

    return ( 
        <div>
            {displayFavoriteQuoteData.map((item) =>
            <p>{item.favoriteAuthor}</p>
            )}
        </div>
        
     );
}
 
export default Favorites;