import { createContext, useContext, useReducer } from "react";

const RegFormContext = createContext();
export const useRegFormContext = () =>{
    return useContext(RegFormContext);
}

const initialState = {
    termsConditions: {},
    regulation: {},
    estate: {},
    information: {},
    emergencyContact: {},
    medicalHistory: {},
    informedConsent: {},
    medicalDocument: null,
    currentStep: 0,
};


const reducer = (state, action) => {
    switch(action.type){
        case 'SET_TERMS_CONDITIONS':{
            return{ ...state, termsConditions:{...action.data}};
        }
        case 'SET_REGULATION':{
            return{ ...state, regulation:{...action.data}};
        }
        case 'SET_ESTATE':{
            return{ ...state, estate:{...action.data}};
        }
        case 'SET_INFORMATION':{
            return{ ...state, information:{...action.data}};
        }
        case 'SET_EMERGENCY_CONTACT':{
            return{ ...state, emergencyContact:{...action.data}};
        }
        case 'SET_MEDICAL_HISTORY':{
            return{ ...state, medicalHistory:{...action.data}};
        }
        case 'SET_INFORMED_CONSENT':{
            return{ ...state, informedConsent:{...action.data}};
        }
        case 'SET_MEDICAL_DOCUMENT':{
            return{ ...state, medicalDocument:action.data};
        }
        case 'UPDATE_STEP':{
            return{ ...state, currentStep: action.step};
        }
    }
    return state;
}

const RegFormProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <RegFormContext.Provider value={[state, dispatch]}>
            {children}
        </RegFormContext.Provider>
    );
}

export default RegFormProvider;