import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Modal } from 'react-bootstrap';

function OrderForm({ cart, setCart }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [showModal, setShowModal] = useState(false);

  const safeCart = cart || [];

  const orderTotal = safeCart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      customer: {
        name,
        email,
        address,
      },
      items: safeCart,
      total: orderTotal,
    };

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      console.log('Order response:', data);

      setShowModal(true);

      setName('');
      setEmail('');
      setAddress('');
        setCart([]);
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('There was a problem submitting your order.');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="p-4 shadow-sm">
            <Card.Body>
              <Card.Title className="text-center mb-4">
                Order Request
              </Card.Title>

              {safeCart.length === 0 ? (
                <p className="text-center">Your cart is empty.</p>
              ) : (
                <>
                  {safeCart.map((item) => (
                    <div key={item.id} className="mb-3 pb-3 border-bottom">
                      <p className="mb-1"><strong>{item.name}</strong></p>
                      <p className="mb-1">Price: ${item.price}</p>
                      <p className="mb-1">Quantity: {item.quantity}</p>
                      <p className="mb-0">
                        Line Total: ${item.price * item.quantity}
                      </p>
                    </div>
                  ))}

                  <h4 className="text-center mb-4">
                    Order Total: ${orderTotal}
                  </h4>

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="orderName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="orderEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="orderAddress">
                      <Form.Label>Shipping Address</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <div className="d-grid">
                      <Button type="submit" variant="primary">
                        Submit Order
                      </Button>
                    </div>
                  </Form>
                </>
              )}
            </Card.Body>
          </Card>

<Modal show={showModal} onHide={() => setShowModal(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>Order Submitted</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    Your order was received. I will send a Venmo payment link shortly.
  </Modal.Body>
  <Modal.Footer>
    <Button variant="primary" onClick={() => setShowModal(false)}>
      Close
    </Button>
  </Modal.Footer>
</Modal>



        </Col>
      </Row>
    </Container>
  );
}

export default OrderForm;