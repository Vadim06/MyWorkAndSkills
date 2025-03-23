import React, { useState, useEffect } from 'react';
import axios from "axios";
import './Swapi.css';

interface Character {
    name: string;
    height: string;
    mass: string;
}
let showCharactersVar = false;
let currentPage = 1;

export const Swapi = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [showCharacters, setShowCharacters] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [pages, setPages] = useState<number>(0);
    const [category, setCategory] = useState<string>("people");

    const toggleShowCharacter = () => {
        showCharactersVar = !showCharactersVar;
        if (showCharactersVar) {
            setShowCharacters(true)
            axios.get(`https://swapi.dev/api/${category}`)
                .then(response => {
                    setCharacters(response.data.results);
                    console.log(response.data.results);
                    setIsLoading(false);
                    paginate(response.data.count);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                    setIsLoading(false);
                });
        } else {
            deleteList();
        }
    }

    const deleteList = () => {
        setIsLoading(true);
        setCharacters([]);
        setShowCharacters(false);
        setPages(0);
        currentPage = 1;
    }

    const paginate = (count: number) => {
        if (count > 10) {
            setPages((Math.ceil(count / 10)));
        } else {
            setPages(0);
        }
    }

    const nextPage = () => {
        currentPage++
        setIsLoading(true);
        axios.get(`https://swapi.dev/api/${category}/?page=${currentPage}`)
            .then(response => {
                setCharacters(response.data.results);
                console.log(response.data.results);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            });
    }

    const prevPage = () => {
        currentPage--
        setIsLoading(true);
        axios.get(`https://swapi.dev/api/${category}/?page=${currentPage}`)
            .then(response => {
                setCharacters(response.data.results);
                console.log(response.data.results);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            });
    }

    return (
        <section className="SWSection">
            <div className='SWContainer'>
                <h3>What would you like to see?</h3>
                <select name="category" value={category} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => { setCategory(event.target.value); deleteList() }} id="SWSelect">
                    <option value="people">people</option>
                    <option value="planets">planets</option>
                </select>
                <button onClick={toggleShowCharacter} className='showCharactersBtn'>{isLoading ? "show all characters" : "hide all characters"}</button>
                {isLoading && showCharacters ? (
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
                {pages > 0 && (
                    <div>
                        <p>There are {pages} pages</p>
                        {currentPage > 1 && <button onClick={prevPage}>previous</button>}
                        {currentPage < pages && <button onClick={nextPage}>next</button>}
                    </div>
                )}
            </div>
        </section>
    )
}

