import React,{ useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes} from "../../redux/actions";
import style from "./Type.module.css"


const PokemonTypes =  () => {
   const dispatch = useDispatch()
   const types = useSelector(state => state.types)
  
   
   useEffect(()=>{
    dispatch( getTypes())
},[dispatch])

    var i=0;
  while(types[0] === undefined){
      return(
        <img src="https://i.gifer.com/4OKl.gif" className="loadingAnimation"/>
    )
  }
   return (
       <div className={style.types}>
        {types.map(el =>{
            i++
            return(
                <span className={style.type_container} id={i} >{el.toUpperCase()}</span>
            )
        })}
         
       </div>
   )
};
export default PokemonTypes;