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
    setCategories(puzzleData.categories);

    const allArtists = puzzleData.categories.flatMap((category) =>
      category.artists.map((artist) => ({ ...artist, category: category.label }))
    );

    const shuffled = allArtists.sort(() => Math.random() - 0.5);
    setShuffledArtists(shuffled);
  }, []);

  const handleArtistClick = (artist) => {
    if (lockedArtists.find((a) => a.name === artist.name)) return;
    if (selectedArtists.find((a) => a.name === artist.name)) return;

    const newSelection = [...selectedArtists, artist];
    setSelectedArtists(newSelection);

    if (newSelection.length === 4) {
      const allSameCategory = newSelection.every(
        (a) => a.category === newSelection[0].category
      );

      if (allSameCategory) {
        setSolvedCategories([...solvedCategories, newSelection[0].category]);
        setLockedArtists([...lockedArtists, ...newSelection]);
        setSelectedArtists([]);
      } else {
        setTimeout(() => {
          setSelectedArtists([]);
        }, 1000);
      }
    }
  };

  return (
    <div>
      <div className='grid grid-cols-4 gap-4 mt-8'>
        {shuffledArtists.map((artist, index) => {
          const isSelected = selectedArtists.find((a) => a.name === artist.name);
          const isLocked = lockedArtists.find((a) => a.name === artist.name);
          const showCategory = solvedCategories.includes(artist.category);

          return (
            <ArtistCard
              key={index}
              name={artist.name}
              image={artist.image}
              onClick={() => handleArtistClick(artist)}
              selected={selectedArtists.some((a) => a.name && a.image === artist.image)}
              locked={isLocked}
              category={showCategory ? artist.category : null}
            />
          );
        })}
      </div>

      {solvedCategories.length === categories.length && (
        <div className="mt-8 text-2xl font-bold text-green-600">You solved the puzzle! 🎉</div>
      )}
    </div>
  );
}
