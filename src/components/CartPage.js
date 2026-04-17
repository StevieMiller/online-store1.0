// Import UI components from React Bootstrap for layout and styling
import { Button, Row, Col, Image, Container } from 'react-bootstrap';

// Import navigation hook to programmatically change pages
import { useNavigate } from 'react-router-dom';

// CartPage receives:
// - cart: array of items currently in the cart
// - removeFromCart: function to remove/decrement items
function CartPage({ cart, removeFromCart }) {

  // useNavigate allows this component to redirect the user to another route
  const navigate = useNavigate();

  // Calculate total cost of all items in the cart
  // Multiply price * quantity for each item, then sum them
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    // Container keeps content centered and responsive
    <Container>
      {/* Page title */}
      <h2 className="text-center mb-4">Shopping Carttt</h2>

      {/* If cart is empty, show message */}
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <>
          {/* Loop through each cart item and render a row */}
          {cart.map((item) => (
            <Row
              key={item._id} // unique key for React rendering
              className="mb-4 justify-content-center align-items-center g-2"
            >
              {/* Image column */}
              <Col xs="auto">
                {/* Only render image if it exists */}
                {item.image && (
                  <Image
src={item.image?.[0]}                    alt={item.name}
                    style={{ width: '100px' }}
                    rounded // adds rounded corners
                  />
                )}
              </Col>

              {/* Text/details column */}
              <Col xs="auto">
                {/* Product name */}
                <div><strong>{item.name}</strong></div>

                {/* Single item price */}
                <div>${item.price}</div>

                {/* Quantity of this item in cart */}
                <div>Qty: {item.quantity}</div>
              </Col>

              {/* Remove button column */}
              <Col xs="auto">
                <Button
                  variant="danger"
                  // When clicked, remove one quantity of this item
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </Button>
              </Col>
            </Row>
          ))}

          {/* Cart total and checkout button */}
          <div className="text-center mt-4">
            {/* Display total price of all items */}
            <h3>Cart Total: ${cartTotal}</h3>





            {/* Button to navigate to checkout page */}
            <Button
              variant="success"
              onClick={() => navigate('/order')}
              className="mt-2"
            >
              Checkout
            </Button>





          </div>
        </>
      )}
    </Container>
  );
}

// Export so it can be used in routing
export default CartPage;