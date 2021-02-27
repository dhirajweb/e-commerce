import './App.css';
import Navbar from './components/Navbar/Navbar'
import ProductList from './components/ProductList/ProductList'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Admin from './components/Admin/Admin'
import UserDetail from './components/UserDetail/UserDetail'
import { ToastProvider } from 'react-toast-notifications'

function App() {
  return (
    <ToastProvider placement='top-center'>
    <div className="App">
      <Router>
      <Navbar />
        <Switch>
          <Route exact path='/e-commerce' component={ProductList} />
          <Route exact path='/admin' component={Admin} />
          <Route exact path='/user-detail' component={UserDetail} />
        </Switch>
      </Router>
    </div>
    </ToastProvider>
  );
}

export default App;
