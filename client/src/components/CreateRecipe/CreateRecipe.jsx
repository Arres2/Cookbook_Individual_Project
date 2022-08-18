import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRecipes, getDiets } from "../../redux/actions/index.js";
import style from "./CreateRecipe.module.css";
import { Link } from "react-router-dom";

const CreateRecipe = () => {
  const dispatch = useDispatch();
  const options = useSelector((store) => store.diets);
  const [dragActive, setDragActive] = useState(false);
  const [data, setData] = useState({
    name: "",
    health_score: 0,
    short_d: "",
    long_d: "",
    img:"",
    dish_types:[],
    diets: [],
  });
  const inputRef = useRef(null);

  const [errors, setErrors] = useState({});

  useEffect(()=>{
    if(options[0]===undefined){
      dispatch(getDiets())}
},[dispatch,options])

  const validate = (data) => {
    let errors = {};
    if (!data.name) {
      errors.name = "El name es obligatorio";
    }
    if (!data.short_d) {
      errors.short_d = "El summary es obligatorio";
    }
    if (!data.long_d) {
      errors.long_d = "Las instrucciones son obligatorias";
    }
    if (!data.img) {
      errors.img = "La imagen es obligatoria";
    }
    if (!data.dish_types.length) {
      errors.dish_types = "El tipo de plato es obligatorio";
    }
    if (!data.diets.length) {
      errors.diets = "El tipo de dieta es obligatorio";
    }
    return errors;
  };

  let d_types=[
    "lunch",
    "main course",
    "main dish",
    "breakfast",
    "morning meal",
    "brunch",
    "dinner",
    "side dish",
    "dip",
    "sauce",
    "condiment",
    "spread",
    "soup"
  ]

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    setErrors(validate({
      ...data,
      [e.target.name]: e.target.value,
    }))
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  const handleDrop = function(e) {
  e.preventDefault();
  e.stopPropagation();
  setDragActive(false);
  const file = e.dataTransfer.files[0]
  const reader = new FileReader()

  reader.readAsDataURL(file)
  reader.onloadend = (e)=>{
    setData({
      ...data,
      img:e.target.result
    });
  }
  }



  const handleDrag = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      console.log(e.type)
      setDragActive(true);
    } 
    else if(e.type === "dragleave") {
      console.log(e.type)
      setDragActive(false);
    }
  };
  const checkbox = (e) => {
    if (data.diets.includes(e.target.value)) {
      data.diets = data.diets.filter((id) => id !== e.target.value);
      setData({
        ...data,
        diets: data.diets,
      });
    } else {
      setData({
        ...data,
        diets: [...data.diets, e.target.value],
      });
    }
  };

  const checkbox2 = (e) => {
    if (data.dish_types.includes(e.target.value)) {
      data.dish_types = data.dish_types.filter((id) => id !== e.target.value);
      setData({
        ...data,
        dish_types: data.dish_types,
      });
    } else {
      setData({
        ...data,
        dish_types: [...data.dish_types, e.target.value],
      });
    }
  };

  const submit = (e) => {
    e.preventDefault();

    dispatch(createRecipes(data))
    setData({
      name: "",
      health_score: 0,
      short_d: "",
      long_d: "",
      img:"",
      dish_types:[],
      diets: [],
    });
  };

  const dropZoneStyle = {
    ...(dragActive && {backgroundColor: "white"}),
    ...(data.img && {
      backgroundImage:`url(${data.img})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "contain"
    })
  }
  return (
    <div className={style.containerCreate}>
      <form action="POST" className={style.form} onSubmit={submit}>
        <div className={style.container}>
          <div className={style.separado}>
            <h1>Crea tu propia receta</h1>
            <p className={errors.name ? style.danger : style.question}>
              <label>Nombre de la receta</label>
              <input
                type="text"
                placeholder="Pollo a la ..."
                name="name"
                value={data.name}
                onChange={handleInputChange}
                
              />
            </p>
            {errors.name ? <p className={style.danger}>{errors.name}</p> : null}
            <p className={style.question}>
              <label>Health Score</label>
              <input
                type="number"
                name="health_score"
                value={data.health_score}
                onChange={handleInputChange}
                
              />
            </p>
            
            <p className={errors.short_d ? style.danger : style.question}>
              <label>Summary</label>
              <input
                type="text"
                name="short_d"
                placeholder="Es un pollo..."
                value={data.short_d}
                onChange={handleInputChange}
              />
            </p>
            {errors.short_d ? <p className={style.danger}>{errors.short_d}</p> : null}

            <p className={errors.long_d ? style.danger : style.question}>
              <label>Preparation</label>
              <input
                type="text"
                name="long_d"
                placeholder="Lo cocino..."
                value={data.long_d}
                onChange={handleInputChange}
                
              />
            </p>
            {errors.long_d ? <p className={style.danger}>{errors.long_d}</p> : null}

            <div className={style.form_file_upload}  onDragEnter={handleDrag}>
              <input ref={inputRef} type="file" id={style.input_file_upload} multiple={false} name="img" onChange={handleInputChange} accept="image/jpeg,image/jpg,image/png,image/gif"  />
              <label className={style.label_file_upload} htmlFor="input_file_upload" style={dropZoneStyle} >
                <div>
                  <p>Drag and drop your file here or</p>
                  <button  type="button" className={style.upload_button} onClick={onButtonClick}>Upload a file</button>
                </div> 
              </label>
              { dragActive && <div id={style.drag_file_element} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }

              {errors.img ? <p className={style.danger}>{errors.img}</p> : null}
            </div>

            <input type="submit" value="Crear" className={style.submit} disabled={!errors[0]?true:false} onClick={validate}/>
          </div>
          <div className={style.hiddenCB}>
            <h1>Diets</h1>
            <div className={style.tipos}>
              {options?.map((t) => (
                <div key={t.name}>
                  <input
                    type="checkbox"
                    name={t.name}
                    value={t.name}
                    id={t.name}
                    onChange={checkbox}
                    
                  />
                  <label htmlFor={t.name}>{t.name}</label>
                  {/* {t.slot % 4 === 0 ? <br /> : null} */}
                </div>
              ))}
            </div>
            {errors.diets ? <p className={style.danger}>{errors.diets}</p> : null}
          </div>
          <div className={style.hiddenCB}>
            <h1>Dish Types</h1>
            <div className={style.tipos}>
              {d_types.map((t) => (
                <div key={t}>
                  <input
                    type="checkbox"
                    name={t}
                    value={t}
                    id={t}
                    onChange={checkbox2}
                    
                  />
                  <label htmlFor={t}>{t}</label>
                  {/* {t.slot % 4 === 0 ? <br /> : null} */}
                </div>
              ))}
              {errors.dish_types ? <p className={style.danger}>{errors.dish_types}</p> : null}
            </div>
          </div>
        </div>
      </form>
      <div className={style.pagination}>
        <Link to="/recipes">
          <button className={style.pagination_button}>Back</button>
        </Link>
      </div>
    </div>
    
  );
  
};

export default CreateRecipe;