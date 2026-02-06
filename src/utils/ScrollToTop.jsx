import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// 페이지 이동시 스크롤 최상단으로 이동하기 위한 파일

function ScrollToTop() {

  const { pathname } = useLocation();

  useEffect(()=>{
    window.scrollTo(0, 0);
  }, [pathname]);

  return null
}

export default ScrollToTop;