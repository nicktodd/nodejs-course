import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import axios from "axios";


function reducer(state, action) {
    if (state == undefined) {
       let cds = setInitialState();
       state = {cds : cds}
       //console.log(JSON.stringify(state))
    }
    //console.log('reducer', state, action);
    return state;
  }

function setInitialState() {
    let cds = {};
    //let response = await axios("http://localhost:8081/albums");
    //cds = response.data;
    cds = [{"id":1,"title":"Gold","artist":"Abba","price":12.99,"tracks":12},{"id":3,"title":"Money for Nothing","artist":"Dire Straits","price":7.99,"tracks":13},{"id":4,"title":"True","artist":"Spandau Ballet","price":5.99,"tracks":10},{"id":5,"title":"Justin","artist":"Justin Bieber","price":4.99,"tracks":10},{"id":2,"title":"Californication","artist":"Red Hot Chilli Peppers","price":12.99,"tracks":10}];
    return cds;  
}


const store = createStore(reducer);



ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
