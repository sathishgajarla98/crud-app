import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Provider } from "react-redux";
import About from './About';
import Login from './components/login/Login';
import store from './store';
import Home from './Home';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Switch>
            <Route path="/login" component={Login} />
            <ProtectedRoute path="/about" component={About} />
            <ProtectedRoute path="/" component={Home} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
