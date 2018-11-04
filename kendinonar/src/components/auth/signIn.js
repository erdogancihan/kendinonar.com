import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../../store/actions/authActions";

class SignIn extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
   
    this.props.signIn(this.state);
    this.props.history.goBack();
    
  };

  render() {
    const { authError } = this.props;
    return (
      <div className="container">
        <div className="container signup">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="InputEmail1">Email adresi</label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Email Adresi Giriniz"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="InputPassword1">Şifre</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Şifrenizi Giriniz"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="Check1"
                onChange={this.handleChange}
              />
              <label className="form-check-label" htmlFor="Check1">
                Beni Hatırla
              </label>
            </div>
            <button className="btn btn-secondary m-3">Giriş Yap</button>
            <div className="text-center text-danger">
              {authError ? <p> {authError}</p> : null}
            </div>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    authError: state.auth.authError
  };
};
const mapDispatchToProps = dispatch => {
  return {
    signIn: credentials => dispatch(signIn(credentials))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
