import React, { useReducer } from 'react'

const initialArg = 0;
function Reducer() {
    function reducer(state, action) {
        console.log(state, action)
        if (action.type === "first dispatch") {
            return state + 1;
        }
        return state
    }
    const [state, dispatch] = useReducer(reducer, initialArg)
    return (
        <>
            <div>{state}</div>
            <button onClick={() => {
                dispatch({ type: "first diapatch" });
            }}></button>
        </>
    )
}
export default Reducer