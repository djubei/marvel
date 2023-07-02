import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo, { CharInfo1 } from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';
import { Component } from "react";
import charInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

/*const App = () => {
  return (
    <div className="app">
      <AppHeader/>
      <main>
        <RandomChar/>
        <div className="char__content">
          <CharList/>
          <CharInfo/>
        </div>
        <img className="bg-decoration" src={ decoration } alt="vision"/>
      </main>
    </div>
  )
}*/

class App extends Component {


  state = {
    showRandomChar: true,
    charInfo: null
  }

  getCharInfo = (char) => {
    //console.log(char)
    this.setState(() => ({
      charInfo: char[0]
    }))

  }

  toggleRandomChar = () => {
    this.setState(({showRandomChar}) => ({
      showRandomChar: !showRandomChar
    }))
  }

  render() {


    return (
      <div className="app">
        <AppHeader/>
        <main>
          { this.state.showRandomChar && <RandomChar/> }
          <button onClick={ this.toggleRandomChar }><h2>Toggle</h2></button>
          <div className="char__content">
            <CharList getCharInfo={ this.getCharInfo }/>
            <CharInfo charInfo={ this.state.charInfo }/>
          </div>
          <img className="bg-decoration" src={ decoration } alt="vision"/>
        </main>
      </div>
    )
  }
}

export default App;


/*const App = () => {
  return (
    <div className="app">
      <AppHeader/>
      <main>
        <RandomChar/>
        <div className="char__content">
          <CharList/>
          <CharInfo/>
        </div>
        <img className="bg-decoration" src={ decoration } alt="vision"/>
      </main>
    </div>
  )
}*/

export class App1 extends Component {


  state = {
    showRandomChar: true,
    charInfo: null,
    selectedChar: null
  }
  /*state={
      selectedChar:null
  }*/

  onCharSelected = (id) => {
    this.setState({
      selectedChar: id,
    })
  }

  getCharInfo = (char) => {
    //console.log(char)
    this.setState(() => ({
      charInfo: char[0]
    }))

  }

  toggleRandomChar = () => {
    this.setState(({showRandomChar}) => ({
      showRandomChar: !showRandomChar
    }))
  }

  render() {


    return (
      <div className="app">
        <AppHeader/>
        <main>
          { this.state.showRandomChar && <RandomChar/> }
          <button onClick={ this.toggleRandomChar }><h2>Toggle</h2></button>
          <div className="char__content">
            <CharList onCharSelected={ this.onCharSelected } getCharInfo={ this.getCharInfo }/>
            <ErrorBoundary>
              <CharInfo1 charId={ this.state.selectedChar } charInfo={ this.state.charInfo }/>
            </ErrorBoundary>
          </div>
          <img className="bg-decoration" src={ decoration } alt="vision"/>
        </main>
      </div>
    )
  }
}

