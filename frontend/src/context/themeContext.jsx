// src/context/ThemeContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the context
const ThemeContext = createContext();

// Custom hook to use the ThemeContext
export const useTheme = () => useContext(ThemeContext);

// Theme Provider component
export const ThemeProvider = ({ children }) => {
    // Initialize theme from localStorage or default to 'dark'
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'dark';
    });

    useEffect(() => {
        // Apply the theme to the root element (usually <html>)
        document.documentElement.classList.toggle('dark', theme === 'dark');

        // Save theme to localStorage
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        // Toggle between 'dark' and 'light'
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
    };

const [addedtitles, setAddedTitles] = useState([]);

    const getTitles = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/v1/title',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('your-token'),
                },
            });
            const data = await response.json();
            console.log("data: ",data);
            setAddedTitles(data);
        } catch (error) {
            console.log(error);
        }
    };
    const addTitle = async (title) => {
        try {
            const response = await fetch('http://localhost:8000/api/v1/title', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('your-token'),
                },
                body: JSON.stringify({ title }),
            });
            const data = await response.json();
            console.log(data);
           if(!response.ok){
            alert(data.message);
               throw new Error(data.message);}
            getTitles();
        } catch (error) {
            
            console.error(error);
        }
    }

    

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, addedtitles,getTitles,addTitle }}>
            {children}
        </ThemeContext.Provider>
    );
};
