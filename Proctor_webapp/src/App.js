
import './App.css';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
     
     <Router>
        <Switch>
          <Route path="/" exact>
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
