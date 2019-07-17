export const state = () => ({
    currentUser: '',
    isAdmin: false
});

export const getters = {
    getUser(state){
        return state.currentUser;
    },
    getIsAdmin(state){
        return state.isAdmin;
    }
};

export const mutations = {
    setUser(state, token){
        state.currentUser = token
    },

    setAdminUser(state, val){
        state.isAdmin = val
    },
};