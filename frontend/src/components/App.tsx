import React, {useEffect} from 'react';
import './App.scss';
import Jobs from "../pages/Jobs/Jobs";


function App() {
    useEffect(() => {
        document.title = "Work App";
    }, []); // Le tableau vide signifie que l'effet ne sera exécuté qu'une seule fois au montage.


    return (
    <div className="app">
      <header className="app__header">
          <h1 className="app__title">Work App</h1>
      </header>
      <Jobs/>
    </div>
  );
}

export default App;
