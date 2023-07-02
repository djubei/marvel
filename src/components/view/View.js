const View = ({char, picture}) => {
  const {
    name,
    description,
    thumbnail,
    homepage,
    wiki
  } = char

  const style = picture ? {objectFit: 'contain'} : {objectFit: 'cover'}
  return (
    <div className="randomchar__block">
      <img style={ style } src={ thumbnail } alt="Random Character" className="randomchar__img"/>
      <div className="randomchar__info">
        <p className="randomchar__name">{ name }</p>
        <p className="randomchar__descr">
          { description }
        </p>
        <div className="randomchar__btns">
          <a target={ "_blank" } href={ homepage } className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a target={ "_blank" } href={ wiki } className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>

  )
}

export default View