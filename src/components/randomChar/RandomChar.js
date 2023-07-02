import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import View from "../view/View";

class RandomChar extends Component {
  constructor(props) {
    super(props);
    // this.updateChar()
    // setInterval(this.updateChar, 3000) даже если мы удаляем со страницы компонент запросы будут проходить
    //так как мы не использовали clearInterval соответственно сет интервал продолжает срабатывать а значит у него
    //есть ссылка на экземпляр объекта (наш компонент) а если ссылка есть значит он не может быть удален
    // и потому запросы удваиваются каждый раз как мы тоглим компонент создается очередной экземпляр
    // это называется утечка памяти
    // двойной запрос на этапе конструктора вызывается из за того что компонет еще не готов
    // и некуда поместить state , после монтирования произойдет DidUpdate 2 раза
    //

    // жизненный цикл компонента состоит из трех этапов
    //1 Компонент появился ComponentDidMount(){}
    //2 Компонент обновился (допустим при передаче нового пропса или изменения state компонента) ComponentDidUpdate(){}
    //3 Удаление компонента ComponentWillUnmount(){}
    //4 Не основной этап Этап ошибки ComponentDidCatch(){}
  }

  state = {
    char: {},
    loading: true,
    error: {
      errorValue: false,
      errorMsg: null
    }

  }

  marvelService = new MarvelService()

  onCharLoaded = (char) => {
    // console.log('update')
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

  updateChar = () => {
    this.onCharLoading()
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
    this.marvelService
      .getCharacter(id)
      .then(this.onCharLoaded) // эквивалентно записи then.(res => this.onCharLoaded(res))
      .catch(this.onError)
  }

  componentDidMount() { // любые обновления или запросы должны проходить в componentDidMount
    this.updateChar()
    //this.timerId = setInterval(this.updateChar, 3000)
    // console.log('didMount')
  }

  componentWillUnmount() {
    // clearInterval(this.timerId)
    //console.log('unMount')
  }

  render() {
    // console.log('render') // происходит после каждого didMount didUpdate

    const
      {
        char, loading, error: {errorValue, errorMsg}

      } = this.state


    //console.log(this.state)


    /*   if (loading) {
         return (
           <Spinner/>
         )
       }*/

    const picture = char.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
    const errorMessage = errorValue ? <ErrorMessage errorMsg={ errorMsg }/> : null
    const spinner = loading ? <Spinner/> : null
    const view = (errorValue || loading) ? null : <View picture={ picture } char={ char }/>


    return (
      <div className="randomchar">
        { spinner }
        { errorMessage }
        { view }
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!<br/>
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">
            Or choose another one
          </p>
          <button onClick={ this.updateChar } className="button button__main">
            <div className="inner">try it</div>
          </button>
          <img src={ mjolnir } alt="mjolnir" className="randomchar__decoration"/>
        </div>
      </div>
    )
  }
}


export default RandomChar;