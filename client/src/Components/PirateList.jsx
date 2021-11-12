import React from 'react'
import {useHistory} from 'react-router'
import axios from 'axios'

const PirateList = (props) => {
    const pirateList = props.pirateList;
    const history = useHistory();

    const deletePirate = (id) => {
        axios.delete(`http://localhost:8000/api/pirates/${id}`)
        .then(()=>props.removeFromDom(id))
        .catch(err => console.log(err));
    }

    const viewPirate = (id) => {
        history.push(`/pirate/${id}`);
    }

    return(<div className="mainContent">
        {pirateList && pirateList.map(pirate=>{
            return(<div className="listCard">
                <img src={pirate.image} alt={`Portrait of ${pirate.name}`}/>
                <div className="cardRight">
                    <h2>{pirate.name}</h2>
                    <div className="controls">
                        <button className="action" onClick={()=>viewPirate(pirate._id)}>View Pirate</button>
                        <button className="delete" onClick={()=>deletePirate(pirate._id)}>Walk the Plank!</button>
                    </div>
                </div>
            </div>)
        })}
    </div>)


}

export default PirateList