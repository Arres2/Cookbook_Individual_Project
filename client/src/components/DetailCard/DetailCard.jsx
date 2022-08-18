import React from "react";
import style from "./DetailCard.module.css"



const DetailCard = (props) => {

  return (
    <div className={style.detailCard } key={props.id}>
      <div  className={style.container}>
          <h1> {props.name.toUpperCase()}</h1>
          <h3>Health Score: {props.health_score}</h3>
          <img src={props.img} alt={props.name} />
         
          <div className={style.other}>
              <div className={style.dish_types}>
              <h4>Type</h4>
              {props.dish_types.map(el=>{
                return <span>{el}</span>
              })}
              </div>
              <div className={style.diets}>
                <h4>Diet</h4>
              {props.diets.map(el=>{
                return <span>{el}</span>
              })}
              </div>
          </div>
          <div className={style.summary}>Description: {props.summary}</div>
          <div className={style.steps}>
            {props.steps}
            {/* {props.steps.map(el=>{
              return(
                <li>{el.step}</li>
              )
            })} */}
          </div>
      </div>

    </div>
  );
};

export default DetailCard;
