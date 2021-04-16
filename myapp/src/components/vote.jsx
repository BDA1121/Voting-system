import { render } from "@testing-library/react";
import React,{ Component } from "react";
import {Spring} from 'react-spring'

class Vote extends React.Component {
    constructor(props) {
        super(props)
        this.state = { totalvote: 10}
        // document.getElementsByTagName('span')[0].textContent = this.state.totalvote;
        this.increaseVote = this.increaseVote.bind(this)
      }
    increaseVote(event){
        if(this.state.totalvote > 0){
             this.state.totalvote--;
            //  document.getElementsByTagName('span')[0].textContent = this.state.totalvote;
             event.target.textContent = Number(event.target.textContent) + 1;
        }
    }
render(){
  return (
      <Spring 
        from={{opacity:1,height:500}}
        to={{opacity:0,marginTop:0}}
        config={{delay:10000,duration:10000}}
      >
          { props => (
              <div style={props}>
                  <div >
        <h1 className="welcome">
            Caste Your Vote (Votes left : <span></span>)
        </h1>
        
        <div className="flex">
            <div class="ui card">
                <div class="image">
                    <img src="/images/avatar2/large/kristy.png" />
                </div>
                <div class="content">
                    <a class="header">Kristy</a>
                    <div class="meta">
                        <span class="date">Joined in 2013</span>
                    </div>
                    <div class="description">
                        Kristy is an art director living in New York.
                    </div>
                </div>
                <div class="extra content">
                    <a>
                        <i class="user icon"></i>
                        0 Friends
                    </a>
                </div>
            </div>

            <div class="ui card">
                <div class="image">
                    <img src="/images/avatar2/large/kristy.png" />
                </div>
                <div class="content">
                    <a class="header">Kristy</a>
                    <div class="meta">
                        <span class="date">Joined in 2013</span>
                    </div>
                    <div class="description">
                        Kristy is an art director living in New York.
                    </div>
                </div>
                <div class="extra content">
                    <a>
                        <i class="user icon"></i>
                        0
                    </a>
                </div>
            </div>

            <div class="ui card">
                <div class="image">
                    <img src="/images/avatar2/large/kristy.png" />
                </div>
                <div class="content">
                    <a class="header">Kristy</a>
                    <div class="meta">
                        <span class="date">Joined in 2013</span>
                    </div>
                    <div class="description">
                        Kristy is an art director living in New York.
                    </div>
                </div>
                <div class="extra content">
                    <a>
                        <div onClick={this.increaseVote}>0</div>
                        
                    </a>
                </div>
            </div>

            <div class="ui card">
                <div class="image">
                    <img src="/images/avatar2/large/kristy.png" />
                </div>
                <div class="content">
                    <a class="header">Kristy</a>
                    <div class="meta">
                        <span class="date">Joined in 2013</span>
                    </div>
                    <div class="description">
                        Kristy is an art director living in New York.
                    </div>
                </div>
                <div class="extra content">
                    <a>
                        <i class="user icon"></i>
                        0 Friends
                    </a>
                </div>
            </div>
        </div>
    </div>
              </div>
          )}
      </Spring>
    );
  }
}

export default Vote;