import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import './NavBar.css'
import SearchBar from './SearchBar';
import { animals } from '../../data/data'
import { toggleDarkMode } from '../../store/themeSlice';
import ThemeToggleButton from './ThemeToggleButton';
import { getLoginUser, logout } from '../../utils/authStorage';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { setCart } from "../../store/cartSlice";
import { getCart } from "../../utils/cartStorage"; 
import { clearUser } from '@/store/authSlice';
import { RootState } from '@/store/store';
import { toast } from 'react-hot-toast';
import { clearLike } from '@/store/likesSlice';



function NavBar() {

  const dispatch = useDispatch();
  const darkMode = useSelector((state: any) => state.theme.darkMode);
  const navigate = useNavigate();
  const collapseRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isCollapseOpen, setIsCollapseOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const loginUser = useSelector(
    (state: RootState) => state.auth.loginUser
  );


  const handleLogout = () => {

    dispatch(clearUser());
    dispatch(clearLike());
    localStorage.removeItem("loginUser");

    toast.success("로그아웃 되었습니다. 또 만나요! 👋", {
      icon: '🏃', // 아이콘도 바꿀 수 있어요 (선택사항)
      duration: 2000,
    });

    navigate('/');
  };

  useEffect(() => {
    const userId = getLoginUser();
    dispatch(setCart(getCart(userId)));
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  useEffect(() => {
    function handleClickOutside(e) {
      if (collapseRef.current && !collapseRef.current.contains(e.target)) {
        setIsCollapseOpen(false);
      }
    }
    function handleEsc(e) {
      if (e.key === 'Escape') setIsCollapseOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);



  return (
    <Navbar 
      expand="md" className="glass-navbar" fixed="top" expanded={isCollapseOpen} 
      onToggle={(nextExpanded) => setIsCollapseOpen(nextExpanded)}>
      <Container fluid>

        <Navbar.Brand as={NavLink} to="/">
          <span className='pet-bit'>pet-bit</span>
        </Navbar.Brand>

        {/*  PC용 검색창 */}
        <div className="d-none d-md-block mx-3">
          <SearchBar animals={animals} isSearchOpen={true} />
        </div>

        {/*  오른쪽 버튼 영역 */}
        <div className="d-flex align-items-center gap-2 ms-auto">

          {/*  모바일 검색 아이콘 */}
          <div ref={searchContainerRef} className="d-md-none">
            <button
              className="search-icon"
              onClick={() => setIsSearchOpen(prev => !prev)}
            >
              <IoSearch className={isSearchOpen ? "active" : ""} />
            </button>

            {isSearchOpen && (
              <SearchBar animals={animals} isSearchOpen={isSearchOpen} />
            )}
          </div>

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
                <NavDropdown.Item as={NavLink} to="/mypage">
                  마이페이지
                </NavDropdown.Item>
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
        <Navbar.Collapse ref={collapseRef} in={isCollapseOpen} id="navbarScroll">
          <Nav className="ms-auto nav-text"> 
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
        </Navbar.Collapse>

      </Container>




    </Navbar>
  );
}

export default NavBar;