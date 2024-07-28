import './App.css';
import Main from './components/Main';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';

// Initialize Google Analytics
ReactGA.initialize('G-0V36VV6LK1');

// Track the initial page load
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(<App />, document.getElementById('root'));

function App() {
  return (
    <>
      <Main />
    </>
  );
}

export default App;
