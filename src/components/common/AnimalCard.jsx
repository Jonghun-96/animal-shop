
import LikeButton from './LikeButton';






function AnimalCard({ animal, onClick }) {

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