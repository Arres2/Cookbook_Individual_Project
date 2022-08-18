import React from "react";
import style from "./RecipeCard.module.css"
import icon from "../../assets/bullet.jpeg"
import { Link } from "react-router-dom";




const RecipeCard = (props) => {

  return (
    <div className={style.ft_recipe}> 
      <div className={style.ft_recipe__thumb}>
        <img src={props.img} alt={props.name}/>
      </div>
      <div className={style.ft_recipe__content}>
        <header className={style.content__header}>
        <div className={style.row_wrapper}>
          <h2 className={style.recipe_title}>{props.name}</h2>
        </div>
      <div className={style.bullets}>
        <ul>
        <h5>Available in diets:</h5>
        {props.diets.map(el=>{
          return(
          <div className={style.dietTypes}>
            <img className={style.iconBullet} src={icon}/>
            <p className={style.description}>
            {el}
            </p>
          </div>
          )
          })}
        </ul>
        <ul>
          <h5>Dish types:</h5>
          {props.dishTypes.map(el=>{
            return(
            <div className={style.dietTypes}>
              <img className={style.iconBullet} src={icon}/>
              <p className={style.description}>
              {el}
              </p>
            </div>
            )
            })}
        </ul>
      </div>
  
        </header>
      <div className={style.content__footer}>

      <Link to= {`/recipes/${props.id}`} >Description</Link>
      </div>
      </div>
    </div>
  );
};

export default RecipeCard;
