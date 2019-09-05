import React from "react";
import "./App.css";
import TableRow from "./TableRow";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cds: [] };
  }
  async componentDidMount() {
    axios
      .get("http://localhost:8081/music")
      .then(response => {
        console.log(response.data);
        this.setState({ cds: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  tabRow() {
    return this.state.cds.map(function(object, i) {
      return <TableRow obj={object} key={i} />;
    });
  }

  render() {
    return (
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
    );
  }
}
export default App;
