import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error:null
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
  componentWillReceiveProps(){
    if (this.props.auth.uid){
     
      this.props.history.push("/");
    } 
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
      .signInWithEmailAndPassword(this.state.email, this.state.password).catch(error=>{
        this.setState({error:error.message});
      });
      
    if (this.props.auth.uid){
     
      this.props.history.push("/");
    } 
  };

  render() {
    const { authError } = this.props;
    return (
      <section className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="InputEmail1">Email Adresi</label>
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

          <button className="btn ">Giriş Yap</button>

          {this.state.error!==null? <p className="text-center"> {this.state.error}</p> : null}
        </form>
      </section>
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
  console.log(state);
  return {
    authError: state.firebase.authError,
    auth: state.firebase.auth,
    user: user
  };
};
export default connect(mapStateToProps)(SignIn);
