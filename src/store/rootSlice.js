import { createSlice } from "@reduxjs/toolkit";


const RootSlice = createSlice({
    name : 'root',
    initialState : {
        phone : "+ 7 999 999 99-99",
        email : 'tim.lennings@example.com',
        nickname : 'Placeholder',
        nameUser : 'Placeholder',
        surnameUser : 'Placeholder',
        gender : 'Не выбрано',
        step : 1,
        advantages : [],
        groupCheckbox : [],
        radio : 1,
        text : 'Placeholder'
    },

    reducers : {
        addPhone (state, action) {state.phone = action.payload},
        addEmail (state, action)  {state.email = action.payload},
        addNickname (state, action) {state.nickname = action.payload},
        addName (state, action) {state.nameUser = action.payload},
        addSurname (state, action)  {state.surnameUser = action.payload},
        addGender (state, action) {state.gender = action.payload},
        nextStep (state) {state.step += 1},
        backStep (state,action) {state.step -= +action.payload},

        addAdvantage (state, action) {
            state.advantages.push(action.payload)       
        },

        addCheckbox (state, action) {
            state.groupCheckbox.push(action.payload);
        },

        addRadio(state, action) {
            state.radio = action.payload
        },

        addText : (state, action) => {state.text = action.payload},

        clearAllUsers() {
            return { 
                phone : "+ 7 999 999 99-99",
                email : 'tim.lennings@example.com',
                nickname : 'Placeholder',
                nameUser : 'Placeholder',
                surnameUser : 'Placeholder',
                gender : 'Не выбрано',
                step : 1,
                advantages : [],
                groupCheckbox : [],
                radio : 1,
                text : 'Placeholder'}
        },

        extraReducers(builder) {
            builder.addCase(RootSlice.actions.clearAllUsers, () => {
                return [];
            })
        }
        
        

    }
})

export const { 
    addPhone, 
    addEmail,
    addName,
    addNickname,
    addGender, 
    addSurname, 
    nextStep,
    backStep,
    addAdvantage,
    deleteAdvantage,
    addCheckbox,
    addRadio,
    addText,
    clearAllUsers
} = RootSlice.actions;


export const selectPhone = (state => state.root.phone);
export const selectEmail = (state => state.root.email);
export const selectNickname = (state => state.root.nickname);
export const selectName = (state => state.root.nameUser);
export const selectSurname = (state => state.root.surnameUser);
export const selectGender = (state => state.root.gender);
export const selectStep = state => state.root.step;
export const selectAdvantage = state => state.root.advantages;
export const selectCheckbox = state => state.root.groupCheckbox;
export const selectRadio = state => state.root.radio;
export const selectText = state => state.root.text;
export default RootSlice.reducer;