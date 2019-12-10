import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import '../bootstrap.min.css';
import '../style.css';

class login extends Component {
    constructor(){
        super();
        this.state = {
            username: "",
            password: "",
            isAuthenticated: false,
            error: ""
        }
    }

    onChangeUsername = (e) =>{
        this.setState({username: e.target.value});
    }

    onChangePassword = (e) => {
        this.setState({password: e.target.value});
    }

    handleFormSubmit = (e) =>{
        e.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password
        };

        axios.post("http://localhost:4000/login", user).then(
            data=>{
                console.log(data.status);
                if(data.status === 200){
                    console.log("error", this.state.error);
                    this.setState({isAuthenticated: true});
                    //window.location = '/';
                    this.props.login();
                }
            }
        ).catch(err=>{
            console.log(err);
            this.setState({error: "Invalid Passsword"});
        });
    }

    render() {
        
        return (
            <div id="login" className="container wrapper4login">
            <div className="formContent">   
                <h3>Login Form</h3>
                <form onSubmit={this.handleFormSubmit}>
                    <div className="from-group">
                        <input type="name" name="username" placeholder="Username" value={this.state.username} onChange={this.onChangeUsername}/>
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.onChangePassword}/>
                    </div>
                    <div className="form-group">
                        <p style={{color: "red"}}>{this.state.error}</p>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Log In" className="btn btn-primary"/>
                    </div>
                    
                </form>
            </div>
            </div>
        )
        
    }
}

export default withRouter(login);