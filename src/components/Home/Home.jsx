import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../../firebase';
import Homepage from './Homepage/Homepage'
import Card from './Card/Card'


export default function Home({ user }) {

  let Dashboard = () => {

    const userID = user.uid;

    const categories = ["Breakfast", "Lunch", "Dinner", "Dessert", "Other"];
    
    const [recipeName, setName] = useState("");
    const [info, setInfo] = useState("");
    const [category, setCategory] = useState("");
    const [ingredient, setIngredient] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState("");
    const [needsName, setNeedsName] = useState("");
    const [needsCategory, setNeedsCategory] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [customersData, setCustomersData] = useState([]);

    useEffect(() => {
      db.collection(userID).onSnapshot((snapshot) => {
        setCustomersData(
          snapshot.docs.map((doc) => ({
            category: doc.data().Category,
            data: doc.data()
          }))
        );
      });
    }, []);

    const breakfast = customersData.filter(getBreakfast);
    const lunch = customersData.filter(getLunch);
    const dinner = customersData.filter(getDinner);
    const desserts = customersData.filter(getDessert);
    const other = customersData.filter(getOther);

    function getBreakfast(recipe) {
      return recipe.category === "Breakfast";
    }
    function getLunch(recipe) {
      return recipe.category === "Lunch"
    }
    function getDinner(recipe) {
      return recipe.category === "Dinner"
    }
    function getDessert(recipe) {
      return recipe.category === "Dessert";
    }
    function getOther(recipe) {
      return recipe.category === "Other";
    }

    const addIngredient = () => {
      setIngredients( ingredients => [...ingredients, ingredient]);
      setIngredient("")
    }

    const remove = (e, ingredient) => {
      e.preventDefault();
      var index = ingredients.indexOf(ingredient);
      if (index > -1) {
        ingredients.splice(index, 1)
      }
      document.getElementById(ingredient).style.display = "none";
      setIngredient("");
    }

    const AddedIngredient = ({ ingredient }) => {
      return (
        <div className='horizontal-flex' id={ingredient}>
          <p>{ingredient}</p>
          <RemoveCircleOutlineIcon onClick={(e) => remove(e, ingredient)} sx={{ alignSelf: "center", marginLeft: "7px"}} />
        </div>
      )
    }
  
    const addRecipe = (e) => {
      e.preventDefault();
      if (recipeName === "") {
        setNeedsName("Name required")
      }
      else if (category === "") {
        setNeedsCategory("Must provide a category")
      }
      else {
        let instructionArray  = instructions.split(".\n");
        setDoc(doc(db, userID, recipeName), {
          Name: recipeName,
          Category: category,
          Info: info,
          Ingredients: ingredients,
          Instructions: instructionArray
        });

        const loading = document.getElementById("loading-div");
        loading.style.display = "flex";
        setTimeout(() => {  loading.style.display = "none" }, 4000); 
        setTimeout(() => {  handleClose() }, 4000); 
        setName("");
        setInfo("");
        setIngredient("");
        setIngredients([]);
        setInstructions("");
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
      <div className='dash'>
        <div className='dash-card'>
        {customersData.length === 0 ? <h2 className='center'>Click the plus sign to add your first recipe!</h2> : ''}
        {breakfast.length === 0 ? '' : <Card title={"Breakfast"} category={breakfast} />}
        {lunch.length === 0 ? '' : <Card title={"Lunch"} category={lunch} />}
        {dinner.length === 0 ? '' : <Card title={"Dinner"} category={dinner} />}
        {desserts.length === 0 ? '' : <Card title={"Dessert"} category={desserts} />}
        {other.length === 0 ? '' : <Card title={"Misc."} category={other} />}
        </div>
        <div className='float-right'>
          <Fab onClick={(e) => {e.preventDefault(); handleOpen()}} color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={style}>
          <form onSubmit={(e) => addRecipe(e)}>
            <h3 className='petit-cap'>Add Recipe</h3>
            <div className='add-flex'>
              <TextField
                  required
                  id="recipe-name"
                  label="Recipe Name"
                  value={recipeName}
                  helperText={needsName}
                  onChange={(e) => {e.preventDefault(); setName(e.target.value)}}
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
                rows={5}
                value={instructions}
                onChange={(e) => {e.preventDefault(); setInstructions(e.target.value)}}
              />
              <div className='column'></div>
            </div>
            <div id="loading-div" className='horizontal-flex gap loading-div'>
              <ChangeCircleIcon className='loading' size="large" color="primary" />
              <p className='petit-cap' >updating...</p>
            </div>
            <Stack spacing={2} direction="row" justifyContent="center" alignItems="center">
              <Button onClick={handleClose} variant="contained" sx={{ bgcolor: "#bc4545" }}>CANCEL</Button>
              <Button type="submit" variant="contained">ADD TO BOOK</Button>
            </Stack>
            </form>
          </Box>
        </Modal>
      </div>
    )
  }

  
  /* Shows Homepage if there is no user */
  return (
    <div className='child'>
      {user.length === 0 ? <Homepage /> : <Dashboard />}
    </div>
  );
}