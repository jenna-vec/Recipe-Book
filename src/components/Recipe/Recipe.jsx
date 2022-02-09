import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import CancelIcon from '@mui/icons-material/Cancel';
import Stack from '@mui/material/Stack';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { useNavigate } from "react-router-dom";
import { doc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from '../../firebase';

const Recipe = ({ user }) => {

  const location = useLocation();
  const { recipe } = location.state;
  let recipeName = recipe.data.Name;
  const userID = user.uid;
  const navigate = useNavigate();

  const instructionsString = recipe.data.Instructions.join("\n");
  const categories = ["Breakfast", "Lunch", "Dinner", "Dessert", "Other"];

  const [info, setInfo] = useState(recipe.data.Info);
  const [category, setCategory] = useState(recipe.data.Category);
  const [needsCategory, setNeedsCategory] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState(recipe.data.Ingredients);
  const [instructions, setInstructions] = useState(instructionsString);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    document.title = `Recipe Book | ${recipe.data.Name}`;
  }, []);

  /* Update Ingredient List */
  const addIngredient = () => {
    setIngredients( ingredients => [...ingredients, ingredient]);
    setIngredient("")
  }

  /* Remove Ingredient */
  const remove = (e, ingredient) => {
    e.preventDefault();
    var index = ingredients.indexOf(ingredient);
    if (index > -1) {
      ingredients.splice(index, 1)
    }
    document.getElementById(ingredient).style.display = "none";
    setIngredient("");
  }

  /* Add Ingredient to the DOM */
  const AddedIngredient = ({ ingredient }) => {
    return (
      <div className='horizontal-flex' id={ingredient}>
        <p className='p-margin'>{ingredient}</p>
        <RemoveCircleOutlineIcon onClick={(e) => remove(e, ingredient)} sx={{ alignSelf: "center", marginLeft: "7px"}} />
      </div>
    )
  }

  /* Open Confirm Delete Button */
  const confirmDelete = () => {
    document.getElementById("delete-button").style.display = "none";
    document.getElementById("confirm-delete").style.display = "block";
  }

  /* Close Confirm Delete Button */
  const nevermind = () => {
    document.getElementById("delete-button").style.display = "block";
    document.getElementById("confirm-delete").style.display = "none";
  }

  /* Delete Recipe */
  const deleteRecipe = () => { 
    const loading = document.getElementById("deleting");
    const nevermind = document.getElementById("cancel-delete");
    loading.style.display = "flex";
    nevermind.style.display = "none"
    deleteDoc(doc(db, userID, recipe.data.Name));
    setTimeout(() => {  loading.style.display = "none" }, 4000); 
    setTimeout(() => {  navigate("/") }, 5000);
  }

  const edit = (e) => {
    e.preventDefault();
    if (category === "") {
      setNeedsCategory("Must provide a category")
    }
    else {
      let instructionArray  = instructions.split("\n");
      setDoc(doc(db, userID, recipeName), {
        Name: recipeName,
        Category: category,
        Info: info,
        Ingredients: ingredients,
        Instructions: instructionArray
      });
      const loading = document.getElementById("loading-div");
      loading.style.display = "flex";
      setTimeout(() => {  loading.style.display = "none" }, 5000); 
      setTimeout(() => {  navigate("/") }, 5000);
    } 
  }

  /* Modal Style */
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '78vh',
    width: '78vw',
    bgcolor: '#F5F4F4;',
    p: 4,
    textAlign: "center",
    overflow: "scroll"
  };

  return (
    <>
      <div className='recipe-width'>
        <h2 className='petit-cap center'>{recipe.data.Name}</h2>
        <p className='center info'>{recipe.data.Info}</p>
        <Divider />
        <div className='recipe-card-div'>
          <div className='ingredients'>
            <h4 className='petit-cap'>Ingredients</h4>
            {recipe.data.Ingredients.map((ingredient) => (
              (<p>{ingredient}</p>)
            ))}
          </div>
            <div className='instructions'>
              <h4 className='petit-cap'>Instructions</h4>
              {recipe.data.Instructions.map((instruct) => (
                (<p>{instruct}</p>)
              ))}
            </div>
          </div>
        </div>
        <div className='fab'>
          <Fab onClick={(e) => {e.preventDefault(); handleOpen()}} color="primary" aria-label="edit">
            <EditIcon sx={{ cursor: "pointer" }} />
          </Fab>
          <br />
        </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
      <Box sx={style}>
      <form onSubmit={(e) => edit(e)}>
        <h2 className='petit-cap center'>Edit Recipe</h2>
        <div className='add-flex'>
          <TextField
              disabled
              value={recipe.data.Name}
          />
          <TextField
            required
            id="cat"
            select
            label="Category"
            value={category}
            helperText={needsCategory}
            onChange={(e) => {e.preventDefault(); setCategory(e.target.value)}}>
            {categories.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="info"
            label="Info"
            multiline
            rows={4}
            value={info}
            onChange={(e) => {e.preventDefault(); setInfo(e.target.value)}}
          />
          <div className='horizontal-flex gap'>
            <TextField
              label="Ingredients"
              id="ingredient"
              size="small"
              value={ingredient}
              onChange={(e) => {e.preventDefault(); setIngredient(e.target.value)}}
            />
            <AddIcon onClick={addIngredient} sx={{ alignSelf: "center" }} />
          </div>
          <div className="ingredients-list">
            {ingredients.map((ingredient) => (
              <AddedIngredient key={ingredient} ingredient={ingredient} />))}
          </div>
          <TextField
            id="instructions"
            label="Instructions"
            multiline
            rows={12}
            value={instructions}
            onChange={(e) => {e.preventDefault(); setInstructions(e.target.value)}}
          />
          <Button id="delete-button" onClick={confirmDelete} sx={{ width: "fit-content" }} size="small" variant="outlined" color="error">
            Delete Recipe
          </Button>
          <div className='vertical-flex' id='confirm-delete'>
            <div className='horizontal-flex gap'>
              <Button onClick={deleteRecipe} sx={{ width: "fit-content" }} size="small" variant="contained" color="error">
                  Confirm Deletion
              </Button>
              <CancelIcon id="cancel-delete" size="small" sx={{ cursor: "pointer", alignSelf: "center" }} onClick={nevermind} />
              <ChangeCircleIcon id="deleting" sx={{ display: "none", alignSelf: "center"  }} className='loading' size="large" color="primary" />
            </div>
          </div>
          <div id="loading-div" className='horizontal-flex gap loading-div'>
            <ChangeCircleIcon className='loading' size="large" color="primary" />
            <p className='petit-cap' >updating...</p>
          </div>
          <Stack spacing={2} direction="row" justifyContent="center" alignItems="center">
            <Button onClick={handleClose} variant="contained" sx={{ bgcolor: "#bc4545" }}>CANCEL</Button>
            <Button type="submit" variant="contained">UPDATE RECIPE</Button>
          </Stack>
          <br />
        </div>
        </form>
      </Box>
    </Modal>
  </>
  )
};

export default Recipe;
