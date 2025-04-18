'use client';

import { useState, useEffect } from 'react';
import puzzleData from '../data/puzzle1.json';
import ArtistCard from './artistCard';

export default function Grid() {
  const [categories, setCategories] = useState([]);
  const [shuffledArtists, setShuffledArtists] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [solvedCategories, setSolvedCategories] = useState([]);
  const [lockedArtists, setLockedArtists] = useState([]);

  useEffect(() => {
    const allArtists = puzzleData.categories.flatMap((category) =>
      category.artists.map((artist) => ({ ...artist, category: category.label }))
    );
    setCategories(puzzleData.categories);
    setShuffledArtists(shuffleArray(allArtists));
  }, []);

  const handleArtistClick = (artist) => {
    if (lockedArtists.some((a) => a.name === artist.name)) return;

    const newSelection = selectedArtists.includes(artist)
      ? selectedArtists.filter((a) => a.name !== artist.name)
      : [...selectedArtists, artist].slice(0, 4);

    setSelectedArtists(newSelection);

    if (newSelection.length === 4) {
      const allSameCategory = newSelection.every((a) => a.category === newSelection[0].category);
      if (allSameCategory) {
        setSolvedCategories((prev) => [...prev, newSelection[0].category]);
        setLockedArtists((prev) => [...prev, ...newSelection]);
      }
      setTimeout(() => setSelectedArtists([]), 1000);
    }
  };

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  const handleSubmit = () => {
    if (solvedCategories.length === categories.length) {
      alert("Congratulations! You've solved all categories!");
      // Optionally, reset the game or navigate to another page
    } else {
      alert("You haven't solved all categories yet. Keep trying!");
    }
  };

  return (
    <div>
      <div className='grid grid-cols-4 gap-4 mt-8'>
        {shuffledArtists.map((artist, index) => {
          const isLocked = lockedArtists.some((a) => a.name === artist.name);
          const showCategory = solvedCategories.includes(artist.category);

          return (
            <ArtistCard
              key={index}
              name={artist.name}
              image={artist.image}
              onClick={() => handleArtistClick(artist)}
              selected={selectedArtists.includes(artist)}
              locked={isLocked}
              category={showCategory ? artist.category : null}
            />
          );
        })}
      </div>

      {solvedCategories.length === categories.length && (
        <div className="mt-8 text-2xl font-bold text-green-600">You solved the puzzle! 🎉</div>
      )}

      <button 
        onClick={handleSubmit} 
        className="mt-4 p-2 bg-blue-500 text-white rounded"
        disabled={solvedCategories.length < categories.length}
      >
        Submit
      </button>
    </div>
  );
}