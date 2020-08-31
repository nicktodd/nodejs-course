import React, {useEffect} from "react";
import "./App.css";
import TableRow from "./TableRow";
import Create from "./create";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { fetchCDs } from "./actions";

// needed for functional components
import { useSelector, useDispatch } from "react-redux";

function App(props) {

  const cdList = useSelector((state) => state);
  
  const {cds, loading, error} = cdList;
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(fetchCDs());
    return () => {
      //
    };
  }, []);
 
 

  return(
    <>
     {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
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
            <tbody>
            {
            cds.map((cd) => (
              <TableRow obj={cd} />
            ))
            }
              </tbody>
          </table>
        </div>
      </Router>
      )};
      </>
  );
  }


export default App;
