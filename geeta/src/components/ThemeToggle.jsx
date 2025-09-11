import React, { useState, useEffect } from 'react';

function ThemeToggle() {
    // State to track if dark mode is active. Default to false.
    const [isDarkMode, setIsDarkMode] = useState(false);

    // This useEffect runs only ONCE when the component mounts
    useEffect(() => {
        // Check localStorage OR system preference
        const prefersDark = localStorage.getItem('color-theme') === 'dark' ||
            (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

        setIsDarkMode(prefersDark); // Update our React state

        // Manually apply the class to the <html> tag
        if (prefersDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []); // Empty dependency array means this runs only once on mount

    // This function runs every time the button is clicked
    const toggleTheme = () => {
        // Toggle the state value
        const newIsDarkMode = !isDarkMode;
        setIsDarkMode(newIsDarkMode);

        // Update localStorage and the <html> class
        if (newIsDarkMode) {
            localStorage.setItem('color-theme', 'dark');
            document.documentElement.classList.add('dark');
        } else {
            localStorage.setItem('color-theme', 'light');
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <button onClick={toggleTheme} id="theme-toggle" className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
            {/* Show the light icon ONLY if dark mode is ON */}
            {isDarkMode && (
                <svg id="theme-icon-light" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )}
            {/* Show the dark icon ONLY if dark mode is OFF */}
            {!isDarkMode && (
                <svg id="theme-icon-dark" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
            )}
        </button>
    );
}

export default ThemeToggle;