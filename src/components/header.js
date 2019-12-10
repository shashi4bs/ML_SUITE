import React from 'react';
import { Link } from "react-router-dom";
import '../bootstrap.min.css';
import '../App.css';

// eslint-disable-next-line no-undef
export default class header extends React.Component {
    render() {
        let links;
        if(this.props.login_state){
            links = <button onClick={this.props.logout} className="btn btn-primary float" style={{color:"white"}}>Logout</button>
        }else{
            links = <div className="float">
                <Link to="/login" 
                className="btn btn-primary" 
                style={{color :"white", margin:"10px"}}>
                Login
                </Link>
                <Link to="/signup"
                 className="btn btn-primary"
                  style={{color :"white"}}>
                  SignUp
                  </Link>
            </div>
        }
        return (
            <div>
             <script src="https://unpkg.com/konva@4.0.18/konva.min.js"></script>
    <script src="https://unpkg.com/gifler@0.1.0/gifler.min.js"></script>

            <section 
            className="navbar navbar-expand-lg bg-light"
            style={{backgroundImage:"linear-gradient(to right, #0000ff, #000028)"}}
            >
            <div className="container">
                <div>
                <Link to="/home" className="navbar-brand" style={{fontSize: "20px", fontWeight: "10",}}>{this.props.title}</Link>
                </div>
                {links}
            </div>
            </section>
            </div>
        )
    }
}
