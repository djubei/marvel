import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';
import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/spinner";
import View from "../view/View";
import Skeleton from "../skeleton/Skeleton";

class CharInfo extends Component {
  constructor(props) {
    super(props);
  }


  render() {


    /* : {
         id,
           name,
           description,
           thumbnail,
           homepage,
           wiki,
           selected,
           comics
       }*/
    const {
      charInfo
    } = this.props


    //console.log(this.state)


    const comicses = charInfo?.comics.map(({name}) => <li key={ name } className="char__comics-item">{ name }</li>)
    const picture = charInfo?.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
    const style = picture ? {objectFit: 'contain'} : {objectFit: 'cover'}
    const abyss = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"

    return (
      !charInfo ? <Skeleton/> :
        <div className="char__info">
          { <div className="char__basics">
            <img style={ charInfo ? style : {objectFit: 'contain'} }
                 src={ charInfo?.thumbnail ? charInfo?.thumbnail : abyss } alt="abyss"/>
            <div>
              <div className="char__info-name">{ charInfo?.name }</div>
              <div className="char__btns">
                <a target="_blank" href={ charInfo?.homepage } className="button button__main">
                  <div className="inner"> Homepage</div>
                </a>
                <a target="_blank" href={ charInfo?.wiki } className="button button__secondary">
                  <div className="inner">Wiki</div>
                </a>
              </div>
            </div>
          </div> }
          <div className="char__descr">
            { charInfo?.description ? charInfo?.description : 'нет данных о персонаже' }
          </div>
          <div className="char__comics">Comics:</div>
          { <ul className="char__comics-list">
            { comicses }
          </ul> }
        </div>
    )
  }
}

export default CharInfo;


export class CharInfo1 extends Component {
  constructor(props) {
    super(props);
  }


  state = {
    char: null,
    loading: false,
    error: {
      errorValue: false,
      errorMsg: null
    }

  }

  marvelService = new MarvelService()

  updateChar = () => {
    const {charId} = this.props
    if (!charId) {
      return
    }
    this.onCharLoading()
    this.marvelService.getCharacter(charId)
      .then(this.onCharLoaded)
      .catch(this.onError)

  }

  onCharLoaded = (char) => {
    this.setState({
      char, // эквивалентно char:char
      loading: false,
      error: {
        errorValue: false,
        errorMsg: null
      }
    })
  }

  onCharLoading = () => {
    // console.log('update')
    this.setState({
      loading: true
    })
  }

  onError = (errorMsg) => {
    this.setState({
      loading: false,
      error: {
        errorValue: true,
        errorMsg: errorMsg
      }

    })
  }

  componentDidMount() {
    this.updateChar()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.charId !== prevProps.charId) {
      this.updateChar()
    }
  }

  /*componentDidCatch(error, errorInfo) {
    console.log(errorInfo, error)
    this.setState({
      error: {
        errorValue: true
      }
    })
  }*/

  render() {


    /* : {
         id,
           name,
           description,
           thumbnail,
           homepage,
           wiki,
           selected,
           comics
       }*/
    const {
      charInfo
    } = this.props


    const
      {
        char, loading, error: {errorValue, errorMsg}

      } = this.state


    //console.log(this.state)


    const comicses = charInfo?.comics.map(({name}) => <li key={ name } className="char__comics-item">{ name }</li>)
    const picture = charInfo?.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
    const style = picture ? {objectFit: 'contain'} : {objectFit: 'cover'}
    const abyss = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"


    const skeleton = char || errorValue || loading ? null : <Skeleton/>
    const errorMessage = errorValue ? <ErrorMessage errorMsg={ errorMsg }/> : null
    const spinner = loading ? <Spinner/> : null
    const view = (errorValue || loading || !char) ? null : <View1 charInfo={ char }/>

    return (
      <div className="char__info">
        { skeleton }
        { errorMessage }
        { spinner }
        { view }
      </div>
    )
  }
}

export const View1 = ({charInfo}) => {


  let {name, description, thumbnail, homepage, wiki, comics} = charInfo


  let comicses = comics.map(({name}, i) => {
    if (i > 9) {
      return
    }
    return (
      <li key={ name } className="char__comics-item">{ name }</li>
    )
  })
  comicses = comicses.length === 0 ? 'У данного персонажа нет комиксов' : comicses
  const picture = charInfo?.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  const style = picture ? {objectFit: 'contain'} : {objectFit: 'cover'}
  const abyss = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  return (
    <>
      { <div className="char__basics">
        <img style={ style }
             src={ thumbnail } alt="abyss"/>
        <div>
          <div className="char__info-name">{ name }</div>
          <div className="char__btns">
            <a target="_blank" href={ homepage } className="button button__main">
              <div className="inner"> Homepage</div>
            </a>
            <a target="_blank" href={ wiki } className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div> }
      <div className="char__descr">
        { description ? description : 'нет данных о персонаже' }
      </div>
      <div className="char__comics">Comics:</div>
      { <ul className="char__comics-list">
        { comicses.length === 0 ? 'У данного персонажа нет комиксов' : null }
        { comicses }
      </ul> }
    </>
  )
}