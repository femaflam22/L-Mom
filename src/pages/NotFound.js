import React, { Component } from 'react';
import { Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class NotFound extends Component {
    render() {
        return (
            <div className="mt-4 text-center">
                <h2>Anda belum memesan apapun!</h2>
                <p>silahkan memilih menu dan memesan terlebih dahulu.</p>
                <Button variant="info" as={Link} to="/">
                    menu
                </Button>
            </div>
        )
    }
}
