import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Quote } from "./pages/Quote";
import { Signin } from "./pages/Signin";

export default function App() {
  return (
    <Router>
      <div className="lg:grid grid-cols-2">
        <Signin/>
        <div className="invisible lg:visible">
          <Quote/>
        </div>
      </div>
    </Router>
  );
}
