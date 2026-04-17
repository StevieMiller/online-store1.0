import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';

function ProductDetailPage({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://online-store1-0.onrender.com/api/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Product not found');
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => {
        console.error('Error fetching product:', err);
      });
  }, [id]);

  if (!product) {
    return (
      <Container className="my-4">
        <p>Loading product...</p>
      </Container>
    );
  }

  const isOutOfStock = product.inventory <= 0;
  const productImages = product.images?.slice(0, 4) || [];

  return (
    <Container className="my-4">
      <Card className="p-4">
        <Row className="align-items-start justify-content-center">
          <Col md={5} className="mb-4 mb-md-0">
            {productImages.length > 0 ? (
              <Row>
                {productImages.map((img, index) => (
                  <Col xs={6} className="mb-3" key={index}>
                    <a href={img} target="_blank" rel="noopener noreferrer">
                      <Card.Img
                        src={img}
                        alt={`${product.name} view ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '450px',
                          objectFit: 'cover',
                          cursor: 'pointer'
                        }}
                      />
                    </a>
                  </Col>
                ))}
              </Row>
            ) : (
              <p>No images available.</p>
            )}
          </Col>

          <Col md={5}>
            <Card.Body>
              <Card.Title as="h2">{product.name}</Card.Title>

              <Card.Text>
                <strong>Price:</strong> ${product.price}
              </Card.Text>

              <Card.Text>
                <strong>Condition:</strong> {product.condition}
              </Card.Text>

              <Card.Text>
                <strong>Description:</strong> {product.description}
              </Card.Text>

              {product.color && (
                <Card.Text>
                  <strong>Color:</strong> {product.color}
                </Card.Text>
              )}

              {product.size && (
                <Card.Text>
                  <strong>Size:</strong> {product.size}
                </Card.Text>
              )}

              {product.category && (
                <Card.Text>
                  <strong>Category:</strong> {product.category}
                </Card.Text>
              )}

              {isOutOfStock ? (
                <p style={{ color: 'red', fontWeight: 'bold' }}>Out of Stock</p>
              ) : (
                <button
                  className="addtocart"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              )}
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default ProductDetailPage;