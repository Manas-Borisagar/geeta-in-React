import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL, API_OPTIONS } from '../apiConfig';

function Chapters() {
    const [chapters, setChapters] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}/chapters/`, API_OPTIONS)
            .then(response => response.json())
            .then(data => {
                setChapters(data);
                setError(null);
            })
            .catch(err => {
                console.error("Chapters Error:", err);
                setError("Could not load chapters. Please check your API key and network connection.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []); // Runs once on mount

    return (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">The 18 Chapters of the Gita</h1>
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Click on a chapter to read its verses and summary.</p>
            </div>
            <div id="chapters-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {isLoading && (
                    // Show skeleton loaders (18 of them)
                    Array(18).fill(0).map((_, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 h-48 p-6 rounded-lg shadow-md animate-pulse"></div>
                    ))
                )}
                {error && (
                    <p className="text-center text-red-500 md:col-span-3">{error}</p>
                )}
                {chapters.map(chapter => (
                    <Link
                        key={chapter.id}
                        to={`/chapter/${chapter.chapter_number}`}
                        className="flex flex-col p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl dark:hover:shadow-orange-900/20 hover:-translate-y-1 transition-all"
                    >
                        <div className="flex justify-between items-baseline">
                            <p className="font-semibold text-orange-600 dark:text-orange-400">Chapter {chapter.chapter_number}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{chapter.verses_count} Verses</p>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-2">{chapter.name_transliterated}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{chapter.chapter_summary}</p>
                    </Link>
                ))}
            </div>
        </main>
    );
}

export default Chapters;