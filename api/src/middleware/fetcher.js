require("dotenv").config();
const fs = require("fs/promises");
const { reporters } = require("mocha");
const { API_KEY } = process.env;
const { Recipe, Diet } = require("../db");

const params = new URLSearchParams({
  apiKey: API_KEY,
  number: 100,
  addRecipeInformation: true,
});

let getApiData = async () => {
  try {
    let x = await fetch(
      "https://api.spoonacular.com/recipes/complexSearch?" + params
    ).then((p) => p.json());

    return await x;
  } catch (err) {
    throw Error(err);
  }
};

let getDbData = async () => {
  try {
    let response = await Recipe.findAll({
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    let formated = await response.map((el) => {
      return {
        id: el.dataValues.id,
        title: el.dataValues.name,
        healthScore: el.dataValues.health_score,
        summary: el.dataValues.description,
        steps: el.dataValues.instructions,
        image: el.dataValues.image.toString(),
        dishTypes: el.dataValues.dish_types,
        diets: el.dataValues.diets.map((el) => {
          return el.name;
        }),
      };
    });
    return await formated;
  } catch (err) {
    throw Error(err);
  }
};

const getSingleDish = async (id) => {
  try {
    let x = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?` + params
    );
    if (x.status === 404) {
      return false;
    } else return x.json();
  } catch (err) {
    throw Error(err);
  }
};

let getAllDishes = async () => {
  try {
    let api = await getApiData();
    let db = await getDbData();
    let results = api.results.concat(db);

    return results;
    // return db;
  } catch (err) {
    throw Error(err);
  }
};

let createRecipe = async (
  id,
  name,
  health_score,
  short_d,
  long_d,
  img,
  dish_types,
  diets
) => {
  try {
    let createdRecipe = await Recipe.create({
      id: id,
      name: name,
      health_score: health_score,
      description: short_d,
      instructions: long_d,
      dish_types: dish_types,
      image: img,
    });

    let dietsDb = await Diet.findAll({
      where: {
        name: diets,
      },
    });

    createdRecipe.addDiets(dietsDb);
    return { msg: "Character created succesfully" };
  } catch (err) {
    throw Error(err);
  }
};

let getDiets = async () => {
  try {
    let diets = [
      "vegan",
      "gluten free",
      "whole 30",
      "lacto ovo vegetarian",
      "paleolithic",
      "primal",
      "foodmap friendly",
      "pescatarian",
      "dairy free",
      "ketogenic",
    ];

    diets.forEach((el) => {
      Diet.findOrCreate({
        where: { name: el },
      });
    });
    let allDiets = await Diet.findAll();
    return allDiets;
  } catch (err) {
    console.log(err);
    throw Error(err);
  }
};

let deleteDbData = async (id) => {
  try {
    let response = await Recipe.destroy({
      where: { id: id },
    });
    return response;
  } catch (err) {
    console.log(err);
    throw Error(err);
  }
};

module.exports = {
  getAllDishes,
  getSingleDish,
  createRecipe,
  getDiets,
  deleteDbData,
};
