import React from 'react';
import ReactDOM from 'react-dom';
import App, { App1 } from './components/app/App';
import './style/style.scss';
/*import MarvelService from "./services/MarvelService";


const marv = new MarvelService()
marv.getAllCharacters().then(res => {
//  console.log(res)
})
marv.getCharacter(1011001).then(res => {
  //console.log(res)
})*/


ReactDOM.render(
  <React.StrictMode>
    <App1/>
  </React.StrictMode>,
  document.getElementById('root')
);

