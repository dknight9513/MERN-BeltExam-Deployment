import './App.css';
import {useState,useEffect} from 'react';
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import axios from 'axios';
import PirateList from './Components/PirateList';
import PirateForm from './Components/PirateForm';
import PirateDetails from './Components/PirateDetails';

function App() {
  const [newPirate, setNewPirate] = useState(false);
  const [pirateList, setPirateList] = useState();

  const changedPirates = () => {
    setNewPirate(!newPirate);
  }

  useEffect(()=>{
    axios.get(`http://localhost:8000/api/pirates`)
    .then(res=>setPirateList(res.data))
    .catch(err=> console.log(err))
  },[newPirate])

  const removeFromDom = (id) => {
    setPirateList(pirateList.filter(pirate => pirate._id !== id));
  }

  return (
    <BrowserRouter className="App">
      <Switch>
        <Route exact path='/pirates'>
          <header className="App-header">
            <h1>Pirate Crew</h1>
            <Link to="/pirate/new"><button className="action">Add Pirate</button></Link>
          </header>
          <PirateList pirateList={pirateList} removeFromDom={removeFromDom}></PirateList>
        </Route>
        <Route exact path='/pirate/new'>
          <header className="App-header">
            <h1>Add Pirate</h1>
            <Link to="/pirates"><button className="action">Crew Board</button></Link>
          </header>
          <PirateForm changedPirates={changedPirates}></PirateForm>
        </Route>
        <Route exact path='/pirate/:id'>
          <PirateDetails></PirateDetails>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
