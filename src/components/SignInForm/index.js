import {Component} from 'react'
import './index.css'

class SignInForm extends Component {
  state = {
    email: '',
    password: '',
    showEmailError: false,
    showPasswordError: false,
    isFormSubmitted: false,
  }

  validateEmail = () => {
    const {email} = this.state

    return email !== ''
  }

  validatePassword = () => {
    const {password} = this.state

    return password !== ''
  }

  onBlurEmail = () => {
    const isValidEmail = this.validateEmail()

    this.setState({showEmailError: !isValidEmail})
  }

  onBlurPassword = () => {
    const isValidPassword = this.validatePassword()

    this.setState({showPasswordError: !isValidPassword})
  }

  onChangeEmail = event => {
    const {target} = event
    const {value} = target

    this.setState({
      email: value,
    })
  }

  onChangePassword = event => {
    const {target} = event
    const {value} = target

    this.setState({
      password: value,
    })
  }

  onClickGetStartedResponse = () => {
    this.setState(prevState => ({
      isFormSubmitted: !prevState.isFormSubmitted,
      email: '',
      password: '',
    }))
  }

  getStartedForm = event => {
    event.preventDefault()
    const isValidEmail = this.validateEmail()
    const isValidPassword = this.validatePassword()

    if (isValidEmail && isValidPassword) {
      this.setState({isFormSubmitted: true})
    } else {
      this.setState({
        showEmailError: !isValidEmail,
        showPasswordError: !isValidPassword,
        isFormSubmitted: false,
      })
    }
  }

  renderEmailField = () => {
    const {email, showEmailError} = this.state
    const errorHighlight = showEmailError ? 'error-field' : ''

    return (
      <>
        <input
          type="text"
          id="email"
          className={`email-input-field ${errorHighlight}`}
          value={email}
          placeholder="Email address"
          onChange={this.onChangeEmail}
          onBlur={this.onBlurEmail}
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {password, showPasswordError} = this.state
    const errorHighlight = showPasswordError ? 'error-field' : ''

    return (
      <div className="password-field">
        <input
          type="text"
          id="password"
          className={`password-input-field ${errorHighlight}`}
          value={password}
          placeholder="Password"
          onChange={this.onChangePassword}
          onBlur={this.onBlurPassword}
        />
        <a href="forgot password" className="forgot-text">
          Forgot Password?
        </a>
      </div>
    )
  }

  renderSignInReport = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        alt="success"
        className="success-image"
      />
      <p>Sign In Successfully</p>
    </>
  )

  renderSignInForm = () => {
    const {showEmailError, showPasswordError} = this.state

    return (
      <form className="form-container" onSubmit={this.getStartedForm}>
        <div className="input-container">{this.renderEmailField()}</div>
        {showEmailError && <p className="error-message">Required</p>}
        {this.renderPasswordField()}
        {showPasswordError && <p className="error-message">Required</p>}
        <div className="checkbox-container">
          <input type="checkbox" className="checkbox" id="keep-me-signed-in" />
          <label className="signed-in" htmlFor="keep-me-signed-in">
            Keep me signed in
          </label>
        </div>
        <button type="submit" className="get-started-button">
          Get Started
        </button>
      </form>
    )
  }

  render() {
    const {isFormSubmitted} = this.state

    return (
      <div className="sign-in-form-container">
        <div className="container">
          <h1 className="form-title">Sign In</h1>
          <h1 className="details-text">Enter your account details below</h1>
          {isFormSubmitted
            ? this.renderSignInReport()
            : this.renderSignInForm()}
          <h1 className="account-text">
            Don't have an account?
            <span className="create-text">create for free</span>
          </h1>
        </div>
      </div>
    )
  }
}

export default SignInForm
