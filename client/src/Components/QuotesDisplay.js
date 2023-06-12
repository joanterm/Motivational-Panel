import heartEmptyIcon from "../Styling/heart-empty.png"
import heartFullIcon from "../Styling/heart-full.png"
import axios from "axios"

const QuotesDisplay = (props) => {
    const {
        setFavoriteIcons, 
        favoriteIcons, 
        favoriteQuoteData, 
        backend, 
        deleteQuote, 
        setQuoteId, 
        addQuoteToFavorites, 
        isFavorite
    } = props

    return (
        <div>
            <div>
            <h1>All my quotes:</h1>
                {backend.map((data) => 
                <div className="individual-quotes" key={data.id}>
                    <div className="quotes-area">
                        <h2>{data.quote}</h2>
                        <p>{data.author}</p>
                    </div>
                    <div className="quotes-container">
                        <div className="icon-container">
                            {isFavorite(data.id) ? 
                            <img src={heartFullIcon} onClick={() =>                               
                                favoriteQuoteData.map((item) => {
                                    if (item.favorites_id === data.id) {
                                        axios
                                        .delete(`/favorites/${item.id}`)
                                        .then(() => {
                                            if (!favoriteIcons.includes(item.id)) {
                                                console.log("doesnt include item id", item.id)
                                                setFavoriteIcons(favoriteIcons.filter((id) => {
                                                    return id !== data.id
                                                }))}                      
                                        })
                                        .catch((err) => {
                                            console.log(err)
                                        })
                                    }
                                }) 
                            } className="heart-icon" alt="heart-icon"/> : 
                            <img src={heartEmptyIcon} onClick={() => addQuoteToFavorites(data.id)} className="heart-icon" alt="heart-icon"/>} 
                        </div>
                        <div className="buttons-container">
                            <button onClick={() => deleteQuote(data.id)} className="quotes-buttons-delete">DELETE QUOTE</button>
                            <button onClick={() => setQuoteId(data.id)} className="quotes-buttons-update">UPDATE QUOTE</button>
                        </div>
                    </div>
                </div>
                )}
            </div>         
        </div>
    )
}
         
export default QuotesDisplay;
