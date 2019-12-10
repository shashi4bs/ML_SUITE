import React, { Component } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import {BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import ImageClassifier from './components/models/image_classification';
import ObjectDetection from './components/models/object_detection';
import PoseEstimation from './components/models/pose_estimation';
import SelectModel from './components/select_model';
import TextToxicity from './components/models/text_toxicity';

import HomePage from './components/homepage';
import LoginPage from './components/login';
import SignupPage from './components/signup';

// import video from './assets/sample.mp4';
// import image from './assets/home2.jpg';

export default class App extends Component {
  constructor(){
    super();
    this.state={
      login: false,
    }
  }

  logout = () =>{
    this.setState({login: false});
    //return <Redirect to="/"/>;
  }

  handleLogin = () =>{
    this.setState({login: true});
  }
  render() {
    let body;
    if (this.state.login){
      body = <div>
      <Redirect to="/home"/>
      <Route path="/home" component={SelectModel}/>
      <Route path="/image_classification" component={ImageClassifier}/>
      <Route path="/object_detection" component={ObjectDetection}/>
      <Route path="/pose_estimation" component={PoseEstimation}/>
      <Route path="/text_toxicity" component={TextToxicity}/>

      </div>;
    }else{
      body = <div className="content-warp">
        <Route path='/' component={HomePage}/>
        <Route path='/login' render={(props)=><LoginPage {...props} login={this.handleLogin}/>}/>
        <Route path='/signup' component={SignupPage}/>
      </div>
    }

    return (
      <Router>
      <div id="page-container">
        <Header title="ML-SUITE" login_state={this.state.login} logout={this.logout}/>
        {body}
        {/* <Footer/> */}
      </div>
      </Router>
    );
  }
}
