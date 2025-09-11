import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_BASE_URL, API_OPTIONS } from '../apiConfig';

function VerseDetail() {
    const [verse, setVerse] = useState(null);
    const [chapter, setChapter] = useState(null); // To get total verse count for nav
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { chapterId, verseId } = useParams(); // Get both params

    useEffect(() => {
        setIsLoading(true);
        setVerse(null);
        setChapter(null);
        setError(null);

        if (!chapterId || !verseId || isNaN(chapterId) || isNaN(verseId)) {
            setError("Invalid Chapter/Verse ID.");
            setIsLoading(false);
            return;
        }

        // We need to make two API calls, just like your original code.
        // We use Promise.all to wait for both to finish.
        const versePromise = fetch(`${API_BASE_URL}/chapters/${chapterId}/verses/${verseId}/`, API_OPTIONS);
        const chapterPromise = fetch(`${API_BASE_URL}/chapters/${chapterId}/`, API_OPTIONS);

        Promise.all([versePromise, chapterPromise])
            .then(responses => {
                // Check if both responses are OK
                if (!responses[0].ok || !responses[1].ok) {
                    throw new Error('Network response was not ok');
                }
                // Parse JSON for both
                return Promise.all(responses.map(res => res.json()));
            })
            .then(([verseData, chapterData]) => {
                // Both requests succeeded
                setVerse(verseData);
                setChapter(chapterData);
                document.title = `Gita ${verseData.chapter_number}.${verseData.verse_number} - Bhagavad Gita`;
            })
            .catch(err => {
                console.error("Verse load error:", err);
                setError("Could not load verse data. The verse may not exist or an API error occurred.");
            })
            .finally(() => {
                setIsLoading(false);
            });

    }, [chapterId, verseId]); // Re-run this effect if either ID changes

    // Helper functions to render content
    const renderTranslations = () => {
        const englishTranslations = verse.translations.filter(t => t.language === 'english');
        if (englishTranslations.length === 0) {
            return <p className="text-gray-500">No English translations available.</p>;
        }
        return englishTranslations.map((t, index) => (
            <div key={index} className="mb-6">
                <h4 className="font-bold text-md text-gray-900 dark:text-white">{t.author_name}</h4>
                <p className="text-lg text-gray-800 dark:text-gray-200 italic leading-relaxed">"{t.description}"</p>
            </div>
        ));
    };

    const renderCommentaries = () => {
        if (verse.commentaries.length === 0) {
            return <p className="text-gray-500">No commentaries available for this verse.</p>;
        }
        return verse.commentaries.map((c, index) => (
            <div key={index} className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700 first:pt-0 first:mt-0 first:border-t-0">
                <h4 className="font-bold text-lg text-gray-900 dark:text-white">${c.author_name}</h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-2"
                    dangerouslySetInnerHTML={{ __html: c.description || 'Commentary not available.' }} />
            </div>
        ));
    };

    // Loading Skeleton
    if (isLoading) {
        return (
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
                <div className="max-w-4xl mx-auto animate-pulse">
                    <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mx-auto mb-8"></div>
                    <div className="bg-white dark:bg-gray-800 p-10 rounded-lg">
                        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4"></div>
                        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
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
    if (verse && chapter) {
        const currentVerseNum = parseInt(verse.verse_number);
        const totalVerses = parseInt(chapter.verses_count);
        const showPrev = currentVerseNum > 1;
        const showNext = currentVerseNum < totalVerses;

        return (
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                        <Link to={`/chapter/${verse.chapter_number}`} className="text-orange-600 dark:text-orange-400 hover:underline">
                            &larr; Back to Chapter {verse.chapter_number}
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">
                            Bhagavad Gita {verse.chapter_number}.{verse.verse_number}
                        </h1>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 md:p-10 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
                        <div className="text-center">
                            <p className="sanskrit-text text-gray-900 dark:text-white">{verse.text}</p>
                        </div>
                        <div className="border-t border-gray-200 dark:border-gray-700 my-8"></div>
                        <div>
                            <h3 className="text-xl font-bold text-orange-600 dark:text-orange-400 mb-4">Translations (English)</h3>
                            {renderTranslations()}
                        </div>
                        <div className="border-t border-gray-200 dark:border-gray-700 my-8"></div>
                        <div>
                            <h3 className="text-xl font-bold text-orange-600 dark:text-orange-400 mb-6">Commentaries</h3>
                            <div>{renderCommentaries()}</div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-8">
                        <Link
                            to={`/verse/${verse.chapter_number}/${currentVerseNum - 1}`}
                            className={`bg-white dark:bg-gray-800 px-5 py-2 rounded-lg shadow font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition ${!showPrev ? 'invisible' : ''}`}
                        >
                            &larr; Previous
                        </Link>
                        <Link
                            to={`/verse/${verse.chapter_number}/${currentVerseNum + 1}`}
                            className={`bg-white dark:bg-gray-800 px-5 py-2 rounded-lg shadow font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition ${!showNext ? 'invisible' : ''}`}
                        >
                            Next &rarr;
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return null;
}

export default VerseDetail;