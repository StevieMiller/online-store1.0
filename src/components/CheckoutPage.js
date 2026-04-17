// CheckoutPage receives the cart as a prop from the parent (App component)
// It is responsible for displaying a summary of the order before purchase
function CheckoutPage({ cart }) {

  // Calculate the total cost of all items in the cart
  // For each item: multiply price * quantity, then sum everything together
  const checkoutTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      {/* Page title */}
      <h2>Checkout</h2>

      {/* Simple instruction text */}
      <p>Review your order below.</p>

      {/* Conditional rendering:
          If the cart is empty, show a message
          Otherwise, display all cart items and total */}
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>

          {/* Loop through each item in the cart */}
          {cart.map((item) => (
            <div key={item._id} className="mb-3">
              
              {/* Display product name */}
              <div>{item.name}</div>

              {/* Display how many of this item are in the cart */}
              <div>Quantity: {item.quantity}</div>

              {/* Display total price for this specific item
                  (price * quantity) */}
              <div>Total: ${item.price * item.quantity}</div>
            </div>
          ))}

          {/* Display the full order total (all items combined) */}
          <h3>Order Total: ${checkoutTotal}</h3>
        </div>
      )}
    </div>
  );
}

// Export so it can be used in routing (App.js)
export default CheckoutPage;