import React, { Component } from 'react'
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '../../bootstrap.min.css';
import obj_detect from '../../assets/object_detection.gif';
import loading from '../../assets/loading.jpg';
// import * as gifler from 'gifler';
// import * as konva from 'konva';

export default class object_detection extends Component {
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
    }

    drawImage = (image, predictions=null) => {
        if(predictions){
            let img = new Image();
            img.src = image.src;
            let myCanvas = document.getElementById("myCanvas");
            let context = myCanvas.getContext('2d');
            myCanvas.height = img.height;
            myCanvas.width = img.width;
            context.drawImage(image, 0, 0);
            function drawBox(box){
                let dim = box.bbox;
                context.beginPath();
                context.lineWidth = "5";
                context.strokeStyle = "green";
                dim[0] = (dim[0]/image.height)*myCanvas.height;
                dim[1] = (dim[1]/image.height)*myCanvas.height;
                dim[2] = (dim[2]/image.height)*myCanvas.height;
                dim[3] = (dim[3]/image.height)*myCanvas.height;
                context.rect(dim[0], dim[1], dim[2], dim[3]);
                context.stroke();
                context.font = '25px serif';
                context.fillText(box.class, dim[0], dim[1]+dim[3]/2+10);
                context.fillText(box.score, dim[0], dim[1]+dim[3]/2+50);
            }
            predictions.map(drawBox);
        }else{
            console.log('called');
            let img = new Image();
            img.src = image.src;
            let myCanvas = document.getElementById("myCanvas");
            let context = myCanvas.getContext('2d');
            // myCanvas.height = 100;
            // myCanvas.width = 100;
            context.drawImage(image, 0, 0);
            context.fillStyle = "green";
            context.font = "20px Georgia";
            context.fillText("Loading...", 10, 50);
        }
    }

    detect = async(image) =>{
        console.log('Loading Model');
        let img = new Image();
        img.src = loading;
        this.drawImage(img);
        let models = await cocoSsd.load();
        console.log('Processing');
        let predictions = await models.detect(image);
        console.log('Predictions: ',predictions);
        this.drawImage(image, predictions);
    }

    handleFileChange = (e) => {
        const img = document.getElementById("image");
        /*img.onload = () => {
        const width = img.width;
        const height = img.height;

        };*/
        img.src = URL.createObjectURL(e.target.files[0]);
        this.setState({image: img});
        this.detect(img);
    }


    loadModel = async(name) => await name.load();
    hideDescription = () => {
        this.setState({description : <button className="btn-success" onClick={this.showDescription}>More</button>});
    }

    showDescription = () =>{
        this.setState({description : <div>
        <p>object detection model helps to identify the location of an object in the image.
         It will output the coordinates of the location of an object with respect to the image.
            It is widely used in computer vision task such as face detection,
             face recognition, video object co-segmentation.</p>
             <button className="btn-success" onClick={this.hideDescription}>Show Less</button>
         </div>});
    }
    render() {
        let styles = {
            color: "white",
        }
        return (
            <div className="container" style={styles}>
             <div className="row">
            <div className="col-md-4">
                <h2 className="title">Object Detection</h2>
            </div>
            {/* <div className="col-md-3">
            <a href="https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd" target="_blank"><button>Learn More</button></a>
            </div> */}
            </div>
            <div className="card-body"><img src={obj_detect} class="logoascontent"/></div>
            <div style={{margin: "10px",padding: "3px",}}>
                {this.state.description}
                <a href="https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd" target="_blank"><button>Learn More</button></a>
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
