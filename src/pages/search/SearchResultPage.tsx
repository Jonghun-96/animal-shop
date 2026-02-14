import { useLocation, useNavigate } from "react-router-dom";
import { animals } from "../../data/data";
import { Container, Row, Col, Card } from "react-bootstrap";
import { searchHighlight } from '../../utils/searchHighlight';
import './SearchResultPage.css';

function SearchResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const keyword = params.get("keyword") || "";

  const filteredAnimals = animals.filter(animal =>
    animal.name.includes(keyword)
  );

  return (
    <Container className="search-container">
      <h4 className="search-title list-title">
        "{keyword}" 검색 결과 ({filteredAnimals.length}개)
      </h4>

      <Row className="mt-4">
        {filteredAnimals.length > 0 ? (
          filteredAnimals.map(animal => (
            <Col md={4} key={animal.id} className="mb-4">
              <Card
                className="search-card"
                onClick={() => navigate(`/detail/${animal.id}`)}
              >
                <Card.Img variant="top" src={animal.img} />

                <Card.Body>

                  <Card.Title className="search-card-title">
                    {searchHighlight(animal.name, keyword)}
                  </Card.Title>
                  <Card.Text className="search-card-price">
                    {animal.price}원
                  </Card.Text>

                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="no-results">검색 결과가 없습니다.</p>
        )}
      </Row>
    </Container>
  );
}

export default SearchResultPage;