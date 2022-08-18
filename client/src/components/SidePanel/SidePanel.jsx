import React from "react"
import style from "./SidePanel.module.css"
import { useDispatch } from "react-redux"
import {filterByDiet,order, isSearching } from "../../redux/actions"



const SidePanel = ()=>{
    const dispatch = useDispatch()
    


    const handleType = (e)=>{
        dispatch(filterByDiet(e.target.value))
        
    }
    const orderBy = (e) => {
        dispatch(order(e.target.value));
      }

    const handleTyping =(e)=>{
        e.preventDefault();
        dispatch(isSearching(e.target.value))
        

    }
    

    return (
    <aside>
        <form action="recipes">
            <label>Search by name</label>
            <input type="text" name="name" className={style.searchBar} placeholder="Pollito..." onChange={handleTyping}></input>
        </form>
        <select name="Ordenar" className={style.orderInput} onChange={orderBy}>
          <option value="">Ordenar por:</option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
          <option value="health+">Health+</option>
          <option value="health-">Health-</option>
        </select>
        <select name="type" className={style.dietInput} onChange={handleType}>
            <option value="">Typo de dieta:</option>
            <option value="vegan">Vegan</option>
            <option value="gluten free">Gluten Free</option>
            <option value="whole 30">Whole 30</option>
            <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
            <option value="paleolithic">Paleolithic</option>
            <option value="primal">Primal</option>
            <option value="foodmap friendly">Foodmap Friendly</option>
            <option value="pescatarian">Pescatarian</option>
            <option value="dairy free">Dairy Free</option>
            <option value="ketogenic">Ketogenic</option>
        </select>
    </aside>
)}

export default SidePanel