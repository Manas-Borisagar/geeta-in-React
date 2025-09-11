import React, { useEffect } from 'react';

function About() {
  // Set the document title when the component mounts
  useEffect(() => {
    document.title = "About - Bhagavad Gita";
  }, []);

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6 text-center">
          About the Bhagavad Gita
        </h1>
        {/* These 'prose' classes are provided by the @tailwindcss/typography plugin 
          which we configured in tailwind.config.js
        */}
        <div className="prose prose-lg max-w-none dark:prose-invert prose-p:leading-relaxed">
          <p>The <strong>Bhagavad Gita</strong>, often referred to as the Gita, is a 700-verse Hindu scripture
            that is part of the ancient Sanskrit epic, the Mahabharata. This scripture contains a conversation
            between Prince Arjuna and his charioteer Krishna, who is an avatar of the god Vishnu.</p>
          <p>Set in a narrative framework of a dialogue between Pandava prince Arjuna and his guide and charioteer
            Krishna, the Bhagavad Gita presents a synthesis of different ideas about dharma, theistic bhakti,
            and the yogic paths to moksha (liberation).</p>
          <blockquote>
            <p>It is a discourse on the nature of reality, the purpose of life, and the path to spiritual
              enlightenment.</p>
          </blockquote>
          <p>The Gita's call for selfless action inspired many leaders of the Indian independence movement,
            including Mahatma Gandhi, who referred to the Gita as his "spiritual dictionary." This website is a
            humble effort to make the profound wisdom of the Gita accessible to everyone.</p>
        </div>
      </div>
    </main>
  );
}

export default About;