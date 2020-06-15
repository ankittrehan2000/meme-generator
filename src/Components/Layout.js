import React,{useState} from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap"

export default function Layout(props) {

    const [isOpen,setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
 
    return (
        <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">{props.pageName}</NavbarBrand>
        <NavbarToggler onClick={toggle}/>
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/about">{props.link}</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
    )
}
