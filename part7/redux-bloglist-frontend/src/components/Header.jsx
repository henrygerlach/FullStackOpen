import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { revokeUser } from "../reducers/userReducer";

const Header = ({ user }) => {
  const dispatch = useDispatch();

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(revokeUser());
    window.localStorage.removeItem("user");
  };

  return (
    <Navbar expand="md" className="mb-4 rounded-4 themed-navbar" variant="dark">
      <Container fluid className="px-3">
        <Navbar.Brand as={Link} to={"/"} className="fw-semibold">
          Blogs
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/"}>
              Blogs
            </Nav.Link>
            <Nav.Link as={Link} to={"/users"}>
              Users
            </Nav.Link>
          </Nav>
          <div className="d-flex align-items-center gap-3 mt-3 mt-md-0">
            <span className="small text-secondary">{user.name} logged in</span>
            <Button variant="outline-info" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
