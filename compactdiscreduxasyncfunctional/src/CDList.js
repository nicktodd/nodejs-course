import React, {useEffect} from "react";
import "./App.css";
import TableRow from "./TableRow";
import { fetchCDs } from "./actions";

// needed for functional components
import { useSelector, useDispatch } from "react-redux";

function CDList(props) {

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
      
      )};
      </>
  );
  }


export default CDList;
