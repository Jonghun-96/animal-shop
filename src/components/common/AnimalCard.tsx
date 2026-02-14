
import LikeButton from './LikeButton';
import './AnimalCard.css';
import { Animal } from "../../types/animal";


type Props = {
  animal :Animal;
  onClick :React.MouseEventHandler<HTMLDivElement>;
}


function AnimalCard({ animal, onClick }: Props) {

  return (
    <div className='animalCard' onClick={onClick}>
      <img src={animal.img} alt={animal.name}/>
      <h4>{animal.name}</h4>
      <p>'{animal.description}'</p>
      <p>{animal.price.toLocaleString()}원</p>
      <LikeButton animal={animal}/>
    </div>
  )
}

export default AnimalCard;