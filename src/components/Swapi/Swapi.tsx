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
    const [search, setSearch] = useState<string>("");
    const [btnWidth, setBtnWidth] = useState<string>("7rem");

    const toggleShowCharacter = () => {
        setSearch("");
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
        console.log(count);
        if (count > 10) {
            setPages((Math.ceil(count / 10)));
        } else {
            setPages(0);
        }
    }

    const nextPage = () => {
        setIsLoading(true);
        axios.get(`https://swapi.dev/api/${category}/?page=${currentPage + 1}`)
            .then(response => {
                setCharacters(response.data.results);
                console.log(response.data.results);
                setIsLoading(false);
                currentPage++
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            });
    }

    const prevPage = () => {
        setIsLoading(true);
        axios.get(`https://swapi.dev/api/${category}/?page=${currentPage - 1}`)
            .then(response => {
                setCharacters(response.data.results);
                console.log(response.data.results);
                setIsLoading(false);
                currentPage--
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            });
    }

    const searchChangeHandler = (value: string) => {
        setSearch(value);
        setIsLoading(true);
        axios.get(`https://swapi.dev/api/people/?search=${value}`)
            .then(response => {
                setCharacters(response.data.results);
                console.log(response.data.results);
                setIsLoading(false);
                if (value.length > 0) {
                    setBtnWidth("0rem");
                    setPages(0);
                } else {
                    setBtnWidth("7rem");
                    showCharactersVar = false;
                    currentPage = 1;
                    toggleShowCharacter();
                }
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
                <input type="text" placeholder='search...' value={search} onChange={(event: React.ChangeEvent<HTMLInputElement>) => searchChangeHandler(event.target.value)} />
                <button onClick={toggleShowCharacter} style={{width: btnWidth}} className='showCatergoryBtn'>{isLoading ? `show all ${category}` : `hide all ${category}`}</button>
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
                        <p>page {currentPage} of {pages}</p>
                        {currentPage > 1 && <button onClick={prevPage}>previous</button>}
                        {currentPage < pages && <button onClick={nextPage}>next</button>}
                    </div>
                )}
            </div>
        </section>
    )
}

