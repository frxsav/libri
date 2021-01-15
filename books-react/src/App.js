import './App.css';
import * as $ from 'jquery';
import { useEffect, useState } from 'react';
import Form from './Form.js';
import BooksList from './BooksList.js';


function App() {
  const [book, setBook] = useState("");
  const bookUrl = "https://www.googleapis.com/books/v1/volumes?q=";
  const [items, setItems] = useState([]);
  const [finalBookUrl, setFinalBookUrl] = useState("");
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEmpty, setIsEmpty] = useState();
  const [errorArray, setErrorArray] = useState(true);


  useEffect(() => {

    fetch(finalBookUrl)
    .then(res => res.json())
    .then(
        (result) => {
            setItems(result.items);
            setIsLoaded(true);
            setError(null);
        },
        (error) => {
            setError(error);
            setIsLoaded(true);
        }
    );
    
  }, [finalBookUrl]);

  

  if(isEmpty || items === undefined){
    console.log("errore");
    return(
      <div>
        <Form setIsEmpty={setIsEmpty} error={error} items={items} setError={setError} finalBookUrl={finalBookUrl} setFinalBookUrl={setFinalBookUrl} setItems={setItems} bookUrl={bookUrl} book={book} setBook={setBook} />
        <div>
          <div className="margins">
              <div className="row justify-content-between" id="book-list">
              </div>
          </div>
        </div>
      </div>
    )
  }else{
    
    return(
      <div>
        <Form setIsEmpty={setIsEmpty} error={error} items={items} setError={setError} finalBookUrl={finalBookUrl} setFinalBookUrl={setFinalBookUrl} setItems={setItems} bookUrl={bookUrl} book={book} setBook={setBook} />
        <div>
          <div className="margins">
              <div className="row justify-content-between" id="book-list">
                  {
                    items.map(item => (
                      <BooksList key={item.id} item={item} img={item.volumeInfo.imageLinks.smallThumbnail}/>
                  ))}
              </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
