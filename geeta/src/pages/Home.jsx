import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL, API_OPTIONS } from '../apiConfig';

function Home() {
    const [verseOfDay, setVerseOfDay] = useState(null);
    const [chapters, setChapters] = useState([]);
    const [verseError, setVerseError] = useState(null);
    const [chaptersError, setChaptersError] = useState(null);
    const [isVerseLoading, setIsVerseLoading] = useState(true);
    const [isChaptersLoading, setIsChaptersLoading] = useState(true);

    // Scroll to Verse of the Day section
    const scrollToVerse = () => {
        document.getElementById('verse-of-the-day').scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        // --- Fetch Verse of the Day ---
        // This logic replicates your original "random" logic
        const randomChapter = Math.floor(Math.random() * 18) + 1;

        fetch(`${API_BASE_URL}/chapters/${randomChapter}/`, API_OPTIONS)
            .then(response => response.json())
            .then(chapterInfo => {
                const randomVerse = Math.floor(Math.random() * chapterInfo.verses_count) + 1;
                // Now fetch the actual random verse
                return fetch(`${API_BASE_URL}/chapters/${randomChapter}/verses/${randomVerse}/`, API_OPTIONS);
            })
            .then(response => response.json())
            .then(verseData => {
                setVerseOfDay(verseData);
                setVerseError(null);
            })
            .catch(err => {
                console.error("Verse Error:", err);
                setVerseError("Could not load Verse of the Day. Please check your API key or network connection.");
            })
            .finally(() => {
                setIsVerseLoading(false);
            });

        // --- Fetch All Chapters ---
        fetch(`${API_BASE_URL}/chapters/`, API_OPTIONS)
            .then(response => response.json())
            .then(data => {
                setChapters(data);
                setChaptersError(null);
            })
            .catch(err => {
                console.error("Chapters Error:", err);
                setChaptersError("Could not load chapters. Please check your API key or network connection.");
            })
            .finally(() => {
                setIsChaptersLoading(false);
            });

    }, []); // Empty array means this runs once on component mount

    // Helper function to find the first English translation
    const getEnglishTranslation = (verse) => {
        if (!verse || !verse.translations) return "Translation not available.";
        const translation = verse.translations.find(t => t.language === 'english');
        return translation ? translation.description : "Translation not available.";
    };

    return (
        <main>
            {/* Hero Section */}
            <section className="relative text-white flex items-center justify-center h-[60vh] md:h-[70vh] min-h-[450px]">
                <div
                    className="absolute inset-0 bg-no-repeat bg-cover bg-center"
                    style={{ backgroundImage: "url('https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75')" }}
                ></div>
                <div className="absolute inset-0 bg-black/60"></div>

                <div className="relative z-10 text-center px-4">
                    <h1 className="text-5xl md:text-7xl font-bold font-sanskrit tracking-wider text-white drop-shadow-lg">
                        BHAGAVAD GITA
                    </h1>
                    <p className="mt-2 text-xl md:text-2xl text-gray-200">The Song of God</p>

                    <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Link
                            to="/chapters"
                            className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300"
                        >
                            Read The Gita
                        </Link>
                        <button
                            onClick={scrollToVerse}
                            className="w-full sm:w-auto bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold py-3 px-8 rounded-full transition-colors duration-300"
                        >
                            Random Verse
                        </button>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Verse of the Day Section */}
                <section id="verse-of-the-day" className="my-16">
                    {isVerseLoading && (
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 animate-pulse">
                            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                        </div>
                    )}
                    {verseError && <p className="text-center text-red-500">{verseError}</p>}
                    {verseOfDay && (
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                            <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-4">
                                Verse of the Day (Chapter {verseOfDay.chapter_number}, Verse {verseOfDay.verse_number})
                            </h2>
                            <blockquote className="border-l-4 border-orange-500 dark:border-orange-400 pl-4">
                                <p className="font-sanskrit text-2xl my-4">"{verseOfDay.text}"</p>
                                <p className="italic text-lg text-gray-700 dark:text-gray-300">
                                    "{getEnglishTranslation(verseOfDay)}"
                                </p>
                            </blockquote>
                            <Link
                                to={`/verse/${verseOfDay.chapter_number}/${verseOfDay.verse_number}`}
                                className="inline-block mt-6 font-semibold text-orange-600 dark:text-orange-400 hover:underline"
                            >
                                Read Commentary &rarr;
                            </Link>
                        </div>
                    )}
                </section>

                {/* Chapters Grid Section */}
                <section>
                    <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">Chapters</h2>
                    <div id="chapters-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {isChaptersLoading && (
                            Array(6).fill(0).map((_, index) => (
                                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md animate-pulse">
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-3"></div>
                                    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                                </div>
                            ))
                        )}
                        {chaptersError && <p className="text-center text-red-500 md:col-span-3">{chaptersError}</p>}
                        {chapters.map(chapter => (
                            <Link
                                key={chapter.id}
                                to={`/chapter/${chapter.chapter_number}`}
                                className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl dark:hover:shadow-orange-900/20 hover:-translate-y-1 transition-all"
                            >
                                <p className="font-semibold text-orange-600 dark:text-orange-400">Chapter {chapter.chapter_number}</p>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1">{chapter.name_transliterated}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{chapter.verses_count} Verses</p>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Home;