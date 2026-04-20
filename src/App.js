// Import React hooks:
// useState lets this component store and update data
// useEffect lets this component run code after the component loads
import { useEffect, useState } from 'react';

// Import CSS styling for this App component
import './styles/index.css';

import loadingGif from './images/loading_icon.gif';

// Import custom components used in this app
import NavigationBar from './components/NaviBar';
import ProductCard from './components/ProductCard';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import OrderForm from './components/OrderForm';
import ProductDetailPage from './components/DetailPage';
import Footer from './components/Footer';
import InventoryForm from './components/InventoryForm';

// Import layout components from React Bootstrap
import { Container, Row, Modal } from 'react-bootstrap';

// Import routing tools from React Router
// Router wraps the whole app so routes can work
// Routes holds all available pages
// Route defines each individual page path
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  

  // products stores all product data fetched from the backend
  const [products, setProducts] = useState([]);

  // loading tracks whether the app is still fetching product data
  const [loading, setLoading] = useState(true);

  // selectedCategory stores the currently selected product category
  // it starts as 'all', which means show every product
  const [selectedCategory, setSelectedCategory] = useState('all');

  // selectedColor stores the currently selected product color
  // it starts as 'all', which means show every product
  const [selectedColor, setSelectedColor] = useState('all');

  // selectedMaxPrice stores the currently selected maximum price filter
  // it starts as 'all', which means show every product
  const [selectedMaxPrice, setSelectedMaxPrice] = useState('all');

  // selectedSize stores the currently selected product size
  // it starts as 'all', which means show every product
  const [selectedSize, setSelectedSize] = useState('all');

  // selectedCondition stores the currently selected product condition
  // it starts as 'all', which means show every product
  const [selectedCondition, setSelectedCondition] = useState('all');

  // cart stores the items that the user has added to their shopping cart
  // It is initialized from localStorage if available, so the cart contents persist across page reloads
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
  fetch('https://online-store1-0.onrender.com/api/products')
    .then(res => res.json())
    .then(data => {
      setProducts(data);
      setLoading(false); // ← THIS is what closes the modal
    })
    .catch(err => {
      console.error(err);
      setLoading(false); // still close so user isn’t stuck forever
    });
}, []);

  // useEffect runs whenever the cart state changes
  // It saves the current cart to localStorage, so the cart contents persist if the user reloads the page
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // useEffect runs once when the App component first loads
  // because the dependency array [] is empty
  useEffect(() => {
    // Fetch product data from the backend API
    fetch('https://online-store1-0.onrender.com/api/products')
      .then((res) => res.json()) // convert response into JSON
      .then((data) => setProducts(data)) // save fetched products into state
      .catch((err) => console.error('Error fetching products:', err)); // log any fetch errors
  }, []);

  // filteredProducts applies the selected category and color filters to the products list
  // It returns a new array of products that match the selected category and color
  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategory === 'all' ||
      product.category === selectedCategory;

    const colorMatch =
      selectedColor === 'all' ||
      !product.color ||
      product.color.toLowerCase().trim() === selectedColor.toLowerCase().trim();

    const priceMatch =
      selectedMaxPrice === 'all' ||
      product.price <= parseFloat(selectedMaxPrice);

    const sizeMatch =
      selectedSize === 'all' ||
      (product.size &&
        product.size.toLowerCase().trim() === selectedSize.toLowerCase().trim());

    const conditionMatch =
      selectedCondition === 'all' ||
      !product.condition ||
      product.condition.toLowerCase().trim() === selectedCondition.toLowerCase().trim();

    return categoryMatch && colorMatch && priceMatch && sizeMatch && conditionMatch;
  });

  // addToCart handles adding a product to the cart
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);

      if (product.inventory <= 0) return prev;

      if (existing) {
        if (existing.quantity >= product.inventory) {
          return prev;
        }

        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // totalCartItems calculates the total number of items in the cart
  // This is useful for showing a cart badge in the navigation bar
  const totalCartItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // removeFromCart decreases the quantity of a cart item by 1
  const removeFromCart = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item._id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        // After decreasing quantity, remove any item whose quantity is now 0
        .filter((item) => item.quantity > 0)
    );
  };

  // decrementCartItem decreases the quantity of a cart item by 1
  // If quantity reaches 1, removing one more deletes the item from cart
  const decrementCartItem = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);

      if (!existingItem) return prevCart;

      if (existingItem.quantity === 1) {
        return prevCart.filter((item) => item._id !== product._id);
      }

      return prevCart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

  return (
    // Router enables page navigation without reloading the browser
    <Router>
      <div className="d-flex flex-column min-vh-100">
        {/* Navigation bar appears on every page */}
        <NavigationBar
          // Pass the category setter so the nav can change the filter
          setSelectedCategory={setSelectedCategory}
          // Pass total cart item count so the nav can display it
          totalCartItems={totalCartItems}
          // Pass color filter state and setter for color filtering
          selectedColor={selectedColor}
          // Pass the color setter so the nav can change the color filter
          setSelectedColor={setSelectedColor}
          // Pass max price filter state and setter for price filtering
          selectedMaxPrice={selectedMaxPrice}
          // Pass the max price setter so the nav can change the price filter
          setSelectedMaxPrice={setSelectedMaxPrice}
          // Pass size filter state and setter for size filtering
          selectedSize={selectedSize}
          // Pass the size setter so the nav can change the size filter
          setSelectedSize={setSelectedSize}
          // Pass condition filter state and setter for condition filtering
          selectedCondition={selectedCondition}
          // Pass the condition setter so the nav can change the condition filter
          setSelectedCondition={setSelectedCondition}
        />

        {/* Main content area grows to fill available space */}
        <Container className="App flex-grow-1">
          {/* Routes contains all page definitions */}
          <Routes>
            {/* Home page route */}
            <Route
              path="/"
              element={
                <Row>
                  {/* Loop through filteredProducts and render one ProductCard for each */}
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      addToCart={addToCart}
                      cart={cart}
                      decrementCartItem={decrementCartItem}
                    />
                  ))}
                </Row>
              }
            />

            {/* Cart page route */}
            <Route
              path="/cart"
              element={
                <CartPage
                  cart={cart}
                  removeFromCart={removeFromCart}
                />
              }
            />

            {/* Checkout page route */}
            <Route
              path="/checkout"
              element={
                <CheckoutPage
                  cart={cart}
                />
              }
            />

            {/* Order form page route */}
            <Route
              path="/order"
              element={
                <OrderForm
                  cart={cart}
                  setCart={setCart}
                />
              }
            />

            {/* Product detail page route */}
            <Route
              path="/product/:id"
              element={
                <ProductDetailPage
                  addToCart={addToCart}
                />
              }
            />

            {/* Admin page route */}
            <Route
              path="/admin"
              element={<InventoryForm />}
            />
          </Routes>
          <Modal show={loading} centered backdrop="static" keyboard={false}>
  <Modal.Body style={{ textAlign: 'center' }}>
    <p>Waking up the server… this can take up to a minute.</p>
    <p>Loading inventory...</p>
    <p><img src={loadingGif} alt="Loading..." /></p>
  </Modal.Body>
</Modal>
        </Container>

        {/* Footer appears on every page and stays at bottom on short pages */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;