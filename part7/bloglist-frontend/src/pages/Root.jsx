import { Link, Outlet, useNavigate } from "react-router-dom";
import Notification from "../components/Notification";
import UserContext, {
  hasUserLoggedInStorage,
  logout
} from "../context/userContext";
import { useContext, useEffect } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

const Root = () => {
  const [userState, dispatchUser] = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatchUser(logout());
  };

  useEffect(() => {
    if (!hasUserLoggedInStorage()) {
      navigate("/login");
    }
  }, [userState, navigate]);

  return (
    <>
      <Navbar expand="lg" className="bg-body-terti">
        <Container>
          <Link className="navbar-brand" to="/">
            Blogs
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {userState && (
                <>
                  <Link className="nav-link" to="/blogs/new">
                    Create Blog
                  </Link>
                  <Link className="nav-link" to="/users">
                    Users
                  </Link>
                  <NavDropdown
                    title={userState.username}
                    id="user-nav-dropdown"
                  >
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
              {!userState && (
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Notification />
        <Outlet />
      </Container>
    </>
  );
};

export default Root;
