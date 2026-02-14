import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './SearchResultList.css';


function SearchResultList({ filteredAnimals, highlightIndex, onSelect }) {


  const navigate = useNavigate();


  if (!filteredAnimals.length) return null;


  return (
    <ListGroup className="search-results">
      {filteredAnimals.map((animal, index) => (
        <ListGroup.Item 
          className={`search-object ${index === highlightIndex ? 'highlight' : ''}`}
          key={animal.id} 
          onClick={()=>{
            navigate(`/detail/${animal.id}`)
            onSelect()
          }}
          >
          <img className="search-thumb" src={animal.img} alt={animal.name}/>
          {animal.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default SearchResultList;