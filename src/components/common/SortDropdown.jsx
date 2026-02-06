import { React } from 'react';
import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';



function SortDropdown({ sortType, setSortType }){



  return(

  <Dropdown as={ButtonGroup} className="mb-3">
    <Button variant="secondary">정렬 선택</Button>
    <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" />

    <Dropdown.Menu>
      <Dropdown.Item onClick={() => setSortType('popular')}>인기순</Dropdown.Item>
      <Dropdown.Item onClick={() => setSortType('low')}>가격 낮은 순</Dropdown.Item>
      <Dropdown.Item onClick={() => setSortType('high')}>가격 높은 순</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>

  )
}

export default SortDropdown;
