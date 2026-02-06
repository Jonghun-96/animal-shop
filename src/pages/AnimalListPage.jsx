import { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AnimalCard from '../components/common/AnimalCard.jsx';
import SortDropdown from '../components/common/SortDropdown.jsx';
import { sortAnimals } from '../utils/sortAnimals.js';
import './AnimalListPage.css';


function AnimalListPage({ animals, title, likes, showMore = false }){


  const navigate = useNavigate();
  const [sortType, setSortType] = useState('default');
  const [visibleCount, setVisibleCount] = useState(12);

  const sortedAnimals = sortAnimals(animals, sortType, likes);

  const visibleAnimals = showMore ? sortedAnimals.slice(0, visibleCount) : sortedAnimals;

  return (
    <>
      <h3>{title}</h3>

      <SortDropdown sortType={sortType} setSortType={setSortType} />

      <Row className='componentRow'>
        {visibleAnimals.map(animal => (
          <Col key={animal.id} md={4}>
            <AnimalCard
              animal={animal}
              onClick={() => navigate(`/detail/${animal.id}`)}
            />
          </Col>
        ))}
      </Row>

      {showMore && visibleCount < sortedAnimals.length && (
        <div className="text-center mt-3">
          <Button className="more-btn" onClick={() => setVisibleCount(prev => prev + 12)}>
            더보기
          </Button>
        </div>
      )}
    </>
  );
}

export default AnimalListPage;