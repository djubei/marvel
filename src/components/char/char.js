import { Component } from "react";


class Char extends Component {
  constructor(props) {
    super(props);
  }


  render() {

    const {id, selected, thumbnail, name, chooseChar} = this.props
    const picture = thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
    const style = picture ? {objectFit: 'contain'} : {objectFit: 'cover'}
    const charSelected = 'char__item char__item_selected'

    return (
      <li
        onClick={ () => chooseChar(id) }
        className={ selected ? charSelected : 'char__item' }
      >
        <img style={ style } src={ thumbnail } alt={ name }/>
        <div className="char__name">{ name }</div>
      </li>
    )
  }

}

export default Char