import {  Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectSpecialAnimals } from '../../store/animalsSlice';
import './SpecialAnimals.css'
import AnimalCard from '../common/AnimalCard';
import { useMemo } from 'react';

function SpecialAnimals() {


  const navigate = useNavigate();
  const special = useSelector(selectSpecialAnimals);
  
  const specialPreview = useMemo(() => {
    const shuffled = [...special].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }, []);


  return(
  <div className='specialList componentList'>
    
    <div className="special-header">
      <h3 onClick={() => navigate("/special")}>특별한 친구들</h3>

      <span className="go-link" onClick={() => navigate("/special")}>
        보러가기 &gt;
      </span>
    </div>

    <Row className='specialRow componentRow'>
      {
        specialPreview.map(animal => (
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

export default SpecialAnimals;