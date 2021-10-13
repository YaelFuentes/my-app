import './App.css';
import { CreateUser, UsersShow, UserDetail} from "./Components";
import {Route, BrowserRouter as Router} from 'react-router-dom';
import {Link} from 'react-router-dom';
//import { usersdb } from './dbusers.json'

function App() {
  return (
    <Router>
    <div className="container">
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="nav navbar-nav">
          <Link className="nav-item nav-link active" to={"/"}>Home <span className="sr-only"></span></Link>
          <Link className="nav-item nav-link" to={"CreateUser"}>Create User</Link>
        </div>
      </nav>
      <Route exact path="/" component={UsersShow}></Route>
      <Route path="/CreateUser" component={CreateUser}></Route>
      <Route path="/DetailUser/:id" component={UserDetail}></Route>
    </div>
    </Router>
  );
}

export default App;
