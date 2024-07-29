import React from "react";
import "./App.css";
import Create from "./create";
import Edit from "./Edit";
import CDList from "./CDList";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


function App(props) {


  return(
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={"/create"} className="nav-link">
                    Create CD
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/edit"} className="nav-link">
                    Edit CD
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/list"} className="nav-link">
                    List CDs
                  </Link>
                </li>
                
              </ul>
            </div>
          </nav>{" "}
          <br />
          <h1>CD Manager</h1> <br />
          <Switch>
            <Route exact path="/create" component={Create} />
            <Route path="/index" component={App} />
            <Route path="/edit" component={Edit} />
            <Route path="/list" component={CDList} />
          </Switch>
        </div>
        
      </Router>
      )};
      
  
  


export default App;
