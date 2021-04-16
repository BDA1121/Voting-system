import { render } from "@testing-library/react";
import React,{ Component } from "react";
import {Spring} from 'react-spring'
import Vote from './vote';

export default function About() {
    return (
      <Spring
        from={{ opacity: 0, marginTop: -500 }}
        to={{ opacity: 0, marginTop: 0 }}
      >
        {props => (
          <div style={props}>
              <Vote />
              
          </div>
        )}
      </Spring>
    );
  }

// export default About;