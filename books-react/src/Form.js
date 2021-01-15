import * as $ from 'jquery';
import gsap from 'gsap';
import { useEffect } from 'react';

const Form = ({setIsEmpty, setFinalBookUrl, bookUrl, setBook}) => {

    useEffect(() =>{
        const tl = gsap.timeline({default:{ease: "power.out"}});
        tl.fromTo("form", {y: "100%"}, {y: "0%", duration: 1});
        tl.fromTo("form", {opacity: 0}, {opacity: 1, duration: 1}, "0.5");
    }, []);

    async function clickHandler (e) {
            
            const updateBook = await $('#input-book').val();
            const updateFinalBookUrl = await bookUrl + updateBook;

            e.preventDefault();

            if($("#input-book").val() === ""){
                setIsEmpty(true);
            }else{
                setBook(updateBook);
                setFinalBookUrl(updateFinalBookUrl);
                setIsEmpty(false);
            }
        }


    return(
        <form>
            <div className="container d-flex flex-column align-items-center mt-5">
                <h1 id="search-bar">Search a Book!</h1>
                <input type="text" id="input-book" placeholder="search a book here"/>
                <button className="btn-style mt-3" id="search-btn" onClick={clickHandler}> Search</button>
            </div>
        </form>
    );
};

export default Form;