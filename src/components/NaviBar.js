import { Container, Navbar, Nav, NavDropdown, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavigationBar({
  setSelectedCategory,
  selectedCategory,
  totalCartItems,
  filters,
  setFilters,
}) {
  const categories = [
    { name: 'All Products', value: 'all' },
    { name: 'Tops', value: 'tops' },
    { name: 'Bottoms', value: 'bottoms' },
    { name: 'Dresses', value: 'dresses' },
    { name: 'Outerwear', value: 'outerwear' },
    { name: 'Shoes', value: 'shoes' },
    { name: 'Accessories', value: 'accessories' },
    { name: 'Home Goods', value: 'homegoods' },
  ];

  const filterConfigs = [
    {
      key: 'condition',
      options: [
        { label: 'All Conditions', value: 'all' },
        { label: 'New', value: 'new' },
        { label: 'Used', value: 'used' },
      ],
    },
    {
      key: 'size',
      options: [
        { label: 'All Sizes', value: 'all' },
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
        { label: 'X-Large', value: 'x-large' },
        { label: 'XX-Large', value: 'xx-large' },
        { label: '0', value: '0' },
        { label: '2', value: '2' },
        { label: '4', value: '4' },
        { label: '6', value: '6' },
        { label: '8', value: '8' },
        { label: '10', value: '10' },
        { label: '12', value: '12' },
        { label: '14', value: '14' },
        { label: '16', value: '16' },
        { label: '18', value: '18' },
        { label: '20', value: '20' },
        { label: '22', value: '22' },
      ],
    },
    {
      key: 'color',
      options: [
        { label: 'All Colors', value: 'all' },
        { label: 'Black', value: 'black' },
        { label: 'Blue', value: 'blue' },
        { label: 'Brown', value: 'brown' },
        { label: 'Gold', value: 'gold' },
        { label: 'Multi', value: 'multi' },
        { label: 'Green', value: 'green' },
        { label: 'Orange', value: 'orange' },
        { label: 'Pink', value: 'pink' },
        { label: 'Purple', value: 'purple' },
        { label: 'Red', value: 'red' },
        { label: 'White', value: 'white' },
      ],
    },
    {
      key: 'maxPrice',
      options: [
        { label: 'All Prices', value: 'all' },
        { label: 'Under $5', value: '5' },
        { label: 'Under $10', value: '10' },
        { label: 'Under $20', value: '20' },
        { label: 'Under $30', value: '30' },
        { label: 'Under $40', value: '40' },
        { label: 'Under $50', value: '50' },
      ],
    },
  ];

  const handleFilterChange = (key, value) => {
    setFilters?.((prev) => ({
      ...(prev || {}),
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setFilters?.({
      condition: 'all',
      size: 'all',
      color: 'all',
      maxPrice: 'all',
    });
  };

return (
  <Navbar bg="light">
<Container>
      {/* LEFT GROUP */}
        <Navbar.Brand as={Link} to="/" className="me-3 mb-0">
          <img
            className="ps-1"
            src="/images/go-logo.png"
            alt="Galactic Outpost Logo"
            height="60"
          />
        </Navbar.Brand>

        <Nav className="me-auto">
          <NavDropdown title="Products" id="basic-nav-dropdown">
  {categories.map((category) => (
    <NavDropdown.Item
      key={category.value}
      onClick={() => setSelectedCategory(category.value)}
      active={selectedCategory === category.value}
    >
      {category.name}
    </NavDropdown.Item>
  ))}
</NavDropdown>
        </Nav>

     

      {/* RIGHT GROUP */}
      <div className="d-flex align-items-center flex-wrap justify-content-end">

        <Button
          variant="outline-secondary"
          className="me-2 mb-2"
          onClick={clearFilters}
        >
          Clear Filters
        </Button>

        {filterConfigs.map((filter) => (
          <Form.Select
            key={filter.key}
            className="me-2 mb-2"
            value={filters?.[filter.key] ?? 'all'}
            onChange={(e) => handleFilterChange(filter.key, e.target.value)}
            style={{ width: '180px' }}
          >
            {filter.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Select>
        ))}

        <Nav>
          <Nav.Link
            as={Link}
            to="/cart"
            className="d-flex align-items-center"
          >
            <img
              src="/images/cart.png"
              alt="Cart"
              height="30"
              className="me-2"
            />
            ({totalCartItems})
          </Nav.Link>
        </Nav>

      </div>

    </Container>
  </Navbar>
);
}

export default NavigationBar;