import facebookLogo from '../assets/icons/appli/facebook.svg'
import instagramLogo from '../assets/icons/appli/instagram.svg'
import '../Grid.css'
import { useState } from 'react'


const GridCard = () => {
    return(

<div className="cards">
        <div className="card card1">
            <div className="container">
                {/* <img src="las vegas.jpg" alt="las vegas"/> */}
                <img src={facebookLogo} className="logo react" alt="Facebook logo" />

            </div>
            <div className="details">
                <h3>Facebook</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium dignissimos, minus aperiam adipisci exercitationem.</p>
            </div>
        </div>
        <div className="card card2">
            <div className="container">
                {/* <img src="newyork.jpg" alt="New York"/> */}
                <img src={facebookLogo} className="logo react" alt="Facebook logo" />

            </div>
            <div className="details">
                <h3>Facebook</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium dignissimos, minus aperiam adipisci exercitationem.</p>
            </div>
        </div>

        <div className="card card1">
            <div className="container">
                {/* <img src="las vegas.jpg" alt="las vegas"/> */}
                <img src={instagramLogo} className="logo react" alt="Facebook logo" />

            </div>
            <div className="details">
                <h3>Instagram</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium dignissimos, minus aperiam adipisci exercitationem.</p>
            </div>
        </div>
        <div className="card card2">
            <div className="container">
                {/* <img src="newyork.jpg" alt="New York"/> */}
                <img src={instagramLogo} className="logo react" alt="Facebook logo" />

            </div>
            <div className="details">
                <h3>Instagram</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium dignissimos, minus aperiam adipisci exercitationem.</p>
            </div>
        </div> 
        <div className="card card3">
            <div className="container">
                {/* <img src="singapore.jpg" alt="Singapore"/> */}
                <img src={facebookLogo} className="logo react" alt="Facebook logo" />

            </div>
            <div className="details">
                <h3>Singapore</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium dignissimos, minus aperiam adipisci exercitationem.</p>
            </div>
        </div>
    </div>




    )

}
export default GridCard;