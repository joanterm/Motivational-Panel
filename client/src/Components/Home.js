import illustrationNotes from "../Styling/illustration-notes.png"

const Home = () => {
    return ( 
        <div className="outer-card">
            <div className="inner-card">
                <h1>Becase storing quotes has never been easier.</h1>
                <div className="homepage-card">
                    <div className="homepage-content">
                        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                        <p>Sed ut perspiciatis unde omnis iste natus.</p>
                        <div className="test">
                        <button>MY QUOTES</button>
                        </div>
                    </div>
                    <img src={illustrationNotes} />
                </div>
            </div>
        </div>
     );
}
 
export default Home;