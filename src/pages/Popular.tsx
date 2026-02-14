

import { useSelector } from 'react-redux';
import { selectPopularAnimals } from '../store/animalsSlice';
import AnimalListPage from './AnimalListPage';



function Popular() {

  const popular = useSelector(selectPopularAnimals);
  const likes = useSelector(state => state.likes);



  return(
  <>
    <AnimalListPage 
      className='list-title'
      animals={popular}
      title="인기 많은 친구들"
      likes={likes}
      showMore={true}
      initialCount={8}
    />
  </>
  )
}

export default Popular;