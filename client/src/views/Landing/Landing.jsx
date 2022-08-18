import React from "react";
import style from "./Landing.module.css"
import logo from "../../assets/soup.png"
import { Link } from "react-router-dom";

const Landing = ()=>{
    
    return (
        <div className={style.landing}>
            <h1>Welcome to the Chef's Kitchen!</h1>
            <Link to="/recipes">
            <img src={logo} alt="Cooking pot logo" />
            </Link>
            <h4>Click the Image to continue</h4>
        </div>
    )
}

export default Landing