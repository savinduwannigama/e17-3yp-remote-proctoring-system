
import './css/App.css';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/Register';
import Portal from './components/Portal';
import Adminlogin from './components/Adminlogin';
import Adminhome from './components/Adminhome';

function App() {
  return (
    <div className="App">
     
     <Router>
        <Switch>
          <Route path="/" exact>
            <Portal/>
          </Route>
          <Route path="/adminlogin" exact>
            <Adminlogin/>
          </Route>
          <Route path="/adminhome" exact>
            <Adminhome/>
          </Route>

          <Route path="/register" exact>
            <Register />
          </Route>

          <Route path="/login" exact>
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
