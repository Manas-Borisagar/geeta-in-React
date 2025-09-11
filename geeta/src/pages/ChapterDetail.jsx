import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_BASE_URL, API_OPTIONS } from '../apiConfig';

function ChapterDetail() {
    const [chapter, setChapter] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams(); // Gets the ':id' from the URL

    useEffect(() => {
        // Reset state when ID changes
        setIsLoading(true);
        setChapter(null);
        setError(null);

        if (!id || isNaN(id) || id < 1 || id > 18) {
            setError("Invalid Chapter ID. Please select a chapter from 1 to 18.");
            setIsLoading(false);
            return;
        }

        fetch(`${API_BASE_URL}/chapters/${id}/`, API_OPTIONS)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch chapter data.");
                }
                return response.json();
            })
            .then(data => {
                setChapter(data);
                document.title = `${data.name_transliterated} - Bhagavad Gita`;
            })
            .catch(err => {
                console.error("Error fetching chapter data:", err);
                setError("Could not load chapter data. The API request failed. Please check your API key and network connection.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [id]); // This useEffect re-runs whenever the 'id' param changes

    // Loading Skeleton
    if (isLoading) {
        return (
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
                <div className="animate-pulse">
                    <div className="text-center mb-12">
                        <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mx-auto"></div>
                        <div className="h-10 bg-gray-400 dark:bg-gray-600 rounded w-1/2 mx-auto mt-4"></div>
                        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mx-auto mt-2"></div>
                    </div>
                    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-12">
                        <div className="h-7 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full mt-4"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-5/6 mt-2"></div>
                    </div>
                </div>
            </main>
        );
    }

    // Error Message
    if (error) {
        return (
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
                <div className="text-center py-20">
                    <h1 className="text-2xl font-bold text-red-600">{error}</h1>
                    <Link to="/chapters" className="mt-4 inline-block bg-orange-600 text-white font-bold py-2 px-4 rounded hover:bg-orange-700">
                        View All Chapters
                    </Link>
                </div>
            </main>
        );
    }

    // Loaded Content
    if (chapter) {
        return (
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
                <div className="text-center mb-12">
                    <p className="font-semibold text-orange-600 dark:text-orange-400 text-lg">Chapter {chapter.chapter_number}</p>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mt-2">{chapter.name_transliterated}</h1>
                    <p className="text-2xl text-gray-700 dark:text-gray-300 mt-1 font-sanskrit">{chapter.name}</p>
                </div>

                <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl mb-16 border border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Summary</h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">{chapter.chapter_summary}</p>
                </div>

                <div>
                    <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">Verses ({chapter.verses_count})</h2>
                    <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10 gap-3 text-center">
                        {/* Generate the verse links just like your original code */}
                        {Array.from({ length: chapter.verses_count }, (_, i) => i + 1).map(verseNum => (
                            <Link
                                key={verseNum}
                                to={`/verse/${chapter.chapter_number}/${verseNum}`}
                                className="aspect-square flex items-center justify-center font-bold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 hover:bg-orange-100 dark:hover:bg-gray-700 hover:border-orange-300 dark:hover:border-orange-600 hover:shadow-lg hover:scale-105 transition-all duration-200"
                            >
                                {verseNum}
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
        );
    }

    return null; // Should not be reached
}

export default ChapterDetail;