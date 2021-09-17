import React from "react";
import "./App.css";
import TableRow from "./TableRow";
import Create from "./create";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { fetchCDs } from "./actions";



function mapStateToProps(state) { 
  console.log(JSON.stringify(state));  
  return { 
      error: state.error,
      loading: state.loading,
      cds: state.cds };
  }
// used in the connect
// allows you to call dispatchers
// without referring to the dispatch function directly
const mapDispatchToProps = {
  fetchCDs
}

class App extends React.Component {

  componentDidMount() {
    // because of mapDispatchToProps, this line is simplified
    //this.props.dispatch(fetchCDs());
    this.props.fetchCDs();
  }
  
 
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
                <th>Title</th>
                <th>Artist</th>
              </tr>
            </thead>
            <tbody>{this.tabRow()}</tbody>
          </table>
        </div>
      </Router>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
