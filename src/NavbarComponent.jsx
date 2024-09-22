
import { Link } from "react-router-dom";
import { Navbar } from "flowbite-react";

export const NavbarComponent = ()=>{
    return(
        <Navbar fluid rounded>
        <Navbar.Brand as={Link} >
          <img src="./8757988.png" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
          
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link href="#" active>
            Login
          </Navbar.Link>
          <Navbar.Link as={Link} href="#">
            About
          </Navbar.Link>
          {/* <Navbar.Link href="#">Services</Navbar.Link>
          <Navbar.Link href="#">Pricing</Navbar.Link> */}
          <Navbar.Link href="#">Contact</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    )
}