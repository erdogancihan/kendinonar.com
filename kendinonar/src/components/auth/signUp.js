import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class signUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "",
        password: "",
        userName: "",
        city: ""
      },
      message: null
    };
  }

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { firestore } = this.context.store;
    firestore.get("users");
    firestore.onSnapshot({ collection: "users" });

    /*
    store.firestore.setListeners([
     { collection: 'cities' },
      { collection: 'users' },
    ]),
    */
  }
  //set state from form
  handleChange = e => {
    this.setState({
      user: { ...this.state.user, [e.target.id]: e.target.value }
    });
  };
  //add new user
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.password === this.state.password1) {
      this.context.store.firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.state.user.email,
          this.state.user.password
        )
        .then(response => {
          console.log(response.user.uid);

          this.context.store.firestore.set(
            { collection: "users", doc: response.user.uid },
            {
              userName: this.state.user.userName,
              city: this.state.user.city,
              privilege: "acemi",
              signUpDate: new Date().toISOString(),
              messageCount: 0,
              email: this.state.user.email
            }
          );
        })
        .then(() => {
          this.setState({
            ...this.state,
            user: {
              email: "",
              password: "",
              userName: "",
              city: ""
            }
          });
          this.props.history.push("/");
        })
        .catch(err => {
          console.log(err);
          this.setState({
            ...this.state,
            message: err.message
          });
        });
    }
  };

  render() {
    return (
      <section className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="InputEmail1">Email adresi</label>
            <input
              type="email"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Email Adresi Giriniz"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="InputPassword">Şifre</label>
            <input
              type="password"
              id="password"
              placeholder="Şifrenizi belirleyiniz"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="InputPassword1">Şifre Tekrar</label>
            <input
              type="password"
              id="password1"
              placeholder="Şifrenizi tekrar giriniz"
              value={this.state.password1}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="firstName">Kullanıcı Adınız</label>
            <input
              type="text"
              id="userName"
              aria-describedby="firstName"
              placeholder="Adınız"
              value={this.state.userName}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">Şehir</label>
            <input
              type="text"
              id="city"
              aria-describedby="city"
              placeholder="Şehir"
              value={this.state.city}
              onChange={this.handleChange}
              required
            />
          </div>

          <button className="btn">Üye Ol</button>
          <p>{this.state.message}</p>
        </form>
      </section>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    users: state.firestore.ordered.users,
    authError: state.firebase.authError
  };
};

export default connect(mapStateToProps)(signUp);
