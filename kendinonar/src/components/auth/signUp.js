import React, { Component } from "react";
import { connect } from "react-redux";
import { addUser } from "../../store/actions/userActions";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class signUp extends Component {
  state = {
    email: "",
    password: "",
    userName: "",
    city: "",
    privilege: "acemi",
    signUpDate: "",
    messageCount:0
  };

  //set state from form
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  //add new user
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.password === this.state.password1) {
      this.props.addUser(this.state);
      this.setState({
        email: "",
        password: "",
        userName: "",
        city: "",
        privilege: "user",
        signUpDate: "",
        messageCount:0
      });
      this.props.history.goBack();
    } else {
    }
  };
  render() {
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
              <label htmlFor="InputPassword">Şifre</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Şifrenizi belirleyiniz"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="InputPassword1">Şifre Tekrar</label>
              <input
                type="password"
                className="form-control"
                id="password1"
                placeholder="Şifrenizi tekrar giriniz"
                value={this.state.password1}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="firstName">Kullanıcı Adınız</label>
              <input
                type="text"
                className="form-control"
                id="userName"
                aria-describedby="firstName"
                placeholder="Adınız"
                value={this.state.userName}
                onChange={this.handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">Şehir</label>
              <input
                type="text"
                className="form-control"
                id="city"
                aria-describedby="city"
                placeholder="Şehir"
                value={this.state.city}
                onChange={this.handleChange}
              />
            </div>

            <button className="btn btn-secondary m-3">Üye Ol</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addUser: user => dispatch(addUser(user))
  };
};
export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "user" }])
)(signUp);
