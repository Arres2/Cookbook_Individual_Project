const { Router } = require("express");
const {
  getAllDishes,
  getSingleDish,
  createRecipe,
  getDiets,
  deleteDbData,
} = require("../middleware/fetcher");

const router = Router();

router.get("/recipes", async (req, res) => {
  try {
    let foodData = await getAllDishes();
    res.status(200).send(foodData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/recipes/:id", async (req, res) => {
  let { id } = req.params;
  let dishDetail = await getSingleDish(id);

  try {
    res.status(200).json(dishDetail);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/diets", async (req, res) => {
  try {
    let dietData = await getDiets();
    res.status(200).send(dietData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/recipes", async (req, res) => {
  try {
    let { id, name, health_score, short_d, long_d, img, dish_types, diets } =
      req.body;

    let data = await createRecipe(
      id,
      name,
      health_score,
      short_d,
      long_d,
      img,
      dish_types,
      diets
    );
    console.log(data);
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.delete("/recipes/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let data = await deleteDbData(id);
    console.log(data);
    res.send({ msg: "Borrado con exito" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
