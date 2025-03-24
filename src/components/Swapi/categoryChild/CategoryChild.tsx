import React, { useState, useEffect } from 'react';
import './CategoryChild.css';
interface Category {
    name: string;
    height: string;
    mass: string;
}

export const CategoryChild: React.FC<{ category: Category }> = ({ category }) => {
    console.log(category);
    return (
        <div>
            <strong>{category.name}</strong> - Height: {category.height}cm, Mass: {category.mass}kg
        </div>
    )
}

