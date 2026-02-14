import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectPopularAnimals } from '../../store/animalsSlice';
import './PopularAnimals.css'
import AnimalCard from '../common/AnimalCard';


function PopularAnimals() {



  const navigate = useNavigate();
  const popular = useSelector(selectPopularAnimals);
  const popularPreview = popular.slice(0,3)


  return(
  <div className='popularList componentList'>
    <h3 onClick={()=>{navigate('/popular')}}>인기 많은 친구들</h3>
    
    <Row className='popularRow componentRow'>
      {
        popularPreview.map(animal => (
          <Col key={animal.id} md={4}> 
            <AnimalCard 
              animal={animal}
              onClick={()=>{navigate(`/detail/${animal.id}`)}}
            />
          </Col>
        ))
      }
    </Row>
    
  </div>
  )
}

export default PopularAnimals;