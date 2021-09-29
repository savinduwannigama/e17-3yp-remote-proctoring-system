
import './css/App.css';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/Register';
import Portal from './components/Portal';
import Adminlogin from './components/Adminlogin';
import Adminhome from './components/Adminhome';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Schedule from './components/Schedule';
import Courses from './components/Courses';
import Settings from './components/Settings';
import Help from './components/Help';

function App() {
  return (
    <div className="App">
     
     <Router>
        <Switch>
          <Route path="/" exact>
            <Portal/>
          </Route>
          <Route path="/adminsignin" exact>
            <Adminlogin/>
          </Route>
          <Route path="/adminhome" exact>
            <Adminhome/>
          </Route>

          <Route path="/register" exact>
            <Register />
          </Route>

          <Route path="/signin" exact>
            <Login />
          </Route>
          <Route path="/home" exact>
            <Home/>
          </Route>
          <Route path="/dashboard" exact>
            <Dashboard/>
          </Route>

          <Route path="/schedule" exact>
            <Schedule/>
          </Route>
          <Route path="/courses" exact>
            <Courses/>
          </Route>

          <Route path="/settings" exact>
            <Settings/>
          </Route>

          <Route path="/help" exact>
            <Help/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
