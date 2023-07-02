import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";


class ErrorBoundary extends Component {

  state = {
    error: false
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo)
    this.setState({
      error: true
    })

  }

/*  static getDerivedStateFromError(error) {
    return {error: true}
  }*/

  render() {

    let error = {
      message: 'error'
    }
    if (this.state.error) {
      return (<ErrorMessage errorMsg={ error }/>)
    }
    return this.props.children // это компонент переданный во внутрь компонента errorboundary
  }

}

export default ErrorBoundary