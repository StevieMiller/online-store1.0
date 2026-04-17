// Import navigation UI components from React Bootstrap
import { Navbar, Nav, Form, Button } from 'react-bootstrap';

// Import Link to enable client-side routing (no full page reload)
import { Link } from 'react-router-dom';

// NavigationBar receives:
// - setSelectedCategory: function to update which products are shown
// - totalCartItems: number used to display cart item count
// - selectedColor: string representing the currently selected color
// - setSelectedColor: function to update the selected color
// - selectedMaxPrice: string representing the currently selected maximum price
// - setSelectedMaxPrice: function to update the selected maximum price
// - selectedSize: string representing the currently selected size
// - setSelectedSize: function to update the selected size
// - selectedCondition: string representing the currently selected condition
// - setSelectedCondition: function to update the selected condition
function NavigationBar({ setSelectedCategory, totalCartItems, selectedColor, setSelectedColor, selectedMaxPrice, setSelectedMaxPrice, selectedSize, setSelectedSize, selectedCondition, setSelectedCondition }) {
  
  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedColor('all');
    setSelectedMaxPrice('all');
    setSelectedSize('all');
    setSelectedCondition('all');
  };
  
  const categories = [
    { name: 'All Products', value: 'all' },
    { name: 'Tops', value: 'tops' },
    { name: 'Bottoms', value: 'bottoms' },
    { name: 'Outerwear', value: 'outerwear' },
    { name: 'Shoes', value: 'shoes' },
    { name: 'Accessories', value: 'accessories' },
    { name: 'Home Goods', value: 'homegoods' }
  ];

  return (

    // Navbar wrapper (expand="lg" means it collapses into a menu on smaller screens)
    <Navbar expand="lg">
      

        {/* Brand/logo section — clicking it routes to home page */}
        <Navbar.Brand as={Link} to="/">
          <img
            className='ps-1'
            src="/images/go-logo.png"
            alt="Galactic Outpost Logo "
            height="60"
          />
        </Navbar.Brand>

        {/* Left-side navigation links (category filters) */}
        <Nav className="me-auto">
  {categories.map((category) => (
    <Nav.Link
      key={category.value}
      as={Link}
      to="/"
      onClick={() => setSelectedCategory(category.value)}
    >
      {category.name}
    </Nav.Link>
  ))}
</Nav>

        <Button variant="outline-secondary" className='me-2' onClick={clearFilters}>
          Clear Filters
        </Button>

        {/* Condition filter dropdown */}
        <Form.Select className='me-2'
  value={selectedCondition}
  onChange={(e) => setSelectedCondition(e.target.value)}
  style={{ maxWidth: '200px' }}
>
  <option value="all">All Conditions</option>
  <option value="new">New</option>
  <option value="used">Used</option>
</Form.Select>

          {/* Size filter dropdown */}
          <Form.Select className='me-2'
  value={selectedSize}
  onChange={(e) => setSelectedSize(e.target.value)}
  style={{ maxWidth: '200px' }}
>
  <option value="all">All Sizes</option>
  <option value="small">Small</option>
  <option value="medium">Medium</option>
  <option value="large">Large</option>
  <option value="x-large">X-Large</option>
  <option value="xx-large">XX-Large</option>
  <option value="0">0</option>
  <option value="2">2</option>
  <option value="4">4</option>
  <option value="6">6</option>
  <option value="8">8</option>
  <option value="10">10</option>
  <option value="12">12</option>
  <option value="14">14</option>
  <option value="16">16</option>
  <option value="18">18</option>
  <option value="20">20</option>
  <option value="22">22</option>
</Form.Select>

        <Form.Select className='me-2'
  value={selectedColor}
  onChange={(e) => setSelectedColor(e.target.value)}
  style={{ maxWidth: '200px' }}
>
  <option value="all">All Colors</option>
  <option value="black">Black</option>
  <option value="blue">Blue</option>
  <option value="brown">Brown</option>
  <option value="gold">Gold</option>
  <option value="multi">Multi</option>
  <option value="green">Green</option>
  <option value="orange">Orange</option>
  <option value="pink">Pink</option>
  <option value="purple">Purple</option>
  <option value="red">Red</option>
</Form.Select>

        <Form.Select className='me-2'
  value={selectedMaxPrice}
  onChange={(e) => setSelectedMaxPrice(e.target.value)}
  style={{ maxWidth: '200px' }}
>
  <option value="all">All Prices</option>
  <option value="30">Under $30</option>
  <option value="50">Under $50</option>
  <option value="100">Under $100</option>
  <option value="200">Under $200</option>
  <option value="500">Under $500</option>
</Form.Select>

        {/* Right-side navigation (cart link) */}
        <Nav>

          {/* Cart link routes to /cart page */}
          <Nav.Link as={Link} to="/cart">

            {/* Cart icon */}
            <img
              src="/images/cart.png"
              alt="Cart"
              height="30"
              className='me-2'
            />

            {/* Display total number of items in cart */}
            ({totalCartItems})
          </Nav.Link>
        </Nav>

      
    </Navbar>
  );
}

// Export so it can be used in App.js
export default NavigationBar;