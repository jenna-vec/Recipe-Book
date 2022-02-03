import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';


export default function Homepage() {
  
    return(
      <div className='home-flex'>
        <div>
          <div className='title-flex'>
              <h1>recipe book</h1>
              <p>Your online recipe book, without the clutter</p>
              <br />
              <Link to="/register"><Button variant="contained">CREATE YOUR BOOK</Button></Link>
          </div>
        </div>
        <div className='card recipe-card'>
          <div className='vertical-flex'>
            <br />
            <h3>Chocolate Chip Cookies</h3>
            <div>
              <h4 className='home-title-margin'>Notes</h4>
              <span>One hour cooking time. Yields 24 cookies.</span>
            </div>
            <div>
              <h4 className='home-title-margin'>Ingredients</h4>
              <p>1 cup butter, softened</p>
              <p>1 cup white sugar</p>
              <p>1 cup packed brown sugar</p>
              <p>2 eggs</p>
              <p>...</p>
            </div>
          </div>
        </div>
      </div>
    )
}