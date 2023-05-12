const QuotesDisplay = (props) => {
    const {backend, deleteQuote, setQuoteId, addQuoteToFavorites} = props

    return (
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
                    <button onClick={() => addQuoteToFavorites(data.id)}>ADD TO FAVORITE</button>
                </div>
            </div>
            )}
        </div>
     )
}
 
export default QuotesDisplay;