import React, { Component } from 'react'
import * as posenet from '@tensorflow-models/posenet';
import '../../bootstrap.min.css';
import '../../style.css';
import pose from '../../assets/posenet.jpeg';


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

    

    detect = async(image) =>{
        async function estimatePoseOnImage(imageElement) {
            // load the posenet model from a checkpoint
            const net = await posenet.load();
          
            const pose = await net.estimateSinglePose(imageElement, {
              flipHorizontal: false
            });
            return pose;
          }
        //let models = await posenet.load();
        //let predictions = await models.classify(image); 
        estimatePoseOnImage(image).then(function(pose){
            console.log(pose);
            const drawPose = (image, pose)=>{
                let img = new Image();
                img.src = image.src;
                let myCanvas = document.getElementById("myCanvas");
                let context = myCanvas.getContext('2d');
                myCanvas.height = img.height;
                myCanvas.width = img.width;
                context.drawImage(image, 0, 0);
                function drawDot(p){
                    let point = p.position;
                    context.strokeStyle = "red";
                    let y = (point.y/image.height)*myCanvas.height;
                    let x = (point.x/image.width)*myCanvas.width;
                    context.beginPath(x, y);
                    context.arc(x, y, 10, 0, Math.PI * 2, true);
                    context.fill();
                }

                function drawLine(p1, p2){
                    let point1 = p1.position, point2 = p2.position;
                    let y1 = (point1.y/image.height)*myCanvas.height, y2 = (point2.y/image.height)*myCanvas.height;
                    let x1 = (point1.x/image.width)*myCanvas.width, x2 = (point2.x/image.width)*myCanvas.width;
                    context.lineWidth = 15;
                    console.log(x1, x2);
                    context.beginPath();
                    context.moveTo(x1, y1);
                    context.lineTo(x2, y2);
                    context.stroke();
                }
                pose.keypoints.map(drawDot)
                let connectedPose = pose.keypoints.splice(5);
                console.log(connectedPose);
                drawLine(connectedPose[0], connectedPose[1]);
                drawLine(connectedPose[0], connectedPose[2]);
                drawLine(connectedPose[2], connectedPose[4]);
                drawLine(connectedPose[1], connectedPose[3]);
                drawLine(connectedPose[3], connectedPose[5]);
                drawLine(connectedPose[6], connectedPose[7]);
                drawLine(connectedPose[6], connectedPose[8]);
                drawLine(connectedPose[8], connectedPose[10]);
                drawLine(connectedPose[7], connectedPose[9]);
                drawLine(connectedPose[9], connectedPose[11]);
                //joining mid body
                
                let x1 = (connectedPose[0].position.x + connectedPose[1].position.x)/2;
                let y1 = (connectedPose[0].position.y + connectedPose[1].position.y)/2;
                let x2 = (connectedPose[6].position.x + connectedPose[7].position.x)/2;
                let y2 = (connectedPose[6].position.y + connectedPose[7].position.y)/2;
                y1 = (y1/image.height)*myCanvas.height;
                y2 = (y2/image.height)*myCanvas.height;
                x1 = (x1/image.width)*myCanvas.width;
                x2 = (x2/image.width)*myCanvas.width;
                context.beginPath();
                context.moveTo(x1, y1);
                context.lineTo(x2, y2);
                context.stroke();
            }
            drawPose(image, pose);
        });
    }

    handleFileChange = (e) => {
        const img = document.getElementById("image");
        /*img.onload = () => {
        const width = img.width;
        const height = img.height;

        };*/
        img.src = URL.createObjectURL(e.target.files[0]);
        this.setState({image: img});
        let myCanvas = document.getElementById("myCanvas");
        let context = myCanvas.getContext('2d');
        context.fillStyle = "green";
        context.font = "20px Georgia";
        context.fillText("Loading...", 10, 50);
        this.detect(img);
    }


    loadModel = async(name) => await name.load();


    hideDescription = () => {
        this.setState({description : <button className="btn-success" onClick={this.showDescription}>More</button>});
    }

    showDescription = () =>{
        this.setState({description : <div>
        <p>PoseNet is a pose estimation model which detects human postures in images and video,
         so that one could determine, for example, where someone’s elbow shows up in an image.
         It can be used to estimate either a single pose or multiple poses.</p>
        <p>PoseNet detects 17 key points to determine human body posture 
        like nose, left-eye, left-ear, left shoulder... etc.</p>
        <button className="btn-success" onClick={this.hideDescription}>Show Less</button>
         </div>});
    }

    render() {
        let styles = {
            color: "white",
        }
        return (
            <div className="container" style={styles}>
                        <h2 className="title">Pose Estimation</h2>
            <div className="row">
                <div className="card-body col-md-12 justify-content-center"><img src={pose} class="logoascontent"/></div>
            </div>
            <div style={{margin: "10px",padding: "3px",}}>
                {this.state.description}
                <a href="https://www.tensorflow.org/lite/models/pose_estimation/overview" target="_blank"><button>Learn More</button></a>
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
