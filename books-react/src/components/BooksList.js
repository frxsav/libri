import ReactHtmlParser from 'react-html-parser';
import gsap from 'gsap';
import * as $ from 'jquery';
import { useState } from 'react';

const BooksList = ({item, error, img}) => {
    let title = item.volumeInfo.title;
    let authors = [];
    let description = item.volumeInfo.description;
    let subtitle = item.volumeInfo.subtitle;
    let rating = item.volumeInfo.averageRating;
    let ratingHTML = '';
    const [isOpen, setIsOpen] = useState(false);

    const tl = gsap.timeline({default:{ease: "power.out"}});
    tl.fromTo("#single-card", {y: "100%"}, {y: "0%", duration: 1});
    tl.fromTo("#single-card", {opacity: 0}, {opacity: 1, duration: 1}, "0.5");

        if(rating === 5){
            ratingHTML = '';
            ratingHTML = `
                <i class='fas fa-star yellow'></i>
                <i class='fas fa-star yellow'></i>
                <i class='fas fa-star yellow'></i>
                <i class='fas fa-star yellow'></i>
                <i class='fas fa-star yellow'></i>
                `;
       }else if(rating === undefined){
            ratingHTML = '';
            ratingHTML = `
                <i class='fas fa-star'></i>
                <i class='fas fa-star'></i>
                <i class='fas fa-star'></i>
                <i class='fas fa-star'></i>
                <i class='fas fa-star'></i>
                `;
       }else if((rating / 0.5) % 2 !== 0){
            for(let i = 0; i < rating - 0.5; i++){
                ratingHTML += `<i class='fas fa-star yellow'></i>`;
            }
            ratingHTML += `<i class='fas fa-star-half-alt yellow'></i>`;
            for(let i = 0; i < 5-(rating+0.5); i++){
                ratingHTML += `<i class='fas fa-star'></i>`;
            }
       }else{
            for(let i = 0; i < rating; i++){
                ratingHTML += `<i class='fas fa-star yellow'></i>`;           
            }
            for(let j = 0; j < 5 - rating; j++){
                ratingHTML += `<i class='fas fa-star'></i>`;
            }
        }
        
    
    if(error === null) return <div>Errore: {error.message}</div>
    else{
        if(description === undefined) description = "";
        if(subtitle === undefined) subtitle = "";

        try{
            if(item.volumeInfo.authors.length > 1){
                for(let i = 0; i < item.volumeInfo.authors.length; i++){
                    (i === item.volumeInfo.authors.length - 1) ? authors += item.volumeInfo.authors[i] + '.' : authors +=item.volumeInfo.authors[i] + ", ";
                }
            }else{
                authors = item.volumeInfo.authors[0];
            }
        }catch(e){
            authors = "unknown author";
        }

        function createCard(item1){
            let image = document.getElementById("img-id");
            let authorsCard = document.getElementById("authors");
            let titleCard = document.getElementById("title");
            let publisherCard = document.getElementById("publisher");
            let dateCard = document.getElementById("date");
            let pagesCard = document.getElementById("pages");
            let authors1;
            let card = document.getElementById("book-card");
            let back = document.getElementById("black-back");
            let zindex = document.getElementById("all-page");

            document.getElementById("date-span").classList.remove("d-none");
            document.getElementById("publisher-span").classList.remove("d-none");
            document.getElementById("pages-div").classList.remove("d-none");

            try{
                if(item1.volumeInfo.authors.length > 1){
                    for(let i = 0; i < item1.volumeInfo.authors.length; i++){
                        (i === item1.volumeInfo.authors.length - 1) ? authors1 += item1.volumeInfo.authors[i] + '.' : authors +=item.volumeInfo.authors[i] + ", ";
                    }
                }else{
                    authors1 = item1.volumeInfo.authors[0];
                }
            }catch(e){
                authors1 = "unknown author";
            }

            item1.volumeInfo.publishedDate === undefined ? document.getElementById("date-span").classList.add("d-none") : dateCard.innerHTML = item1.volumeInfo.publishedDate;          
            item1.volumeInfo.publisher === undefined ? document.getElementById("date-span").classList.add("d-none") : publisherCard.innerHTML = item1.volumeInfo.publisher;
            item1.volumeInfo.pageCount === undefined ? document.getElementById("pages-div").classList.add("d-none") : pagesCard.innerHTML = item1.volumeInfo.pageCount;

            
            image.src = item1.volumeInfo.imageLinks.thumbnail;
            authorsCard.innerHTML = authors1;
            titleCard.innerHTML = item1.volumeInfo.title;
            back.style.display = 'block';
            card.classList.remove("d-none");
            card.classList.add("d-flex");
            card.style.opacity = "1";
            zindex.style.zIndex = "3";
        }

        function closeCard(){
            let card = document.getElementById("book-card");
            let back = document.getElementById("black-back");
            let zindex = document.getElementById("all-page");

            back.style.display = 'none';
            card.classList.remove("d-flex");
            card.classList.add("d-none");
            zindex.style.zIndex = "-1";
        }
        
        
        return(
            <div className="col-md-4 p-3">
                <div id="black-back"></div>
                <div className="book-div-style row col-md-12 pl-0 h-100" id="single-card">
                    <img src={img} alt="" className="col-md-6 pl-0"/>
                    <div className="col-md-6 pl-0">
                        <h3 className="mb-0 mt-1">{title}</h3>
                        <span className="text-muted mb-3 h6">{authors}</span>
                        <div className="row stars-div" id="rating">
                            <span id="stars">
                                {ReactHtmlParser(ratingHTML)}
                            </span>
                            <button className="stars-btn" onClick={() => createCard(item)}>Portami lì</button>
                        </div>
                    </div>
                </div>
                <div id="all-page">
                    <div className="card card-style d-none flex-row" id="book-card">
                        <div className="col-md-5 pl-0">
                            <img className="col-md-12 px-0" src="" alt="" id="img-id"/>
                        </div>
                        <div className="card-body col-md-6">
                            <p className="card-title h1" id="title">Card title</p>
                            <p className="card-text text-muted h5" id="authors">e up the bulk of the card's content.</p>
                            <button onClick={() => closeCard()} id="positioning-x"><i class="fas fa-times" style={{color: "black"}}></i></button>
                            <div className="mt-5">
                                <h5><strong>Published</strong></h5>
                                <div className="d-flex flex-row">
                                    <span id="publisher-span" className=""><strong>by</strong></span>
                                    <p id="publisher" className="pl-3"></p>
                                </div>
                                <div className="d-flex flex-row">
                                    <span id="date-span"><strong>Il</strong></span>
                                    <p id="date" className="pl-3"></p>
                                </div>
                                <div className="mt-5 d-flex flex-row" id="pages-div">
                                    <p id="pages"></p>
                                    <span className="pl-3">pages</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BooksList;