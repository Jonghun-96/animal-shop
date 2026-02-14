import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './NavBar.css'
import SearchBar from './SearchBar';
import { animals } from '../../data/data'
import { toggleDarkMode } from '../../store/themeSlice';
import ThemeToggleButton from './ThemeToggleButton';
import { getLoginUser, logout } from '../../utils/authStorage';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";



function NavBar() {

  const darkMode = useSelector(state => state.theme.darkMode);
  const navigate = useNavigate();

  const loginUser = getLoginUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  useEffect(() => {
  if (darkMode) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}, [darkMode]);

  return (
  <>
    <Navbar expand="md" className="glass-navbar" fixed="top">
      <Container fluid>

        <Navbar.Brand as={NavLink} to="/">포트폴리오제목</Navbar.Brand>

        {/* 오른쪽 고정 버튼 영역 */}
        <div className="d-flex align-items-center gap-2 ms-auto order-md-3">
          <ThemeToggleButton />

          <NavDropdown
            title={<FaUserCircle size={24} />}
            id="user-dropdown"
            align="end"
          >
            {loginUser ? (
              <>
                <NavDropdown.Header>
                  {loginUser}님
                </NavDropdown.Header>

                <NavDropdown.Item as={NavLink} to="/mypage">
                  마이페이지
                </NavDropdown.Item>

                <NavDropdown.Item onClick={handleLogout}>
                  로그아웃
                </NavDropdown.Item>
              </>
            ) : (
              <>
                <NavDropdown.Item as={NavLink} to="/login">
                  로그인
                </NavDropdown.Item>

                <NavDropdown.Item as={NavLink} to="/signup">
                  회원가입
                </NavDropdown.Item>
              </>
            )}
          </NavDropdown>

          <Navbar.Toggle aria-controls="navbarScroll" />
        </div>

        {/* 메뉴 영역 */}
        <Navbar.Collapse id="navbarScroll" className="order-md-2">
          <Nav className="me-auto nav-text">
            <Nav.Link as={NavLink} to="/special">특별한 친구들</Nav.Link>
            <Nav.Link as={NavLink} to="/popular">인기 많은 친구들</Nav.Link>

            <NavDropdown title="종류별" id="category-dropdown">
              <NavDropdown.Item as={NavLink} to="/category" end>전체 동물</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/category/small">소형 동물</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/category/medium">중형 동물</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/category/large">대형 동물</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/category/bird">새</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <SearchBar animals={animals} />
        </Navbar.Collapse>

      </Container>
    </Navbar>
  </>
  );
}

export default NavBar;