import img from './error.gif' // альтернативный вариант

const ErrorMessage = ({errorMsg}) => {
  return (
    <div style={ {
      display: 'flex',
      flexDirection: 'column-reverse',
      alignItems: 'stretch'
    } }>
      <h2 style={ {textAlign: 'center'} }>{ errorMsg.message }</h2>
      <img
        style={ {display: 'block', width: 250, height: 250, objectFit: 'contain', margin: "0 auto"} }
        src={ process.env.PUBLIC_URL + '/error.gif' } alt="error"/>

    </div>


  )
}

export default ErrorMessage