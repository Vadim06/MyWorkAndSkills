import React, { useState, useEffect } from 'react';
import { CategoryChild } from './categoryChild/CategoryChild';
import axios from "axios";
import './Swapi.css';

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
let showCategoryVar = false;
let currentPage = 1;
let debounceTimer: NodeJS.Timeout;

export const Swapi = () => {
    const [allCategories, setAllCategories] = useState<string[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [showCategory, setShowCategory] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [pages, setPages] = useState<number>(0);
    const [category, setCategory] = useState<string>("people");
    const [search, setSearch] = useState<string>("");
    const [btnWidth, setBtnWidth] = useState<string>("8rem");
    const [disabledBtn, setDisabledBtn] = useState<boolean>(false);

    useEffect(() => {
        axios.get("https://swapi.dev/api/")
            .then(response => {
                setAllCategories(Object.keys(response.data));
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const toggleShowCategory = () => {
        setSearch("");
        showCategoryVar = !showCategoryVar;
        if (showCategoryVar) {
            setShowCategory(true)
            axios.get(`https://swapi.dev/api/${category}`)
                .then(response => {
                    setCategories(response.data.results);
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
        setCategories([]);
        setShowCategory(false);
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
        setIsLoading(true);
        axios.get(`https://swapi.dev/api/${category}/?page=${currentPage + 1}`)
            .then(response => {
                setCategories(response.data.results);
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
                setCategories(response.data.results);
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
        setDisabledBtn(true);
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            axios.get(`https://swapi.dev/api/${category}/?search=${value}`)
                .then(response => {
                    setCategories(response.data.results);
                    console.log(response.data.results);
                    setIsLoading(false);
                    if (value.length > 0) {
                        setPages(0);
                    } else {
                        setDisabledBtn(false);
                        showCategoryVar = false;
                        currentPage = 1;
                        toggleShowCategory();
                    }
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                    setIsLoading(false);
                });
        }, 300)
    }

    return (
        <section className="SWSection">
            <div className='SWContainer'>
                <div className='SWHeaders'>
                    <h1>Welcome to my SWAPI playground</h1>
                    <h6 className='stillInBeta'>still in beta🤫</h6>
                </div>
                <div className='SWAPIControls'>
                    <div className='selectContainer'>
                        <select className='categories' name="categories" value={category} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => { setCategory(event.target.value); deleteList(); showCategoryVar = false; }} id="SWSelect">
                            {allCategories.map((category, index) => (
                                <option value={category} key={index}>{category}</option>
                            ))}
                        </select>
                    </div>
                    <input type="text" placeholder={`search ${category}...`} value={search} onChange={(event: React.ChangeEvent<HTMLInputElement>) => searchChangeHandler(event.target.value)} />
                    <button onClick={toggleShowCategory} disabled={disabledBtn} style={disabledBtn ? {color: "grey"} : {color: "white"}} className='showCategoryBtn skillsetBtn'><p>{disabledBtn
                        ? "search is active"
                        : (!showCategory
                            ? `show all ${category}`
                            : `hide all ${category}`
                        )
                    }</p></button>
                </div>
                {isLoading && showCategory ? (
                    <p>Loading...</p>
                ) : (
                    <ul>
                        {categories.map((category, index) => (
                            <li key={index}>
                                <CategoryChild category={category} />
                            </li>
                        ))}
                    </ul>
                )}
                {pages > 0 && (
                    <div>
                        <p>page {currentPage} of {pages}</p>
                        <div className='arrowsPages'>
                            {currentPage > 1 && <button onClick={prevPage} className='prev'></button>}
                            {currentPage < pages && <button onClick={nextPage} className='next'></button>}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

