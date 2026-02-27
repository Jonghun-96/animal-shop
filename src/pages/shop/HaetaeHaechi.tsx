import React from 'react';
import { animals } from '@/data/data';
import AnimalCard from '@/components/common/AnimalCard';
import { useNavigate } from 'react-router-dom';
import './HaetaeHaechi.css';

import cloud1 from '@/images/cloud/cloud1.png';
import cloud2 from '@/images/cloud/cloud2.png';
import cloud3 from '@/images/cloud/cloud3.png';
import cloud4 from '@/images/cloud/cloud4.png';
import cloud5 from '@/images/cloud/cloud5.png';
import cloud6 from '@/images/cloud/cloud6.png';




const HaetaeHaechi = () => {
  
  const navigate = useNavigate();

  const targetAnimals = animals.filter(a => 
    a.name === '해태' || a.name === '해치'
  );

  const cloudImages = [cloud1, cloud2, cloud3, cloud4, cloud5, cloud6];

  return (
    <div className="container mt-5">
      <div className="bg-dark text-white p-5 rounded-4 mb-5 text-center shadow">
        <h1 className="display-4 fw-bold">신비로운 영물: 해태 & 해치</h1>
        <p className="lead">궁궐을 지키는 전설의 동물을 특별한 혜택으로 만나보세요.</p>
        <span className="badge bg-warning text-dark px-3 py-2">SPECIAL</span>
      </div>
    

      <div className="row row-cols-1 row-cols-md-2 g-4 justify-content-center haetaehaechi">

      <div className='cloud-box'>
        {cloudImages.map((img, index) => {
          // 화면을 가로 3칸, 세로 2칸 정도로 상상하고 구역을 나눕니다.
          const col = index % 3; // 0, 1, 2 (가로 위치 구역)
          const row = Math.floor(index / 3); // 0, 1 (세로 위치 구역)

          const randomStyle = {
            // 각 구역(가로 33%, 세로 50%) 내에서만 랜덤하게 위치 잡기
            left: `${(col * 25) + Math.random() * 15}%`, 
            top: `${(row * 40) + Math.random() * 30}%`,
            
            width: `${360 + Math.random() * 80}px`,
            opacity: 0.2,
            animationDelay: `${Math.random() * 5}s`,
          };

          return (
            <img 
              key={index}
              src={img} 
              className="cloud-item" 
              style={randomStyle} 
              alt="cloud" 
            />
          );
        })}
      </div>


        {targetAnimals.map(animal => (
          <div 
          onClick={() => {navigate(`/detail/${animal.id}`)}}
          className="col" 
          key={animal.id} 
          style={{ maxWidth: '400px' }}>
            <AnimalCard animal={animal} />
          </div>
        ))}


      </div>




      
      <div className="mt-5 p-4 border rounded text-center bg-body">
        <h5>더 많은 전설 속 동물들도 곧 찾아옵니다!</h5>
      </div>
    </div>
  );
};

export default HaetaeHaechi;