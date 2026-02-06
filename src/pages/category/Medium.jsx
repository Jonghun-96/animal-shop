
import { animals } from '../../data/data.js';
import AnimalCard from '../../components/common/AnimalCard.jsx';
import AnimalListPage from '../AnimalListPage.jsx';



function Medium({ likes }) {


  const medium = animals.filter(a => a.category === 'medium');



  return(
    
  <>
    <AnimalListPage 
      animals={medium}
      title="중형 친구"
      likes={likes}
      showMore={true}
      initialCount={8}
    />
  </>
    
  )
}

export default Medium;