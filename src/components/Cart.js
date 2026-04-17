// Import Button component for styling the remove button
import { Button } from 'react-bootstrap';

// Cart component receives:
// - cart: array of items currently in the cart
// - removeFromCart: function to remove/decrement items
function Cart({ cart, removeFromCart }) {

  // Calculate the total cost of the entire cart
  // For each item: price * quantity, then sum all values
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      {/* Section title */}
      <h2>Shopping Cart</h2>

      {/* Conditional rendering:
          If cart is empty → show message
          Otherwise → show cart items */}
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>

          {/* Loop through each item in the cart */}
          {cart.map((item) => (
            <div key={item._id} className='mb-4'>
              
              {/* Product name */}
              <div>{item.name}</div>

              {/* Price per single item
                  toFixed(2) ensures 2 decimal places for currency */}
              <div>Price: ${item.price.toFixed(2)}</div>

              {/* Quantity of this item */}
              <div>Quantity: {item.quantity}</div>

              {/* Total price for this specific item (line total) */}
              <div>
                Line Total: ${(item.price * item.quantity).toFixed(2)}
              </div>

              {/* Remove button:
                  Calls removeFromCart with the item's id */}
              <Button
                variant="danger"
                onClick={() => removeFromCart(item._id)}
              >
                Remove
              </Button>
            </div>
          ))}

          {/* Display total cost of all items in the cart */}
          <h3>Cart Total: ${cartTotal.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
}

// Export so it can be used elsewhere in the app
export default Cart;