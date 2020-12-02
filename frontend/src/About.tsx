import React from 'react';
import { Container } from 'reactstrap';
import './App.css';
import Sidebar from './Header';


function About() {
    return (
        <Container>
            <col>
                <Sidebar></Sidebar>
            </col>
        </Container>
    );
}

export default About;
