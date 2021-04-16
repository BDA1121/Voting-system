import { render } from "@testing-library/react";
import React,{ Component } from "react";
import homepic from '.././images/home.jpg';

class Contact extends React.Component {
  constructor(props) {
    super(props)
    this.state = { term: ''}
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }
  
  onFormSubmit(event) {
    event.preventDefault();

    console.log(this.state.term);
  }
  
  render() {
    return (
      <div>
        <div >
          <h1 className="welcome">Welcome</h1>
        </div>
        <div className="flex">
          <div className="image-home">
            <img src={homepic} />
          </div>
          <div className="ui segment container">
            <h1 className="Login">
              Login
            </h1>
            <form onSubmit={this.onFormSubmit} className="ui form">
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

export default Contact;