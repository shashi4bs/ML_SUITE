import React, { Component } from 'react';
import '../bootstrap.min.css';
import {Link} from "react-router-dom";
import obj_detect from '../assets/object_detection.gif';
import posenet from '../assets/posenet.gif';
import img_clf from '../assets/imageclassifier.gif';
import toxic from '../assets/toxic.gif';
// import  * as style  from url('https://fonts.googleapis.com/css?family=Lobster&display=swap');

export default class select_model extends Component {
    constructor(){
        super();
        this.state={
            model_list : [{key:1, name:"Image Classification", link:"/image_classification", gif: img_clf}, 
            {key:2, name:"Object Detection", link:"/object_detection", gif: obj_detect},
            {key:3, name:"Pose Estimation", link:"/pose_estimation", gif: posenet},
            {key:4, name:"Text Toxicity", link:"/text_toxicity", gif:toxic}],
        }
    }

    render() {
        function box(item){
            return (
            <div>
            <div className="card wrapper">
            <div className="card-body" style={{color: "white"}}>{item.name}</div>
                <div className="card-body"><img src={item.gif} class="logo"/></div>
                <Link to={item.link} className="card-footer" style={{color: "#ffff00"}}>{item.name}</Link>
            </div>
            </div>
            );
        }

        return (
            <div className="container">
                <div id="welcometext" className="jumbotron">
                <h1>This is ML-SUITE</h1>
                <p>Select from listed pre-trained Models</p>
                </div>
                <div id="models">
                {this.state.model_list.map(box)}
                </div> 
            </div>
        )
    }
}
