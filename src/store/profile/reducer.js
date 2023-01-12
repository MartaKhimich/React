import * as types from './types'

const initialState = {
    name: 'Marta',
    visible: true
}

export const profileReducer = (state = initialState, action) => {
    const {type, payload} = action

    switch (type) {
        case types.CHANGE_NAME: 
            return {
                ...state,
                name: payload
            }
            case types.TOGGLE_PROFILE: 
                return {
                    ...state,
                    visible: !state.visible
                }

        default:
            return state
    }

}