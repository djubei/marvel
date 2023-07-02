import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/spinner";
import PropTypes from 'prop-types'
import View from "../view/View";
import Char from "../char/char";


class CharList extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    chars: [],
    loading: true,
    newItemLoading: false,
    offSet: 210,
    error: {
      errorValue: false,
      errorMsg: null
    },
    charEnded: false
  }

  marvelService = new MarvelService()

  onError = (error) => {
    this.setState({
      error: {
        errorValue: true,
        errorMsg: error
      }
    })
  }
  choose = (id) => {
    this.props.getCharInfo(this.state.chars && this.state.chars.filter(char => char.id === id))
    this.setState(({chars}) => ({
      chars: chars.map(char => {
        if (char.id === id) {
          return {...char, selected: true}
        } else return {...char, selected: false}
      })
    }))
  }


  characterList = (offset) => {
    this.onCharListLoading()
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharListLoaded)
      .catch(this.onError)
  }

  onCharListLoading = () => {
    this.setState({
      newItemLoading: true
    })
  }
  onCharListLoaded = (res) => {
    let ended = false
    if (res.length < 9) {
      ended = true
      console.log(this.state.charEnded)
    }

    this.setState(({chars, offSet}) => (
      {
        chars: [...chars, ...res],
        loading: false,
        newItemLoading: false,
        offSet: offSet + 9,
        charEnded: ended
      }
    ))
    console.log(this.state.offSet)
  }

  componentDidMount() {
    this.characterList()

  }


  render() {
    const {getCharInfo} = this.props
    const {chars, loading, newItemLoading, offSet, charEnded, error: {errorValue, errorMsg}} = this.state


    /*    let choosedChar = (id = null) => {
          let b = chars && chars.map(char => {

            if (id && char.id === id) {
              return {...char, selected: true}
            } else {
              return {...char, selected: false}
            }

          })
          console.log(b)
          return b
        }
        let a = choosedChar()*/


    /*    const charSelected = 'char__item char__item_selected'*/

    let charList = chars && chars.map(char => {
        const {id, selected, thumbnail, name} = char
        const picture = char.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
        const style = picture ? {objectFit: 'contain'} : {objectFit: 'cover'}
        const charSelected = 'char__item char__item_selected'

        return (

          /* <Char
             key={ id }
             id={ id }
             selected={ selected }
             thumbnail={ thumbnail }
             name={ name }
             chooseChar={ this.choose }

           />*/
          <li key={ id }
              onClick={ () => {
                this.props.onCharSelected(char.id);
                this.choose(id)
              }
              }
              className={ selected ? charSelected : 'char__item' }
          >
            <img style={ style } src={ thumbnail } alt={ name }/>
            <div className="char__name">{ char.name }</div>
          </li>
        )
      }
    )

    const errorMessage = errorValue ? <ErrorMessage errorMsg={ errorMsg }/> : null
    const spinner = (loading || newItemLoading) ? <Spinner/> : null
    const char = (errorValue || loading || newItemLoading) ? null : charList

    const end = charEnded ? 'display:"none"' : ''


    return (
      <div className="char__list">
        <ul className="char__grid">
          { errorMessage }
          { spinner }
          { char }
        </ul>
        <button style={ {display: charEnded ? "none" : 'block'} } onClick={ () => {
          this.characterList(offSet)
        } } disabled={ newItemLoading } className="button button__main button__long">
          <div className="inner">load more
          </div>
        </button>
      </div>
    )
  }
}

CharList.propTypes = {
  chars: PropTypes.array
}
export default CharList;