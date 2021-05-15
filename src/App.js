import Header from "./componants/Header";
import Data from "./componants/Data";
import "./styles/main.min.css";
import store from './Redux/Store';
import {Provider} from 'react-redux'
function App() {
  return (
      <Provider store={store}>

    <div className='App'>
      <Header />
      <Data />
    </div>
      </Provider>
  );
}

export default App;
