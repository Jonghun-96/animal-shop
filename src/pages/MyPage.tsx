import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { useNavigate } from "react-router-dom";
import { toggleWish } from "@/store/wishlistSlice";
import { addToCart } from "@/store/cartSlice";
import { FaHeart, FaCartShopping, FaUser, FaCartPlus, FaXmark, FaCircleInfo } from "react-icons/fa6";
import './MyPage.css';


function MyPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);
  
  
  // 1️⃣ [수정] state.cart.items 대신 state.cart를 직접 가져옵니다.
  const cartItems = useSelector((state: RootState) => state.cart) || [];
  const wishlist = useSelector((state: RootState) => state.wishlist) || [];
  const totalCount = cartItems.reduce((sum, item) => sum + (item.count || 1), 0);
  // 총 금액 계산 (item.count가 없을 경우를 대비해 기본값 1 부여)
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * (item.count || 1), 0);
  const loginUser = useSelector(
    (state: RootState) => state.auth.loginUser
  );

  return (
    <Container style={{ marginTop: "120px", marginBottom: "80px", maxWidth: "1050px" }}>
      
      <Card className="border-0 shadow-sm mb-5 bg-white">
        <Card.Body className="d-flex align-items-center p-4 mypage-user">
          <div className="bg-light p-3 rounded-circle me-4">
            <FaUser size={30} className={loginUser ? "text-primary" : "text-secondary"} />
          </div>
          <div>
            {loginUser ? (
              <>
                <h4 className="mb-1 fw-bold">{loginUser}님, 환영합니다! ✨</h4>
                <p className="text-muted mb-0 small">오늘도 즐거운 쇼핑 되세요.</p>
              </>
            ) : (
              <>
                <h4 className="mb-1 fw-bold text-muted">로그인이 필요합니다.</h4>
                <p className="text-danger mb-0 small">
                  <FaCircleInfo className="me-1" /> 로그인하시면 더 많은 기능을 이용하실 수 있어요!
                </p>
              </>
            )}
          </div>
        </Card.Body>
      </Card>

      <Row className="g-4">
        <Col lg={7}>

          {/*  장바구니 섹션 */}
          <Card className="border-0 shadow-sm mb-4 mypage-cart">
            <Card.Header className="bg-white py-3 border-0 d-flex justify-content-between align-items-center mypage-userhead">
              <h5 className="mb-0 fw-bold text-primary"><FaCartShopping className="me-2" />장바구니 상품</h5>
              <Badge bg="primary" pill>{totalCount}</Badge>
            </Card.Header>
            <Card.Body>
              {cartItems.length > 0 ? (
                <div className="cart-list">
                  {cartItems.map((item) => (
                    <div key={item.id} className="d-flex align-items-center mb-3 p-2 border-bottom pb-3">
                      {/* 2️⃣ [주의] 데이터 필드명이 img인지 image인지 확인해서 둘 다 대응 */}
                      <img src={item.img || item.image} alt={item.name} className="rounded" style={{ width: "60px", height: "60px", objectFit: "cover" }} />
                      <div className="ms-3 flex-grow-1">
                        <div className="fw-bold darkmode-white">{item.name}</div>
                        <div className="text-muted small">{item.price.toLocaleString()}원 / {item.count || 1}개</div>
                      </div>
                      <div className="fw-bold text-reset">{(item.price * (item.count || 1)).toLocaleString()}원</div>
                    </div>
                  ))}
                  
                </div>
              ) : (
                <div className="text-center py-5 text-muted">장바구니에 담긴 상품이 없습니다.</div>
              )}
            </Card.Body>
          </Card>

          {/* 관심상품 섹션 */}
          <Card className="border-0 shadow-sm mypage-wish">
            <Card.Header className="bg-white py-3 border-0 mypage-wishhead">
              <h5 className="mb-0 fw-bold text-danger"><FaHeart className="me-2" />찜한 목록</h5>
            </Card.Header>
            <Card.Body>
              {wishlist.length > 0 ? (
                <Row className="g-3">
                  {wishlist.map((item) => (
                    <Col xs={6} md={4} key={item.id}>
                      <Card className="h-100 border-light shadow-none border text-center p-2 mypage-wish">
                        <div className="position-absolute top-0 end-0 p-1 mypage-wishbtn">
                          <Button variant="link" className="text-muted p-0" onClick={() => dispatch(toggleWish(item))}>
                            <FaXmark size={18} />
                          </Button>
                        </div>
                        <Card.Img 
                          variant="top" 
                          src={item.img || item.image} 
                          style={{ height: "90px", objectFit: "cover" }} 
                          className="rounded mb-2"
                        />
                        <div className="small fw-bold text-truncate px-1 mypage-card">{item.name}</div>
                        <div className="text-danger small mb-2">{item.price.toLocaleString()}원</div>
                        
                        <Button 
                          variant="outline-primary" 
                          size="sm" 
                          onClick={() => dispatch(addToCart(item))}
                        >
                          <FaCartPlus className="me-1" /> 담기
                        </Button>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <div className="text-center py-5 text-muted">찜한 상품이 없습니다.</div>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={5}>
          <Card className="border-0 shadow-sm sticky-top" style={{ top: '120px' }}>
            <Card.Body className="p-4 mypage-receipt">
              <h5 className="fw-bold mb-4">전체 주문 요약</h5>
              <div className="d-flex justify-content-between mb-3 text-muted">
                <span>총 아이템 수</span>
                <span>{totalCount}개</span>
              </div>
              <div className="d-flex justify-content-between mb-4 fs-5 fw-bold">
                <span>총 결제 예정액</span>
                <span className="text-primary">{totalPrice.toLocaleString()}원</span>
              </div>
              <hr />

              <Button 
              variant="dark" 
              size="lg" 
              className="w-100 py-3 mb-3 fw-bold" 
              disabled={totalCount === 0}
              onClick={() => navigate("/checkout")}
              >
                결제하러 가기
              </Button>

              <div className="bg-light p-3 rounded mypage-receiptbox">
                <small className="text-muted d-block mb-1 text-center">
                  30,000원 이상 구매 시 배송비 <b>무료</b>!
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>

      </Row>
    </Container>
  );
}

export default MyPage;