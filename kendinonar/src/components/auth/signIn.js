import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { firestore } = this.context.store;
    firestore.get("users");
    firestore.onSnapshot({ collection: "users" });
  }
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.context.store.firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password);
    this.props.history.goBack();
  };

  render() {
    const { authError } = this.props;
    return (
      <div className="container">
        <div className="row ">
          <div className="offset-md-4 col-md-4 border">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label className="h5 mt-3" htmlFor="InputEmail1">
                  Email Adresi
                </label>
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
                <label className="h5" htmlFor="InputPassword1">
                  Şifre
                </label>
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  const userId = state.firebase.auth.uid;
  let user = null;
  if (userId) {
    const users = state.firestore.data.users;
    user = users ? users[userId] : null;
  }
  // console.log(state);
  return {
    authError: state.firebase.auth.authError,
    auth: state.firebase.auth,
    user: user
  };
};
export default connect(mapStateToProps)(SignIn);
