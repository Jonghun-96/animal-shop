import { React } from 'react';
import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import './SortDropDown.css';


type SortType = 'popular' | 'low' | 'high';

type Props = {
  sortType: SortType;
  setSortType: React.Dispatch<React.SetStateAction<SortType>>;
};


function SortDropdown({ sortType, setSortType } :Props){

  const getSortLabel = () => {
    if (sortType === 'popular') return '인기순';
    if (sortType === 'low') return '가격 낮은 순';
    if (sortType === 'high') return '가격 높은 순';
    return '정렬 선택';
  };


  return(

  <Dropdown as={ButtonGroup} className="mb-3">

    <Button variant="secondary">{getSortLabel()}</Button>
    <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" />

    <Dropdown.Menu>
      <Dropdown.Item 
        onClick={() => setSortType('popular')}
        active={sortType === 'popular'}
      >
        인기순
      </Dropdown.Item>

      <Dropdown.Item 
        onClick={() => setSortType('low')}
        active={sortType === 'low'}
      >
        가격 낮은 순
      </Dropdown.Item>

      <Dropdown.Item 
        onClick={() => setSortType('high')}
        active={sortType === 'high'}
      >
        가격 높은 순
      </Dropdown.Item>
      
    </Dropdown.Menu>

  </Dropdown>

  )
}

export default SortDropdown;
