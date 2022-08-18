import React from "react";
// import SidePanel from "../../components/SidePanel/SidePanel";
import style from "./Home.module.css"
import { useEffect, useMemo} from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {getRecipes, getDiets } from "../../redux/actions";
import Recipes from "../../components/Recipes/Recipes";
import SidePanel from "../../components/SidePanel/SidePanel";


function useQuery() {

    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
  }
  
const Home = ()=>{
    
    let dispatch = useDispatch()
    let query = useQuery();
    let name = query.get("name")    

    

    useEffect(()=>{
        dispatch(getRecipes(name))
        dispatch(getDiets())
    },[dispatch,name])

    return (
        <div className={style.home}>
            <SidePanel/>
            <Recipes/>
        </div>
    )
}

export default Home