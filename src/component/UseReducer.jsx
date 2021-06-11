import React, { useEffect, useReducer, useRef, useState } from 'react'
import Modal from './Modal'

let initial = {
    person: [],
    isModalOpen : false,
    modalContent: ""
}

let reducer = (state, action) => {
    switch(action.type){
        case "ADD_ITEM":
            return {
               ...state,
                person: [...state.person, action.payload],
                isModalOpen : true,
                modalContent: "Item Added"
            }
            case "ALERT_ITEM":
                return {
                    ...state,
                     isModalOpen : true,
                     modalContent: "Please Enter a Value"                    
                }
                case "CLOSE_MODAL":
                    return{
                        ...state,
                        isModalOpen : false
                    }
                    case "REMOVE_ITEM":
//             NewItem notun array return kore. tai person: newItem deya hoyeche
                        let newItem = state.person.filter(person => person.id !== action.payload)                       
                        return{
                            ...state,
                            person: newItem,
                            isModalOpen: true,
                            modalContent: "Item Removed" 
                        }
                default:
                    return state
    }
}



const UseReducer = () => {
    let [name, setname] = useState("")
    // useref
    let useRefContainer = useRef(null)
    // useReducer hook
    let [state, dispatch] = useReducer(reducer, initial)
    // useEffect
    useEffect(() => {
        useRefContainer.current.focus()
    }, [])

    // Submit
    let handleSubmit = (e) => {
        e.preventDefault()
        if(name){
            let newItem = {id: new Date().getTime().toString(), name}
            dispatch({type: "ADD_ITEM", payload: newItem})            
        setname("")
        }else{
            dispatch({type: "ALERT_ITEM"})
        }       
    }

    // Modal close
    let closeModal = () => {
    dispatch({type: "CLOSE_MODAL"})
}

let removeItem = (id) => {
    dispatch({type: "REMOVE_ITEM", payload: id})
}




    console.log(state)
    return (
        <div className="container">
            {state.isModalOpen && <Modal modalContent={state.modalContent} closeModal= {closeModal}/>}
            <form onSubmit={handleSubmit}>
                <div className="form-field">
                    <input type="text" name="name" value={name} onChange={(e) =>  setname(e.target.value)} ref={useRefContainer} />
                </div>
                <button className="btn" type="submit"> Submit </button>
            </form>

            {
                state.person.map(person => {
                    let {id, name} = person
                    return (
                        <div key={id} className="item">
                            <h4> {name} </h4>
                            <p onClick={() => removeItem(id)}> Remove </p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default UseReducer
