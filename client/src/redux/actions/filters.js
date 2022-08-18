export const diets = (diet, array) => {
  return array.filter((p) => {
    return p.diets.includes(diet);
  });
};

export const ordered = (order, array) => {
  let names = array.map((o) => o.title);
  let health = array.map((o) => o.healthScore);
  let orde = [];

  switch (order) {
    case "a-z":
      names = names.sort();
      names.forEach((p) => {
        array.forEach((po) => {
          if (p === po.title) orde.push(po);
        });
      });
      return orde;
    case "z-a":
      names = names.sort().reverse();
      names.forEach((p) => {
        array.forEach((po) => {
          if (p === po.title) orde.push(po);
        });
      });
      return orde;
    case "health+":
      health = health.sort((a, b) => b - a);
      health.forEach((f) => {
        array.forEach((p) => {
          if (p.healthScore === f) orde.push(p);
        });
      });
      orde = orde.filter((e, i) => orde.indexOf(e) === i);
      return orde;
    case "health-":
      health = health.sort((a, b) => a - b);
      health.forEach((f) => {
        array.forEach((p) => {
          if (p.healthScore === f) orde.push(p);
        });
      });
      orde = orde.filter((e, i) => orde.indexOf(e) === i);
      return orde;
    default:
      return array;
  }
};
