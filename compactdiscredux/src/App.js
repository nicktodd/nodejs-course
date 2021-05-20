import React from "react";
import "./App.css";
import TableRow from "./TableRow";
import axios from "axios";
import Create from "./create";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';


function mapStateToProps(state) { 
    return { cds: state.cds };
  }

class App extends React.Component {
  /*constructor(props) {
    super(props);
    this.state = { cds: [] };
  }*/

  /*async componentDidMount() {
    axios
      .get("http://localhost:8081/albums")
      .then(response => {
        console.log(response.data);
        this.setState({ cds: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }*/

  tabRow() {
    console.log(JSON.stringify(this.props));
    return this.props.cds.map(function(object, i) {
      return <TableRow obj={object} key={i} />;
    });
  }

  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={"/"} className="navbar-brand">
              List CDs
            </Link>
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
              </ul>
            </div>
          </nav>{" "}
          <br />
          <h1>CD Manager</h1> <br />
          <Switch>
            <Route exact path="/create" component={Create} />
            <Route path="/index" component={App} />
          </Switch>
        </div>
        <div className="App">
          <h1>Here are my CDs!</h1>
          <table border="1" width="80%">
            <thead>
              <tr>
                <th>Artist</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>{this.tabRow()}</tbody>
          </table>
        </div>
      </Router>
    );
  }
}
export default connect(mapStateToProps)(App);
