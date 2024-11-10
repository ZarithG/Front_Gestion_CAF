import { createContext, useContext, useReducer } from "react";

const RegContext = createContext();
export const useRegContext = () =>{
    return useContext(RegContext);
}

const initialState = {
    userData: {},
    estate: {},
    information: {},
    emergencyContact: {},
    currentStep: 0,
};


const reducer = (state, action) => {
    switch(action.type){
        case 'SET_INFORMATION':{
            return{ ...state, information:{...action.data}};
        }
        case 'SET_USERDATA':{
            return{ ...state, userData:{...action.data}};
        }
        case 'SET_ESTATE':{
            return{ ...state, estate:{...action.data}};
        }
        case 'SET_EMERGENCY_CONTACT':{
            return{ ...state, emergencyContact:{...action.data}};
        }
        case 'UPDATE_STEP':{
            return{ ...state, currentStep: action.step};
        }
    }
    return state;
}

const RegProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <RegContext.Provider value={[state, dispatch]}>
            {children}
        </RegContext.Provider>
    );
}

export default RegProvider;

