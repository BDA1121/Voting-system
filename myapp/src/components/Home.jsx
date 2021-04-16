import { render } from "@testing-library/react";
import React,{ Component } from "react";
import homepic from '.././images/home.jpg';

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = { term: '', apiResponse:''}
    this.callAPI = this.callAPI.bind(this)
  }
  
callAPI(event) {
    event.preventDefault();
    fetch("http://localhost:3001/blockchain",{
        method:'GET',
        mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache',
    }
    
  )
        .then(res => {
            console.log(res)
        })
        .then(res =>{this.setState({ apiResponse: res });console.log(this.setState.apiResponse)} )
        .catch(res => {
            console.log(res)
        });
        
}
  
  render() {
    return (
      <div>
        <div >
          <h1 className="welcome"></h1>
        </div>
        <div className="flex">
          <div className="image-home">
            <img src={homepic} />
          </div>
          <div className="ui segment container">
            <h1 className="Login">
              Login
            </h1>
            <form onSubmit={this.callAPI} className="ui form">
              <div className="field">
                <input
                  type="text"
                  placeholder="Voter ID"
                  value={this.state.term}
                  onChange={e => this.setState({ term: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Password"
                  value={this.state.term}
                  onChange={e => this.setState({ term: e.target.value })}
                />
                <div className="forgot-password">
                  Forgot Password?
                </div>
                <input 
                  className="login-button"
                  type="submit"
                  value="Login"
                />
                <div className="dont-have">
                  Don't have a Voter Id?
                  <br />
                  <a href="https://www.nvsp.in/account/register">Head to NVSP</a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;