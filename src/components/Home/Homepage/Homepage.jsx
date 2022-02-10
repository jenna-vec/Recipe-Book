import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';


export default function Homepage() {
  
  return (
    <div className='vertical-flex'>
      <div className='home'>
        <div className='home-title-flex'>
            <h1 className='petit-cap'>Recipe Book</h1>
            <p>Your online recipe book, without the clutter</p>
            <br />
            <Link to="/register"><Button className="home-button" variant="outlined">CREATE YOUR BOOK</Button></Link>
        </div>
      </div>
      <div className='center petit-cap credit white'>Photo by Joanie Simon</div>
      <div className='home-recipe'>
        <div className='card align-center'>
            <h2 className='petit-cap center'>Chocolate Chip Cookies</h2>
            <p className='center info'>One hour cooking time. Yields 24 cookies.</p>
            <Divider />
            <div className='recipe-card-div'>
              <div className='ingredients'>
                <h4 className='petit-cap'>Ingredients</h4>
                <p>1 cup butter, softened</p>
                <p>1 cup white sugar</p>
                <p>1 cup packed brown sugar</p>
                <p>2 eggs</p>
                <p>2 tsp vanilla extract</p>
                <p>1 tsp baking soda</p>
                <p>2 tsp hot water</p>
                <p>1/2 tsp salt</p>
                <p>3 cups flour</p>
                <p>2 cups chocolate chips</p>
                <p>1 cup walnuts</p>
              </div>
              <div className='instructions'>
                <h4 className='petit-cap'>Instructions</h4>
                <p>1. Preheat oven to 350 degrees F (175 degrees C).</p>
                <p>2. Cream together the butter, white sugar, and brown sugar 
                  until smooth. Beat in the eggs one at a time, then stir in 
                  the vanilla. Dissolve baking soda in hot water. Add to batter 
                  along with salt. Stir in flour, chocolate chips, and nuts. 
                  Drop by large spoonfuls onto ungreased pans.</p>
                <p>3. Bake for about 10 minutes in the preheated oven, or until edges are nicely browned.</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}