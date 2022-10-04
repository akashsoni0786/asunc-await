import './App.css';
import Page1 from './Page1';
import '@shopify/polaris/build/esm/styles.css';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Page1 />
      </header>
    </div>
  );
}

export default App;
