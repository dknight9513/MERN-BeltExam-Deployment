import React, { useState, useEffect } from 'react'
import {useHistory} from 'react-router'
import axios from 'axios'

const PirateForm = (props) => {
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const [image,setImage] = useState("");
    const [imageError, setImageError] = useState("");
    const [numChests, setNumChests] = useState(0);
    const [catchPhrase, setCatchPhrase] = useState("");
    const [catchPhraseError, setCatchPhraseError] = useState("");
    const [position, setPosition] = useState("");
    const [positionError, setPositionError] = useState("");
    const [pegLeg, setPegLeg] = useState(true);
    const [eyePatch, setEyePatch] = useState(true);
    const [hookHand, setHookHand] = useState(true);
    const [responseError, setResponseError] = useState([])
    const history = useHistory();

    useEffect(()=>{
        if(name.length < 1){
            setNameError("A pirate is only as fearsome as their name")
        }
        else {
            setNameError("");
        }
    },[name])

    useEffect(()=>{
        if(image.length < 1){
            setImageError("We'll be needing an image of the pirate to keep on file.")
        }
        else {
            setImageError("");
        }
    },[image])

    useEffect(()=>{
        if(catchPhrase.length < 1){
            setCatchPhraseError("Every pirate has to have a signature catch phrase!")
        }
        else {
            setCatchPhraseError("");
        }
    },[catchPhrase])

    useEffect(()=>{
        if(position < 1){
            setPositionError("Pirates always have a job to do on a ship.")
        }
        else {
            setPositionError("");
        }
    },[position])
    
    const createPirate = (e) => {
        e.preventDefault();
        // if(!(nameError || imageError || catchPhraseError || positionError)){
            axios.post(`http://localhost:8000/api/pirates`,{
                name, image, numChests, catchPhrase, position, pegLeg, eyePatch, hookHand
            })
            .then((res)=>{
                if(res.data.error){
                    console.log(res.data.error)
                    let errors = res.data.error.errors;
                    let errArr = []
                    if(errors.name){
                        errArr.push(errors.name.message)
                    }
                    if(errors.image){
                        errArr.push(errors.image.message)
                    }
                    if(errors.catchPhrase){
                        errArr.push(errors.catchPhrase.message)
                    }
                    if(errors.position){
                        errArr.push(errors.position.message)
                    }
                    setResponseError([...errArr])
                }
                else{
                    props.changedPirates();
                    history.push('/pirates')
                }
            })
            .catch(err=> console.log(err))
        // }
    }

    return(<>
    {responseError && <div className="validationErrors">
        {responseError.map(error=>{
            return(<p className="error">{error}</p>)
            })}
    </div>}
    <form onSubmit={createPirate}>
        <div className="formLeftt">
            <div className="inputBundle">
                <label htmlFor="name">Pirate Name:</label>
                <input type="text" id='name' onChange={(e)=>setName(e.target.value)} value={name} />
                {nameError && <p className="error">{nameError}</p>}
            </div>
            <div className="inputBundle">
                <label htmlFor="image">Image URL:</label>
                <input type="text" id='image' onChange={(e)=>setImage(e.target.value)} value={image} />
                {imageError && <p className="error">{imageError}</p>}
            </div>
            <div className="inputBundle">
                <label htmlFor="numChests"># of Treasure Chests:</label>
                <input type="number" id='numChests' onChange={(e)=>setNumChests(e.target.value)} value={numChests} />
            </div>
            <div className="inputBundle">
                <label htmlFor="catchPhrase">Pirate's Catch Phrase:</label>
                <textarea name="catchPhrase" id="catchPhrase" cols="30" rows="6" onChange={(e)=>setCatchPhrase(e.target.value)} value={catchPhrase}></textarea>
                {catchPhraseError && <p className="error">{catchPhraseError}</p>}
            </div>
        </div>
        <div className="formRight">
            <div className="inputBundle">
                <label htmlFor="position">Crew Position:</label>
                <select name="position" id="position" onChange={(e)=>setPosition(e.target.value)} value={position}>
                    <option selected hidden disabled value="">Crew Position</option>
                    <option value="Captain">Captain</option>
                    <option value="First Mate">First Mate</option>
                    <option value="Quarter Master">Quarter Master</option>
                    <option value="Boatswain">Boatswain</option>
                    <option value="Powder Monkey">Powder Monkey</option>
                </select>
                {positionError && <p className="error">{positionError}</p>}
            </div>
            <div className="checkBundle">
                <input type="checkbox" name="pegLeg" id="pegLeg" checked={pegLeg} onChange={(e)=>setPegLeg(e.target.checked)}/>
                <label htmlFor="pegLeg">Peg Leg</label>
            </div>
            <div className="checkBundle">
                <input type="checkbox" name="eyePatch" id="eyePatch" checked={eyePatch} onChange={(e)=>setEyePatch(e.target.checked)}/>
                <label htmlFor="eyePatch">Eye Patch</label>
            </div>
            <div className="checkBundle">
                <input type="checkbox" name="hookHand" id="hookHand" checked={hookHand} onChange={(e)=>setHookHand(e.target.checked)}/>
                <label htmlFor="hookHand">Hook Hand</label>
            </div>
            <input type="submit" value="Add Pirate"/>
        </div>
    </form>
    </>)

}

export default PirateForm


