const QuotesDisplay = (props) => {
    const {backend, deleteQuote, setQuoteId} = props
    return (
        <div>
            <h1>My favorite quotes:</h1>
            {backend.map((data) => 
            <div className="individual-quotes">
                <div className="quotes-area">
                    <h2>{data.quote}</h2>
                    <p>{data.author}</p>
                </div>
                <div className="quotes-buttons">
                    <button onClick={() => deleteQuote(data.id)} className="quotes-buttons-delete">DELETE QUOTE</button>
                    <button onClick={() => setQuoteId(data.id)} className="quotes-buttons-update">UPDATE QUOTE</button>
                </div>
            </div>
            )}
        </div>
     )
}
 
export default QuotesDisplay;