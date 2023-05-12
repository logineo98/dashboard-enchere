import { _enchere_clear_errors, _enchere_create_success, _enchere_delete_success, _enchere_errors, _enchere_get_success, _enchere_gets_success, _enchere_loading, _enchere_update_success } from "../constants/constants"

const init = {
    enchere: null,
    encheres: [],
    message: null,
    errors: null,
    created_id: null,
    loading: false
}

const enchereReducer = (state = init, action) => {
    switch (action.type) {

        case _enchere_loading: return { ...state, loading: true, errors: null }
        case _enchere_errors: return { ...state, loading: false, errors: action.payload }

        case _enchere_create_success: return { ...state, loading: false, errors: null, encheres: [...state.encheres, action.payload.ans], created_id: action.payload.ans, message: action.payload.message }

        case _enchere_update_success:
            const updatedencheres = state.encheres.map(enchere => {
                if (enchere._id === action.payload.ans?._id) { return { ...enchere, ...action.payload.ans } }
                return enchere
            })
            return { ...state, loading: false, errors: null, encheres: updatedencheres }

        case _enchere_delete_success:
            const filteredencheres = state.encheres.filter(enchere => enchere._id !== action.payload.ans?._id)
            return { ...state, loading: false, errors: null, encheres: filteredencheres }

        case _enchere_get_success: return { ...state, loading: false, errors: null, enchere: action.payload.ans, message: action.payload.message }

        case _enchere_gets_success: return { ...state, loading: false, errors: null, encheres: action.payload.ans, message: action.payload.message }

        case _enchere_clear_errors: return { ...state, errors: null, };
        case "_clear_created_id": return { ...state, created_id: null, };


        default: return state;
    }
}

export default enchereReducer