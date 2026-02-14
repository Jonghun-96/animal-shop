
import { useSelector } from 'react-redux';
import { selectSpecialAnimals } from '../store/animalsSlice';
import AnimalListPage from './AnimalListPage';




function Special() {

  const special = useSelector(selectSpecialAnimals);
  const likes = useSelector(state => state.likes);

  return(
  <>
    <AnimalListPage 
      className='list-title'
      animals={special}
      title="특별한 친구들"
      likes={likes}
    />
  </>
  )
}

export default Special;