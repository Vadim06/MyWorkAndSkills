import React, { useState, useEffect } from 'react';
import './CategoryChild.css';
interface Category {
    name: string;
    height: string;
    mass: string;
    diameter: string;
    population: string;
    director: string;
    release_date: string;
    title: string;
    classification: string;
    skin_colors: string;
    manufacturer: string;
    max_atmosphering_speed: string;
    consumables: string;
    starship_class: string;
    crew: string;
    vehicle_class: string;
}

export const CategoryChild: React.FC<{ category: Category }> = ({ category }) => {
    const [text, setText] = useState<string>("");
    useEffect(() => {
        if (category.height && category.mass) {
            setText(`Height: ${category.height}cm, mass: ${category.mass}kg`);
        } else if (category.diameter && category.population) {
            let num = Number(category.population);
            if (category.population === "unknown") {
                setText(`Diameter: ${category.diameter}km, population is unknown`);
            } else {
                if (num < 1000) {
                    setText(` - Diameter: ${category.diameter}km, population: ${category.population}`);
                } else {
                    const units = ["", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion"];
                    let unitIndex = 0;
                    while (num >= 1000) {
                        num /= 1000;
                        unitIndex++;
                    }
                    setText(` - Diameter: ${category.diameter}km, population: ${num + " " + units[unitIndex]}`);
                }
            }
        } else if (category.director && category.release_date && category.title) {
            setText(`${category.title} - Movie director: ${category.director}, release date: ${category.release_date}`);
        } else if (category.classification && category.skin_colors) {
            setText(` - Classification: ${category.classification}, skin colors: ${category.skin_colors}`);
        } else if (category.manufacturer && category.max_atmosphering_speed && category.vehicle_class) {
            setText(` - Manufacturer: ${category.manufacturer}, maximal atmosphering speed: ${category.max_atmosphering_speed} atmospheres`);
        } else if (category.starship_class && category.consumables) {
            setText(` - Manufacturer: ${category.manufacturer}, can provide ${category.crew} passengers with food for ${category.consumables}`);
        }
    }, [category]);

    return (
        <div>
            <strong>{category.name}</strong>{text}
        </div>
    )
}

