import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";
import Forum from "./components/forum/forum";
import ForumLevel2 from "./components/forum/forum-level2";
import ForumDetails from "./components/forum/forum-details";
import SignIn from "./components/auth/signIn";
import SignUp from "./components/auth/signUp";
import AddNewMessage from "./components/forum/addNewMessage";
import EditMessage from "./components/forum/editMessage";
import AddNewTopic from "./components/forum/addNewTopic";
import AdminPanel from "./components/forum/admincomponents/adminPanel";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Forum} />
            <Route path="/forum/sub/:id" component={ForumLevel2} />
            <Route path="/forum/details/:id" component={ForumDetails} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/addmessage/:id" component={AddNewMessage} />
            <Route path="/editmessage/:id" component={EditMessage} />
            <Route path="/addtopic/:id" component={AddNewTopic} />
            <Route path="/admin" component={AdminPanel} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
