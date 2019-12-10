import React, { Component } from 'react'
import * as mobilenet from '@tensorflow-models/mobilenet';
import '../../bootstrap.min.css';
import img_clf from '../../assets/imageclassifier.gif';

export default class image_classification extends Component {
    constructor(){
        super();
        this.state={
            name: "",
            model: null,
            image: null,
            description: <button className="btn-success" onClick={this.showDescription}>More</button>,
        }
    }
    componentDidMount(){
        console.log('LoadingModel');
        //this.setState({model: this.loadModel(mobilenet)});
        //console.log('Finished Loading Model', this.state.model);
    }

    drawText = (predictions)=>{
        let myCanvas = document.getElementById("myCanvas");
        let context = myCanvas.getContext('2d');
        context.font = "10px Verdana";
        let x = 10 , y=10;
        function write(element){
            context.fillStyle="white";
            context.fillText(element.className, x, y);
            context.fillText(element.probability, x, y+10);
            y+=20;
        }
        predictions.map(write);
    }

    detect = async(image) =>{
        let myCanvas = document.getElementById("myCanvas");
        let context = myCanvas.getContext('2d');
        context.fillStyle = "green";
        context.font = "20px Georgia";
        context.fillText("Loading...", 10, 50);
        let models = await mobilenet.load();
        context.clearRect(0, 0, myCanvas.width, myCanvas.height);
        let predictions = await models.classify(image);
        console.log(predictions);
        this.drawText(predictions);
    }

    handleFileChange = (e) => {
        const img = document.getElementById("image");
        /*img.onload = () => {
        const width = img.width;
        const height = img.height;

        };*/
        img.src = URL.createObjectURL(e.target.files[0]);
        this.setState({image: img});
        console.log(img);
        this.detect(img);
    }


    loadModel = async(name) => await name.load();

    hideDescription = () => {
        this.setState({description : <button className="btn-success" onClick={this.showDescription}>More</button>});
    }

    showDescription = () =>{
        this.setState({description : <div>
        <p>Image classification refers to a process in computer vision that
        can classify an image according to its visual content. For example, 
        an image classification algorithm may be designed to tell if an image contains a human figure or not.
        While detecting an object is trivial for humans, robust image classification is still a
         challenge in computer vision applications</p>
         <button className="btn-success" onClick={this.hideDescription}>Show Less</button>
         </div>});
    }

    render() {
        let styles = {
            color: "white",
        }
        
        

        return (
            <div className="container" style={styles}>
            <h2 className="title">Image Classification</h2>
            <div className="card-body"><img src={img_clf} class="logoascontent"/></div>
            <div style={{margin: "10px",padding: "3px",}}>
                {this.state.description}
                <a href="https://www.tensorflow.org/js/tutorials/transfer/image_classification" target="_blank"><button>Learn More</button></a>
            </div>
            
            <div className="row">
                <div className="col-md-6">
                <figure>
                    <img id="image" style={{width: "100%",height:"100%"}}/>
                    <figcaption>InputImage</figcaption>
                </figure>
                </div>
                <div className="col-md-6">
                <figure>
                    <canvas id="myCanvas" style={{display: "block", width: "100%", height: "100%"}}></canvas>
                    <figcaption>Output Result</figcaption>
                </figure>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <input type="file" id="input" name="upload" onChange={this.handleFileChange}/>
                </div>
            </div>
            </div>
        )
    }
}
