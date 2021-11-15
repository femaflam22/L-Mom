import React from 'react';
import { Link } from "react-router-dom";
import { Navbar, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faReceipt, faHandSparkles, faHamburger } from '@fortawesome/free-solid-svg-icons';

library.add(faReceipt, faHandSparkles, faHamburger);

const NavbarComponent = () => {
    return ( 
        <Navbar bg="light" className="py-2">
            <Container>
                <Navbar.Brand href="#" className="d-flex justify-content-between">
                    <div className="d-flex">
                        <div className="d-flex align-items-center logo bg-purple">
                            <FontAwesomeIcon icon={faHandSparkles} className="text-white" />
                        </div>
                        <div className="ms-3 d-flex flex-column">
                            <div className="h4">L-Mom</div>
                            <div className="fs-6">masakan ibu</div>
                        </div>
                    </div>
                </Navbar.Brand>
                <Navbar className="justify-content-end">
                <Navbar.Text>
                    <div className="home bg-purple"> 
                        <Link to="/">
                            <FontAwesomeIcon icon={faHamburger} className="text-white" />
                        </Link>
                    </div>
                    <div className="cart bg-purple"> 
                        <Link to="/order">
                            <FontAwesomeIcon icon={faReceipt} className="text-white" />
                        </Link>
                    </div>
                </Navbar.Text>
                </Navbar>
            </Container>
        </Navbar>
    )
}

export default NavbarComponent