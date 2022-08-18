import { v4 as uuidv4 } from "uuid";
export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_RECIPES = "GET_RECIPES";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const GET_DETAIL = "GET_DETAIL";
export const DELETE_RECIPE = "DELETE_RECIPE";
export const GET_DIETS = "GET_DIETS";
export const FILTER = "FILTER";
export const BY_DIET = "BY_DIET";
export const ORDER = "ORDER";
export const SEARCH = "SEARCH";

export const getRecipes = (name) => async (dispatch) => {
  if (name) {
    try {
      let response2 = await fetch(`http://localhost:3001/recipes`);
      let results2 = await response2.json();
      dispatch({ type: GET_ALL_RECIPES, payload: results2 });
      let recipe = results2.filter((el) => el.title.includes(name));
      dispatch({ type: GET_RECIPES, payload: recipe });
    } catch (err) {
      throw Error(err);
    }
  } else {
    try {
      let response2 = await fetch(`http://localhost:3001/recipes`);
      if (response2.status === 404) return alert("No recipes found :/");
      let results2 = await response2.json();
      dispatch({ type: GET_ALL_RECIPES, payload: results2 });
      dispatch({ type: GET_RECIPES, payload: results2 });
    } catch (err) {
      throw Error(err);
    }
  }
};

export const getRecipesDetail = (id) => {
  return { type: GET_DETAIL, payload: id };
};

export const getDiets = () => async (dispatch) => {
  let url = `http://localhost:3001/diets `;

  try {
    let x = await fetch(url);
    let response = await x.json();

    dispatch({ type: GET_DIETS, payload: response });
  } catch (err) {
    throw Error(err);
  }
};

export const isSearching = (search) => {
  return {
    type: SEARCH,
    payload: search,
  };
};

export const order = (ord) => {
  return {
    type: ORDER,
    payload: ord,
  };
};

export const filterByDiet = (diet) => {
  return {
    type: BY_DIET,
    payload: diet,
  };
};

let id = uuidv4();

export const createRecipes = (data) => async (dispatch) => {
  let recipe = { ...data, id: id };
  console.log("actions", data);
  try {
    const crear = await fetch("http://localhost:3001/recipes", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });
    const response = await crear;
    console.log(response);
    if (response.status === 200) alert("Receta creada con exito!");
    else
      alert(
        "Hubo un error en la creacion de la receta, por favor refresque la pagina e intente de nuevo"
      );
    // dispatch({
    //   type: CREATE_RECIPE,
    //   payload: { ...response, id: id },
    // });
  } catch (err) {
    throw Error(err);
  }
};

export const deleteRecipes = (id) => {
  return { type: DELETE_RECIPE, payload: id };
};
