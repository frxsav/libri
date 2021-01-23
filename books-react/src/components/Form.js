import * as $ from 'jquery';
import gsap from 'gsap';
import { TweenMax } from 'gsap';
import { useEffect } from 'react';

const Form = ({setIsEmpty, setFinalBookUrl, bookUrl, setBook}) => {

    useEffect(() =>{
        const tl = gsap.timeline({default:{ease: "power.out"}});
        tl.fromTo("#form-container", {y: "100%"}, {y: "0%", duration: 1});
        tl.fromTo("#form-container", {opacity: 0}, {opacity: 1, duration: 1}, "0.5");
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
            
            TweenMax.to("#form-container", 1, {opacity: 0, display: "none"});
        }

    return(

        <div id="form-container">
            <form id="form" className="d-flex justify-content-center">
                <div className="d-flex flex-column align-items-center py-5">
                    <h1 id="search-bar mb-5">Search a Book!</h1>
                    <input type="text" id="input-book" className="mt-3" placeholder="Example: JavaScript course"/>
                    <button className="btn-style mt-5" id="search-btn" onClick={clickHandler}> Search</button>
                </div>
            </form>
        </div>
    );
};

export default Form;