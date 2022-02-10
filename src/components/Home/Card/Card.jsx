import React from 'react';
import { Link } from 'react-router-dom';
import Divider from '@mui/material/Divider';

const Book = ({ title, category }) => {

  return (
    <div className='card fit-content'>
      <h3 className='petit-cap'>{title}</h3>
      <Divider />
      <div className='card-flex'>
        {category.map((recipe) => (
          (<Link state={{recipe: recipe}} key={recipe.data.Name} to={`/${recipe.data.Name}`}>{recipe.data.Name}</Link>)
        ))}
      </div>
    </div>
    )
};

export default Book;
//recipe.data.Name