import React, { Component } from 'react'
import axios from 'axios';

export default class signup extends Component {
    constructor(){
        super();
        this.state = {
            name: "",
            username: "",
            password: "",
            eror: "",
        }
    }

    onChangeUsername = (e) =>{
        this.setState({username: e.target.value});
    }

    onChangePassword = (e) => {
        this.setState({password: e.target.value});
    }

    onChangename = (e) => {
        this.setState({name: e.target.value});
    }

    handleFormSubmit = (e) =>{
        e.preventDefault();
        const user = {
            name: this.state.name,
            username: this.state.username,
            password: this.state.password
        };
        axios.post("http://localhost:4000/signup", user).then(
            data=>{
                console.log(data)
                this.setState({error: data.data});
            }
        );
    }

    render() {
        return (
            <div className="wrapper4login">
            <div className="formContent">
                <h3>SignUp Form</h3>
                <form onSubmit={this.handleFormSubmit}>
                    <div className="from-group">
                        <input type="name" name="name" placeholder="Name" value={this.state.name} onChange={this.onChangename}/>
                    </div>
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
                        <input type="submit" value="SignUp" className="btn btn-primary"/>
                    </div> 
                </form>
            </div>
            </div>
        )
    }
}
