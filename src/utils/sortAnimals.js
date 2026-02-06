


export function sortAnimals(animals, sortType, likes){

  return [...animals].sort((a, b) => {
    switch(sortType){
      case 'popular': 
        return b.seedLikes - a.seedLikes;

      case 'low': 
        return a.price - b.price;

      case 'high': 
        return b.price - a.price;
        
      default: return 0;
    }
  })
}
