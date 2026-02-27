

import { useSelector } from 'react-redux';
import { selectPopularAnimals } from '../../store/animalsSlice';
import AnimalListPage from '../AnimalListPage';
import { useMemo } from 'react';
import { animals } from '../../data/data'



function Popular() {

  const likes = useSelector(state => state.likes);

  const popular = useMemo(() => {
    return [...animals]
      .sort((a, b) => {
        const likeA = (likes[a.id] || 0) + (a.seedLikes || 0);
        const likeB = (likes[b.id] || 0) + (b.seedLikes || 0);
        return likeB - likeA;
      })
      .slice(0, 12);
  }, [likes]);

  return(
  <>
    <AnimalListPage 
      animals={popular}
      title="인기 많은 친구 TOP 12"
      likes={likes}
      enableMore={false}
      enableSort={true}
    />
  </>
  )
}

export default Popular;