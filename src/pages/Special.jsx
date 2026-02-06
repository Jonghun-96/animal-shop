
import { useSelector } from 'react-redux';
import { selectSpecialAnimals } from '../store/animalsSlice';
import AnimalListPage from './AnimalListPage.jsx';




function Special() {

  const special = useSelector(selectSpecialAnimals);
  const likes = useSelector(state => state.likes);

  return(
  <>
    <AnimalListPage 
      animals={special}
      title="조금 특별한 친구들"
      likes={likes}
    />
  </>
  )
}

export default Special;