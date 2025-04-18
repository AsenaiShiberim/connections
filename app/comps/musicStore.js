

export default {
    categories: [],
    shuffledArtists: [],
    selectedArtists: [],
    solvedCategories: [],
    lockedArtists: [],
  
    init(puzzleData) {
      this.categories = puzzleData.categories;
      const allArtists = this.categories.flatMap((category) => {
        return category.artists.map((artist) => ({
          ...artist,
          category: category.label
        }));
      });
      this.shuffledArtists = this._shuffle(allArtists);
      this.selectedArtists = [];
      this.solvedCategories = [];
      this.lockedArtists = [];
    },
  
    selectArtist(artist) {
      // Ignore if artist is already locked (already part of a solved group)
      if (this.lockedArtists.find((a) => a.name === artist.name)) return;
  
      // Toggle selection
      const alreadySelected = this.selectedArtists.find((a) => a.name === artist.name);
      if (alreadySelected) {
        this.selectedArtists = this.selectedArtists.filter((a) => a.name !== artist.name);
      } else {
        if (this.selectedArtists.length < 4) {
          this.selectedArtists.push(artist);
        }
      }
  
      // Auto check if 4 selected
      if (this.selectedArtists.length === 4) {
        this.checkSelection();
      }
    },
  
    checkSelection() {
      if (this.selectedArtists.length !== 4) return;
  
      const category = this.selectedArtists[0].category;
      const isValid = this.selectedArtists.every((artist) => artist.category === category);
  
      if (isValid) {
        this.solvedCategories.push(category);
        this.lockedArtists.push(...this.selectedArtists);
      }
  
      // Reset current selection either way
      this.selectedArtists = [];
    },
  
    isGameWon() {
      return this.solvedCategories.length === this.categories.length;
    },
  
    _shuffle(array) {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }
  };
  