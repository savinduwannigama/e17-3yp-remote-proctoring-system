
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
import RouteProtection from './components/RouteProtection'
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
          <RouteProtection path="/admin/home" exact component={Adminhome} user="admin">
           
          </RouteProtection>
         <RouteProtection path='/admin/adddata' exact component={Addexam} user="admin">
            
          </RouteProtection>

          <RouteProtection path='/admin/removedata' exact component={Database} user='admin'>
          
          </RouteProtection>

          <RouteProtection path="/admin/settings" exact component={AdminSettings} user='admin'>
           
          </RouteProtection>

          <RouteProtection path='/admin/help' exact component={AdminHelp} user="admin">
         
          </RouteProtection>

          <Route path="/register" exact>
            <Register />
          </Route>

          

          <Route path="/signin" exact>
            <Login />
          </Route>
          <RouteProtection path="/home" component={Home} user="proctor">
           
          </RouteProtection>
          <RouteProtection path="/dashboard" component={Dashboard} user="proctor">
            
          </RouteProtection>

          <RouteProtection path="/schedule" component= {Schedule} user="proctor">
         
          </RouteProtection>
          <RouteProtection path="/courses" exact component={Courses} user="proctor">
          
          </RouteProtection>
          <RouteProtection path="/courses/:courseId" exact component={CoursePage} user="proctor"/>

          <RouteProtection path="/settings" exact component={Settings} user="proctor">
           
          </RouteProtection>

          <RouteProtection path="/help" exact component={Help} user="proctor">
          
          </RouteProtection>

          <RouteProtection  path="/meeting" exact component={Meeting} user="proctor">
           
          </RouteProtection >
        </Switch>
      </Router>
    </div>
  );
}

export default App;
