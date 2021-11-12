import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useParams, useHistory} from 'react-router';


const PirateDetails = (props) => {
    const [pirate, setPirate] = useState({})
    const {id} = useParams();
    const history = useHistory();

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/pirates/${id}`)
        .then(res => setPirate(res.data[0]))
        .catch(err =>{console.log(err)})
    },[id])

    const homepage = () => {
        history.push('/pirates');
    }

    return(<>
        <header className="App-header">
            <h1>{pirate.name}</h1>
        </header>
        <div className='details'>
            <div className="detailsLeft">
                <img src={pirate.image} alt={`Portrait of ${pirate.name}`} />
                <h2>"{pirate.catchPhrase}"</h2>
            </div>
            <div className="detailsRight">
                <h3>About</h3>
                <div className="factoids">
                    <p>Position: {pirate.position}</p>
                    <p>Treasures: {pirate.numChests}</p>
                    {pirate.pegLeg && <p>Peg Leg: Yes</p>}
                    {!pirate.pegLeg && <p>Peg Leg: No</p>}
                    {pirate.eyePatch && <p>Eye Patch: Yes</p>}
                    {!pirate.eyePatch && <p>Eye Patch: No</p>}
                    {pirate.hookHand && <p>Hook Hand: Yes</p>}
                    {!pirate.hookHand && <p>Hook Hand: No</p>}
                </div>
                <button className="action" onClick={homepage}>Crew Board</button>
            </div>
        </div>
    </>)
}

export default PirateDetails