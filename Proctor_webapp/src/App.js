
import './css/App.css';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/Register';
import Portal from './components/Portal';
import Adminlogin from './components/Adminlogin';
import Adminhome from './components/Admin/Adminhome';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Schedule from './components/Schedule';
import Courses from './components/Courses';
import Settings from './components/Settings';
import Help from './components/Help';
import Meeting from './components/Meeting';
import Adminregister from './components/Adminregister';
import CoursePage from './components/CoursePage';
import AdminSettings from './components/Admin/AdminSettings';
import Addexam from './components/Admin/Addexam'
import Database from './components/Admin/Database';
import AdminHelp from './components/Admin/AdminHelp';
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
          <Route path="/adminreg" exact>
            <Adminregister/>
          </Route>
          <Route path="/admin/home" exact>
            <Adminhome/>
          </Route>
         <Route path='/admin/addexam' exact>
            <Addexam/>
          </Route>

          <Route path='/admin/database' exact>
            <Database/>
          </Route>

          <Route path="/admin/settings" exact>
            <AdminSettings/>
          </Route>

          <Route path='/admin/help' exact>
            <AdminHelp/>
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
          <Route path="/courses/:courseId" component={CoursePage} />

          <Route path="/settings" exact>
            <Settings/>
          </Route>

          <Route path="/help" exact>
            <Help/>
          </Route>

          <Route path="/meeting" exact>
            <Meeting/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
