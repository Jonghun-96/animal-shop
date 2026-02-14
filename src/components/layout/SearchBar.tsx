import { useState, useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import './SearchBar.css';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchResultList from './SearchResultList';
import { Animal } from '../../types/animal';


type Props = {
  animals: Animal[];
};


function SearchBar({ animals } :Props){

  const navigate = useNavigate();
  const location = useLocation();
  const [keyword, setKeyword] = useState('');
  const wrapperRef = useRef(null);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  
  
  const normalize = (str) =>
  str.toLowerCase().replace(/\s+/g, '');

  const filteredAnimals = keyword 
  ? animals.filter(animal =>
    normalize(animal.name).includes(keyword.toLowerCase())).slice(0, 5) 
  : [];

  const handleSelect = (animal) => {
    navigate(`/detail/${animal.id}`);
    setKeyword('');
    setHighlightIndex(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    navigate(`/search?keyword=${keyword}`);
  };

   // 페이지 이동 시 검색 닫기
  useEffect(() => {
    setKeyword('');
    setHighlightIndex(-1);
  }, [location.pathname]);

  // 외부 클릭 시 검색 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setKeyword('');
        setHighlightIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 키보드 이벤트
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!filteredAnimals.length) return;

      if (e.key === 'ArrowDown') {
        setHighlightIndex((prev) =>
          prev < filteredAnimals.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === 'ArrowUp') {
        setHighlightIndex((prev) =>
          prev > 0 ? prev - 1 : filteredAnimals.length - 1
        );
      } else if (e.key === 'Enter') {
        if (highlightIndex >= 0) {
          const selected = filteredAnimals[highlightIndex];
          navigate(`/detail/${selected.id}`);
          setKeyword('');
          setHighlightIndex(-1);
        }
      } else if (e.key === 'Escape') {
        setKeyword('');
        setHighlightIndex(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredAnimals, navigate, highlightIndex]);

  return(
  <>
    <div ref={wrapperRef} className="search-wrapper">

      <Form className="d-flex search-input"
        onSubmit={(e) => {
          e.preventDefault();

          if (!keyword.trim()) return;
          if (highlightIndex !== -1) {
            handleSelect(filteredAnimals[highlightIndex]);
          } else {
            navigate(`/search?keyword=${keyword}`);
          }
        }}
      >
        <Form.Control
          type="search" 
          placeholder="검색어를 입력하세요" 
          value={keyword}
          onChange={(e) => {setKeyword(e.target.value)}}
        />
      </Form>

      <SearchResultList 
        filteredAnimals={filteredAnimals} 
        highlightIndex={highlightIndex}
        onSelect={()=>{setKeyword('')}}
      />

    </div>
  </>
  )
}

export default SearchBar;