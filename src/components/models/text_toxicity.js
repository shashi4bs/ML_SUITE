import React, { Component } from 'react';
import * as toxicity from '@tensorflow-models/toxicity';
import toxic from '../../assets/toxic.gif';

export default class text_toxicity extends Component {
    constructor(){
        super();
        this.state={
            name: "",
            model: null,
            text: null,
            description: <button className="btn-success" onClick={this.showDescription}>More</button>,
        }
    }
    threshold = 0.8

    
    handleChange = (e) =>{
        this.setState({text: e.target.value});
        
    }
    analyse = () =>{
        let labels = ["identity_attack", "insult", "obscene", "severe_toxicity", "sexual_explicit", "threat", "toxicity"];
        for(let i in labels)
        document.getElementById(labels[i]).innerHTML = "Loading...";

        toxicity.load(this.threshold).then(model=>{
            let sentence = [this.state.text];
            model.classify(sentence).then(predictions=>{
                console.log(predictions);

                const drawtable = (r) =>{
                    // let res = document.createTextNode(`${r.label} : ${r.results[0].match}   `);
                    // // res.innerHtml = `${r.label} : ${r.results[0].match}`;
                    // console.log(`${r.label} : ${r.results[0].match}`);
                    // result.appendChild(res);
                    document.getElementById(r.label).innerHTML = r.results[0].match;
                }
                // let result = document.getElementById("resultbox");
                // result.innerHTML = "";
                for(let i in labels)
                    document.getElementById(labels[i]).innerHTML = "";
                predictions.map(drawtable);
            })
        })
    }

    hideDescription = () => {
        this.setState({description : <button className="btn-success" onClick={this.showDescription}>More</button>});
    }

    showDescription = () =>{
        this.setState({description : <div>
        <p>The toxicity model detects whether text contains toxic
         content such as threatening language, insults, obscenities, 
         identity-based hate, or sexually explicit language. 
         The model was trained on the civil comments dataset:
          <a href="https://figshare.com/articles/data_json/7376747" target="_blank">https://figshare.com/articles/data_json/7376747 
          </a>which contains ~2 million comments labeled for toxicity. 
          The model is built on top of the Universal Sentence Encoder (Cer et al., 2018).</p>
         <button className="btn-success" onClick={this.hideDescription}>Show Less</button>
         </div>});
    }

    render() {
        let styles = {
            color: "white",
        }
        
        return (
            <div className="container" style={styles}>
            <h2 className="title">Text Toxicity</h2>
            <div className="row">
                <div className="card-body col-md-12 justify-content-center"><img src={toxic} class="logoascontent"/></div>
            </div>
            <div style={{margin: "10px",padding: "3px",}}>
                {this.state.description}
                <a href="https://github.com/tensorflow/tfjs-models/tree/master/toxicity" target="_blank"><button>Learn More</button></a>
            </div>
            
            <div className="row">
                <div className="col-md-8">
                    <textarea rows="4" cols="80" name="text" onChange={this.handleChange}>{this.state.text}</textarea>
                </div>
            </div>
            <div className="row">
                <button onClick={this.analyse}>Analyse</button>
            </div>
            {/* <div id="resultbox" className="row">
            </div> */}
            <table>
                <tr>
                    <th>Identity Attack</th>
                    <th>Insult</th>
                    <th>Obscene</th>
                    <th>Severe Toxicity</th>
                    <th>Sexual Explicit</th>
                    <th>Threat</th>
                    <th>Toxicity</th>
                </tr>
                <tr>
                    <td id="identity_attack"></td>
                    <td id="insult"></td>
                    <td id="obscene"></td>
                    <td id="severe_toxicity"></td>
                    <td id="sexual_explicit"></td>
                    <td id="threat"></td>
                    <td id="toxicity"></td>
                </tr>
            </table>
            </div>
        )
    }
}