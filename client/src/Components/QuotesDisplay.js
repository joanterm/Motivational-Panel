import heartEmptyIcon from "../Styling/heart-empty.png"
import heartFullIcon from "../Styling/heart-full.png"
import {useEffect, useState} from "react"
import axios from "axios"


const QuotesDisplay = (props) => {
    const {setFavoriteIcons, favoriteIcons, setFavoriteQuoteData, favoriteQuoteData, backend, deleteQuote, setQuoteId, addQuoteToFavorites, isFavorite} = props

    return (
        <div>
            <div>
                {backend.map((data) => 
                <div className="individual-quotes" key={data.id}>
                    <div className="quotes-area">
                        <h2>{data.quote}</h2>
                        <p>{data.author}</p>
                    </div>
                    <div className="quotes-buttons">
                        <button onClick={() => deleteQuote(data.id)} className="quotes-buttons-delete">DELETE QUOTE</button>
                        <button onClick={() => setQuoteId(data.id)} className="quotes-buttons-update">UPDATE QUOTE</button>
                        {isFavorite(data.id) ? <img src={heartFullIcon} onClick={() =>                               
                            favoriteQuoteData.map((item) => {
                                console.log("item.id", item.favorites_id)
                                console.log("data.id", data.id)
                                if (item.favorites_id === data.id) {
                                    console.log("same")
                                    axios
                                    .delete(`/favorites/${item.id}`)
                                    .then(() => {
                                        if (!favoriteIcons.includes(item.id)) {
                                            console.log("doesnt include item id", item.id)
                                            setFavoriteIcons(favoriteIcons.filter((id) => {
                                                console.log("fav id", id)
                                                return id !== data.id
                                            }))}                      
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    })
                                }
                            }) 
                         } className="heart-icon" alt="heart-icon"/> : <img src={heartEmptyIcon} onClick={() => addQuoteToFavorites(data.id)} className="heart-icon" alt="heart-icon"/>} 
                    </div>
                </div>
                )}
            </div>         
        </div>
    )
}
         
export default QuotesDisplay;

