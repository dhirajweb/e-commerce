import './App.css';
import Navbar from './components/Navbar/Navbar'
import ProductList from './components/ProductList/ProductList'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Admin from './components/Admin/Admin'
import UserDetail from './components/UserDetail/UserDetail'

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
        <Switch>
          <Route exact path='/' component={ProductList} />
          <Route exact path='/admin' component={Admin} />
          <Route exact path='/user-detail' component={UserDetail} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
