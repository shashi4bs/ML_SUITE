import React, { Component } from 'react';
import '../bootstrap.min.css';
import '../style.css';

export default class homepage extends Component {
    render() {
        return (
            <div id="welcome-box" className="container">
            <div id="welcometext" className="jumbotron">
                <h1>Welcome to ML-SUITE</h1>
                <p>Now Feel the power of Machine Learning in your browser</p>
                <p>Dive In for an experience never felt before</p>
                <p>Sign Up and Dive In</p>
            </div>
            </div>
        )
    }
}
