import { useState, useMemo } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AnimalCard from '../components/common/AnimalCard';
import SortDropdown from '../components/common/SortDropdown';
import { sortAnimals } from '../utils/sortAnimals';
import './AnimalListPage.css';

function AnimalListPage({
  animals,
  title,
  likes,
  enableSort = true,
  enableMore = false,
  initialCount = 12,
  stepCount = 12,
  maxCount = null
}) {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("default");
  const [visibleCount, setVisibleCount] = useState(initialCount);

  // 정렬된 동물 목록
  const sortedAnimals = useMemo(() => {
    return sortAnimals(animals, sortType, likes);
  }, [animals, sortType, likes]);

  // 보여줄 리스트 계산
  const visibleAnimals = useMemo(() => {
    let list = sortedAnimals;

    // TOP 제한
    if (maxCount !== null) {
      list = list.slice(0, maxCount);
    }

    // 더보기 모드일 때
    if (enableMore) {
      list = list.slice(0, visibleCount);
    }

    return list;
  }, [sortedAnimals, enableMore, visibleCount, maxCount]);

  // 더보기 버튼 표시 여부
  const canShowMore =
    enableMore &&
    visibleAnimals.length <
      (maxCount !== null
        ? Math.min(sortedAnimals.length, maxCount)
        : sortedAnimals.length);

  return (
    <>
      <h3 className="list-title">{title}</h3>

      {enableSort && (
        <SortDropdown sortType={sortType} setSortType={setSortType} />
      )}

      <Row className="componentRow g-4">
        {visibleAnimals.map((animal) => (
          <Col key={animal.id} md={4}>
            <AnimalCard
              animal={animal}
              onClick={() => navigate(`/detail/${animal.id}`)}
            />
          </Col>
        ))}
      </Row>

      {canShowMore && (
        <div className="text-center mt-3">
          <Button
            className="more-btn"
            onClick={() => setVisibleCount((prev) => prev + stepCount)}
          >
            더보기
          </Button>
        </div>
      )}
    </>
  );
}

export default AnimalListPage;