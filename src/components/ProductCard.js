import { Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './../styles/index.css';

function ProductCard({ product, addToCart }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
      <Card className="h-100">
        <div
          className="image-container"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => navigate(`/product/${product._id}`)}
        >
          <img
            src={product.image?.[0]}
            alt={product.name}
            className={`product-image base ${isHovered ? 'fade-out' : ''}`}
          />

          {product.image?.[1] && (
            <img
              src={product.image[1]}
              alt={product.name}
              className={`product-image hover ${isHovered ? 'fade-in' : ''}`}
            />
          )}
        </div>

        <Card.Body>
          <Card.Title
            onClick={() => navigate(`/product/${product._id}`)}
            style={{ cursor: 'pointer' }}
          >
            {product.name}
          </Card.Title>

          <Card.Text>
            ${product.price}<br />
            {product.condition}<br />
          </Card.Text>

          <button
            className="addtocart"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ProductCard;