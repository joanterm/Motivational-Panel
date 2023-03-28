const QuotesDisplay = (props) => {
    const {backend, deleteQuote, setQuoteId} = props
    return (
        <div>
            <h1>My favorite quotes:</h1>
            {backend.map((data) => 
            <div className="individual-quotes">
                <div className="quotes-area">
                    <h1>{data.quote}</h1>
                    <h2>{data.author}</h2>
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