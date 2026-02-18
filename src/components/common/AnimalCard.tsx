
import LikeButton from './LikeButton';
import './AnimalCard.css';
import { Animal } from "../../types/animal";
import { useRef } from "react";


type Props = {
  animal :Animal;
  onClick :React.MouseEventHandler<HTMLDivElement>;
}


function AnimalCard({ animal, onClick }: Props) {


  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 6; // 최대 8도 회전
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;

    if (animal.isSpecial) {
      const mx = (x / rect.width) * 100;
      const my = (y / rect.height) * 100;

      card.style.setProperty("--mx", `${mx}%`);
      card.style.setProperty("--my", `${my}%`);
    }
  };


  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.transform = "rotateX(0deg) rotateY(0deg)";

    // 마우스 나가면 중앙으로 돌아가게
    card.style.setProperty("--mx", "50%");
    card.style.setProperty("--my", "50%");
  };


  return (
  <div className="card-container" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
    <div className={`animalCard ${animal.isSpecial ? "special-card" : ""}`} 
      ref={cardRef} 
      onClick={onClick}
    >
      {animal.isSpecial && (
        <div className="sparkle-layer">
          {Array.from({ length: 15 }).map((_, i) => (
            <span key={i} className="star" />
          ))}
        </div>
      )}
      

      <img src={animal.img} alt={animal.name}/>
      <h4>{animal.name}</h4>
      <p>'{animal.description}'</p>
      <p>{animal.price.toLocaleString()}원</p>
      <LikeButton animal={animal}/>
    </div>
  </div>
  )
}

export default AnimalCard;