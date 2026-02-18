
import { useSelector } from 'react-redux';
import { selectSpecialAnimals } from '../store/animalsSlice';
import AnimalListPage from './AnimalListPage';
import { useState, useEffect, useMemo } from 'react';
import { animalsShuffled } from '../data/data';



function Special() {

  const special = useSelector(selectSpecialAnimals);
  const likes = useSelector(state => state.likes);

  const shuffledSpecial = useMemo(() => {
    return [...special].sort(() => Math.random() - 0.5);
  }, []);


  return(
  <>
    <AnimalListPage 
      className='list-title'
      animals={shuffledSpecial}
      title="특별한 친구들"
      likes={likes}
    />
  </>
  )
}

export default Special;