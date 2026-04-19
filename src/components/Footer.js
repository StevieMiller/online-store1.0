import { Container } from 'react-bootstrap';
import './../styles/index.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer mt-auto py-4">
      <Container className="text-center">
        <p className="mb-1"><strong>Galactic Outpost</strong></p>

        <p className="mb-1">
          Contact: steviemillercmt@email.com | (575) 236-4475
        </p>

        <p className="mb-1">
          Carlsbad, New Mexico
        </p>

        <p className="mb-0 text-muted">
          © {year} Galactic Outpost. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;