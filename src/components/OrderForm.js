// Import React state hook for managing form input values and modal visibility
import { useState } from 'react';

// Import layout, form, button, card, and modal components from React Bootstrap
import { Container, Row, Col, Card, Form, Button, Modal } from 'react-bootstrap';

// OrderForm receives:
// - cart: the current items the user wants to order
// - setCart: function used to clear the cart after successful submission
function OrderForm({ cart, setCart }) {
  // Store customer name input
  const [name, setName] = useState('');

  // Store customer email input
  const [email, setEmail] = useState('');

  // Store shipping address input
  const [address, setAddress] = useState('');

  // Controls whether the confirmation modal is visible
  const [showModal, setShowModal] = useState(false);

  // Fallback protection:
  // If cart is ever undefined or null, use an empty array instead
  // so methods like .reduce() and .map() do not crash
  const safeCart = cart || [];

  // Calculate full order total by adding up:
  // item price × item quantity for every item in the cart
  const orderTotal = safeCart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Runs when the user submits the order form
  const handleSubmit = async (e) => {
    // Prevent default browser form refresh behavior
    e.preventDefault();

    // Build the full order object that will be sent to the backend
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
      // Send the order to the backend API
      const response = await fetch('https://online-store1-0.onrender.com/api/orders', {
        method: 'POST',
        headers: {
          // Tell the server we are sending JSON
          'Content-Type': 'application/json',
        },
        // Convert JavaScript object into JSON string for transmission
        body: JSON.stringify(orderData),
      });

      // Parse the server response
      const data = await response.json();

      // Log backend response for debugging / verification
      console.log('Order response:', data);

      // Show success modal after order submission
      setShowModal(true);

      // Clear all form fields after successful submission
      setName('');
      setEmail('');
      setAddress('');

      // Empty the cart so the order page resets cleanly
      setCart([]);
    } catch (error) {
      // Log network/server errors for debugging
      console.error('Error submitting order:', error);

      // Notify the user if the request fails
      alert('There was a problem submitting your order.');
    }
  };

  return (
    // Outer page container with top margin spacing
    <Container className="mt-5">
      {/* Center the card horizontally */}
      <Row className="justify-content-center">
        {/* Limit card width on medium/large screens */}
        <Col md={8} lg={6}>
          {/* Card wraps the full order form UI */}
          <Card className="p-4 shadow-sm">
            <Card.Body>
              {/* Main heading */}
              <Card.Title className="text-center mb-4">
                Order Request
              </Card.Title>

              {/* If cart is empty, show a simple message instead of the form */}
              {safeCart.length === 0 ? (
                <p className="text-center">Your cart is empty.</p>
              ) : (
                <>
                  {/* Loop through all cart items and display an order summary */}
                  {safeCart.map((item) => (
                    <div
                      key={item._id}
                      className="mb-3 pb-3 border-bottom d-flex gap-3 align-items-center"
                    >
                      {/* Show first product image if one exists */}
                      {item.image?.[0] && (
                        <img
                          src={item.image[0]}
                          alt={item.name}
                          style={{ width: '80px', height: 'auto' }}
                        />
                      )}

                      {/* Product text details */}
                      <div>
                        <p className="mb-1"><strong>{item.name}</strong></p>
                          <p className="mb-1">Item Code: {item.sku}</p>
                        <p className="mb-1">Price: ${item.price}</p>
                        <p className="mb-1">Quantity: {item.quantity}</p>
                        <p className="mb-0">
                          Line Total: ${item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Display total cost for the full order */}
                  <h4 className="text-center mb-4">
                    Order Total: ${orderTotal}
                  </h4>

                  {/* Customer information form */}
                  <Form onSubmit={handleSubmit}>
                    {/* Name field */}
                    <Form.Group className="mb-3" controlId="orderName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </Form.Group>

                    {/* Email field */}
                    <Form.Group className="mb-3" controlId="orderEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </Form.Group>

                    {/* Shipping address field */}
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

                    {/* Full-width submit button */}
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

          {/* Success modal shown after order is submitted */}
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