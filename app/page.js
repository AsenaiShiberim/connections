'use client'
import { useState, useEffect } from 'react';
import { DAY_1 } from './comps/constants';

const App = () => {
  const [complete, setComplete] = useState([]);
  const [incomplete, setIncomplete] = useState(DAY_1);
  const [items, setItems] = useState([]);
  const [activeItems, setActiveItems] = useState([]);
  const [mistakesRemaining, setMistakesRemaining] = useState(3);

  // Utility functions
  const difficultyColor = (difficulty) => {
    return {
      1: '#fbd400',
      2: '#b5e352',
      3: '#729eeb',
      4: '#bc70c4',
    }[difficulty];
  };

  const chunk = (list, size) => {
    const chunkCount = Math.ceil(list.length / size);
    return new Array(chunkCount).fill(null).map((_, i) =>
      list.slice(i * size, i * size + size)
    );
  };

  const shuffle = (list) => {
    return list.sort(() => 0.5 - Math.random());
  };

  // Functions to manipulate game state
  const toggleActive = (item) => {
    if (activeItems.includes(item)) {
      setActiveItems(activeItems.filter((i) => i !== item));
    } else if (activeItems.length < 4) {
      setActiveItems([...activeItems, item]);
    }
  };

  const shuffleItems = () => {
    setItems(shuffle(items));
  };

  const deselectAll = () => {
    setActiveItems([]);
  };

  const submit = () => {
    const foundGroup = incomplete.find((group) =>
      group.items.every((item) => activeItems.includes(item))
    );

    if (foundGroup) {
      setComplete([...complete, foundGroup]);
      setIncomplete(incomplete.filter((group) => group !== foundGroup));
      setItems(incomplete.flatMap((group) => group.items));
    } else {
      setMistakesRemaining(mistakesRemaining - 1);

      if (mistakesRemaining === 1) {
        setComplete([...incomplete]);
        setIncomplete([]);
        setItems([]);
      }
    }

    setActiveItems([]);
  };

  // Set initial items after first render
  useEffect(() => {
    setItems(shuffle(DAY_1.flatMap((g) => g.items)));
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="flex flex-col items-center space-y-6 max-w-screen-md w-full">
        <h1 className="text-6xl font-serif font-light">Connections</h1>
        <p className="text-xl font-semibold">Create four groups of four!</p>

        {/* Completed Groups */}
        {complete.map((group, index) => (
          <div
            key={group.category + index} // Use a unique key here (index added for uniqueness)
            className="flex flex-col items-center justify-center h-20 w-full rounded-lg"
            style={{ backgroundColor: difficultyColor(group.difficulty) }}
          >
            <p className="text-xl font-extrabold uppercase">{group.category}</p>
            <p className="text-xl uppercase">{group.items.join(', ')}</p>
          </div>
        ))}

        {/* Game Grid */}
        <div className="space-y-2">
          {chunk(items, 4).map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center space-x-2">
              {row.map((item) => (
                <button
                  key={item.id} // Use a unique property of item here (assuming each item has an `id` property)
                  onClick={() => toggleActive(item)}
                  className={`w-36 h-20 text-lg font-extrabold uppercase rounded border border-black 
                    ${activeItems.includes(item)
                      ? 'bg-gray-800 text-white'
                      : 'bg-gray-200 text-black'}
                  `}
                >
                  {item.name} {/* Assuming `name` is the property you want to display */}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Mistakes Remaining */}
        <div className="flex items-center space-x-2">
          <p className="text-md">Mistakes remaining:</p>
          {[...Array(mistakesRemaining)].map((_, i) => (
            <div key={i} className="w-3 h-3 rounded-full bg-gray-800"></div>
          ))}
        </div>

        {/* Control Buttons */}
        <div className="flex space-x-4">
          <button
            className="px-4 py-2 border-2 border-black rounded-full hover:bg-gray-200"
            onClick={shuffleItems}
          >
            Shuffle
          </button>
          <button
            className="px-4 py-2 border-2 border-black rounded-full hover:bg-gray-200"
            onClick={deselectAll}
          >
            Deselect All
          </button>
          <button
            className={`px-4 py-2 border-2 border-black rounded-full ${
              activeItems.length !== 4
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-gray-200'
            }`}
            onClick={submit}
            disabled={activeItems.length !== 4}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
