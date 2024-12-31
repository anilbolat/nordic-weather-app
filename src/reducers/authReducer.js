export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return JSON.parse(action.payload).token;
        case 'LOGOUT':
            return "";
        default:
            return state;
    }
}