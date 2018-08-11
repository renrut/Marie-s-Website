import React, { Component } from 'react';
import Particles from 'react-particles-js';
import {Route} from 'react-router-dom'

import './Pages.css';

class HomePage extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            title: "Marie Armbruster",
            text: "Marie Armbruster ipsum dolor sit amet, consectetur adipiscing elit. Ut non libero et diam vestibulum ullamcorper. Nulla pellentesque eget arcu vitae consequat. Praesent imperdiet venenatis nisi, id bibendum lectus fringilla quis. Donec neque nisi, vulputate nec tellus in, auctor maximus est. Etiam at convallis enim. Etiam vel condimentum ex. Maecenas quis ligula sed."
        }
    }

    buildParticleParams(){
        return {
            particles: {
                particles:{
                    "value": 120
                },

                size: {
                    value: 3,
                    random:true
                },
                line_linked: {
                    enable:false
                },
                move: {
                    speed: 5
                },
                interactivity: {
                    events: {
                        detect_on: "canvas",
                        onhover: {
                            enable: true,
                            mode: "repulse"
                        }
                    }
                }

            }
        }
    }

    resizeParticleWindow(){
        let particles = document.getElementById("particl");
        let homePage = document.getElementById("page-body");
        particles.style.width = homePage.offsetWidth + "px";
        particles.style.height = homePage.offsetHeight + "px";
        var rect = homePage.getBoundingClientRect();
        particles.style.position = "absolute";
        particles.style.top = rect.top + "px";
        particles.style.right = "0px";
    }

    componentDidMount(){
        this.resizeParticleWindow();
    }

    render() {
        let particleparams = this.buildParticleParams();
        return (
            <div className="home-page">
                <div id="particl">
                    <Particles className={"particles-container"} params={particleparams}/>
                </div>
                <div className="home-title-container">
                    <h1 className="home-title">{this.state.title}</h1>
                </div>
                <div className="underline"/>
                <div className="home-text-container">
                    <h1 className="home-title">{this.state.text}</h1>
                </div>
            </div>
        );
    }
}

export default HomePage;
