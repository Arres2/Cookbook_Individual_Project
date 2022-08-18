import {
  // Importa las actions types que necesites acá:
  GET_ALL_RECIPES,
  GET_RECIPES,
  GET_DETAIL,
  DELETE_RECIPE,
  // CREATE_RECIPE,
  GET_DIETS,
  FILTER,
  BY_DIET,
  ORDER,
  SEARCH,
} from "../actions/index";

const initialState = {
  // Tus estados acá
  all_recipes: [],
  recipes: [],
  detail: {},
  diets: [],
  diet: "",
  order: "",
  searching: "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // Acá va tu código
    case GET_ALL_RECIPES:
      return {
        ...state,
        all_recipes: action.payload,
      };
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
      };
    case GET_DETAIL:
      return {
        ...state,
        detail: state.recipes.filter((el) => {
          if (action.payload.length < 7) {
            action.payload = Number(action.payload);
          }
          return el.id === action.payload;
        })[0],
      };
    case DELETE_RECIPE:
      return {
        ...state,
        recipes: state.all_recipes.filter((H) => H.id !== action.payload),
      };
    // case CREATE_RECIPES:
    //   return {
    //     ...state,
    //     team: [...state.team, action.payload]
    //   };
    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };
    case FILTER:
      return {
        ...state,
        recipes: action.payload,
      };
    case BY_DIET:
      state.recipes = state.all_recipes;
      return {
        ...state,
        diet: action.payload,
      };
    case ORDER:
      state.recipes = state.all_recipes;
      return {
        ...state,
        order: action.payload,
      };
    case SEARCH:
      state.recipes = state.all_recipes;
      return {
        ...state,
        searching: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
