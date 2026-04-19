import { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

function AdminInventoryForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [sizes, setSizes] = useState('');
  const [colors, setColors] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [imagePaths, setImagePaths] = useState('');
  const [inventory, setInventory] = useState('1');
  const [sku, setSku] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage('');
    setError('');

    const productData = {
      name,
      price: Number(price),
      category,
      condition,
      sizes: sizes
        .split(',')
        .map((item) => item.trim())
        .filter((item) => item !== ''),
      colors: colors
        .split(',')
        .map((item) => item.trim())
        .filter((item) => item !== ''),
        brand,
      description,
      images: imagePaths
        .split(',')
        .map((item) => item.trim())
        .filter((item) => item !== ''),
      inventory: Number(inventory),
      sku,
    };

    try {
      const response = await fetch('https://online-store1-0.onrender.com/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create product');
      }

      setMessage('Product added successfully.');
      setError('');

      setName('');
      setPrice('');
      setCategory('');
      setCondition('');
      setSizes('');
      setColors('');
        setBrand('');
      setDescription('');
      setImagePaths('');
      setInventory('1');
      setSku('');
    } catch (err) {
      console.error('Error creating product:', err);
      setError(err.message);
      setMessage('');
    }
  };

  return (
    <Container className="my-4" style={{ maxWidth: '700px' }}>
      <h2 className="mb-4">Admin Inventory Form</h2>

      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="tops, bottoms, outerwear, accessories, homegoods"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Condition</Form.Label>
          <Form.Control
            type="text"
            placeholder="new or used"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Sizes</Form.Label>
          <Form.Control
            type="text"
            placeholder="Small, Medium, Large or 2, 4, 6"
            value={sizes}
            onChange={(e) => setSizes(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Colors</Form.Label>
          <Form.Control
            type="text"
            placeholder="black, silver, cream"
            value={colors}
            onChange={(e) => setColors(e.target.value)}
          />
        </Form.Group>

            <Form.Group className="mb-3">
            <Form.Label>Brand</Form.Label>
            <Form.Control
                type="text"
                placeholder="Brand name"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
            />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image Paths</Form.Label>
          <Form.Control
            type="text"
            placeholder="/images/item1.jpg, /images/item2.jpg"
            value={imagePaths}
            onChange={(e) => setImagePaths(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Inventory</Form.Label>
          <Form.Control
            type="number"
            min="0"
            value={inventory}
            onChange={(e) => setInventory(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>SKU</Form.Label>
          <Form.Control
            type="text"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
          />
        </Form.Group>

        <Button type="submit">Add Product</Button>
      </Form>
    </Container>
  );
}

export default AdminInventoryForm;