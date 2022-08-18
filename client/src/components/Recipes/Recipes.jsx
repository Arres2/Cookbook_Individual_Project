import React, { useState, } from "react";
import RecipeCard from "../RecipeCard/RecipeCard";
import { useSelector } from "react-redux";
import { ordered, diets } from "../../redux/actions/filters";
import style from "./Recipes.module.css"
import pag_style from "./Pagination.module.css"




const Recipes = () => {
  
  let order = useSelector(state=>state.order)
  let diet = useSelector(state=>state.diet)
  let recipes = useSelector(state=>state.recipes)
  let searching = useSelector(state=>state.searching)
  let all_recipes = useSelector(state=>state.all_recipes)
  
  let [page, setPage] = useState(0)
  
  if(searching){
    
    recipes = recipes.filter((el)=>{
      return el.title.includes(searching)
    })
  }

  if (diet){ 
    recipes = diets(diet, recipes)}
    
    if (order){ 
      recipes = ordered(order, recipes);}
      
      
      const pagination = () => {
        if (recipes.length) return recipes.slice(page, page + 9);
        return [];
      };
      
      const array = pagination();
      
      const nextPage = () => {
        if (recipes.length > page + 9) {
          setPage(page + 9);
        }
      };
      
      const previusPage = () => {
        if (page > 0) {
          setPage(page - 9);
        }
      };
      
      if(!all_recipes[0]){
        // if(diet||searching){
          return <img src="https://media2.giphy.com/media/hUL5R6B4HYoXADpnvJ/giphy.gif?cid=ecf05e47wb108ejlf8n3041l4bs9krtxms3wt1b47d8ruijk&rid=giphy.gif&ct=g" className="loadingAnimation" />
        }
        else if(all_recipes[0] && recipes[0] ===undefined) {
          return <h2>No recipes found on this lot...</h2>}
        
        
        
        return (
          <div>
        <div className={style.cards_container}>
            {array.length && array.map(({title, diets, id, image,dishTypes})=>{ 
              return(
                
                <div className={style.card} key={id}>
                    <RecipeCard
                    id ={id}
                    name= {title}
                    diets = {diets}
                    img= {image}
                    dishTypes={dishTypes}
                    />
                    
            </div>
                    
             )})}
        </div>
            <div className={pag_style.pagination}>
              <button onClick={previusPage} className={pag_style.pagination_button}>
                &laquo; Previus
                </button>
                <button onClick={nextPage} className={pag_style.pagination_button}>
                Next &raquo;
              </button> 
            </div>
        </div>
  

    )
  }

  export default Recipes;

