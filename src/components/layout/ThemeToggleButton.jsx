import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../../store/themeSlice';
import './ThemeToggleButton.css';
import { FiSun, FiMoon } from "react-icons/fi";


function ThemeToggleButton(){

    const dispatch = useDispatch();
    const darkMode = useSelector(state => state.theme.darkMode);

  return (
  <>
    <button
      className="theme-toggle-btn"
      onClick={() => dispatch(toggleDarkMode())}
    >
      {darkMode ? <FiSun size={20} /> : <FiMoon size={20}/>}
    </button>
  </>
  )
}

export default ThemeToggleButton;