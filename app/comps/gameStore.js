import {DAY_1} from './constants.js'




export const gameState = {
    activeItems: [],
    items: shuffle(allItemsFromGroups),
    complete: [],
    incomplete: allGroups,
    mistakesRemaining: 5
  }

  const shuffle = (list) => {
    return [...list].sort(() => 0.5 - Math.random());
  };


  //allItemsFromGroups = DAY_1.flatMap(group =>group.items)


  const methods = (gameState) =>({

    toggleItem(item){
        if(gameState.activeItems.includes(item)){
            gameState.activeItems = gameState.activeItems.filter((i) => i !== item);
        } else if(gameState.activeItems.length.length<4){
            gameState.activeItems.push(item);
        }
    
    },

    
    deselectAll(){

        gameState.activeItems = [];

    },

    shuffleItems(){
        gameState.items = shuffle(items)
    },

    submitGuess(){
        if(gameState.activeItems === gameState.incomplete){
            gameState.activeItems.push(complete)
            gameState.activeItems.pop(incomplete)
            incomplete[i] --;
        }
    },

    


  })



  



