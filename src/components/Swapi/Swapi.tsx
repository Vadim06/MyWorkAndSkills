import React, { useState, useEffect } from 'react';
import axios from "axios";
import './Swapi.css';

interface Character {
    name: string;
    height: string;
    mass: string;
}

export const Swapi = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        axios.get("https://swapi.dev/api/people/")
            .then(response => {
                setCharacters(response.data.results);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);

    return (<div className="">
        <h1>Star Wars Characters</h1>
        {loading ? (
            <p>Loading...</p>
        ) : (
            <ul>
                {characters.map((character, index) => (
                    <li key={index}>
                        <strong>{character.name}</strong> - Height: {character.height}cm, Mass: {character.mass}kg
                    </li>
                ))}
            </ul>
        )}
    </div>
    )
}

