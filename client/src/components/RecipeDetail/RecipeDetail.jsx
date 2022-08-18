import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link  } from "react-router-dom";
import { getRecipesDetail, getRecipes} from "../../redux/actions";
import DetailCard from "../DetailCard/DetailCard";
import style from "../DetailCard/DetailCard.module.css"


const RecipeDetail =  () => {
   const {recipeId} =  useParams()
   const dispatch = useDispatch()
   const detail = useSelector(state => state.detail)
   const all_recipes = useSelector(state=>state.all_recipes)
  
   
   useEffect(()=>{

     if(!all_recipes.length) {
      dispatch(getRecipes())
    }else {
      dispatch(getRecipesDetail(recipeId))
    }

},[dispatch,recipeId,all_recipes])

  console.log(detail , "wtf" )

  
  if(detail.title === undefined){
    return(
      <div className="loadingAnimation">
        <img src="https://media2.giphy.com/media/hUL5R6B4HYoXADpnvJ/giphy.gif?cid=ecf05e47wb108ejlf8n3041l4bs9krtxms3wt1b47d8ruijk&rid=giphy.gif&ct=g"/>
      </div>
    )
  }

   return (
       <div>
          <DetailCard
            key={detail.id}
            id={detail.id}
            name={detail.title}
            dish_types={detail.dishTypes}
            diets={detail.diets}
            health_score = {detail.healthScore}
            summary = {detail.summary}
            steps={detail?.analyzedInstructions?.length? detail.analyzedInstructions[0].steps.map(el=>el.step): detail?.steps?.length? detail.steps:[]}
            img={detail.image}
          />
          <div className={style.pagination}>
            <Link to="/recipes">
              <button className={style.pagination_button}>Back</button>
            </Link>
          </div>
         
       </div>
   )
};
export default RecipeDetail;
