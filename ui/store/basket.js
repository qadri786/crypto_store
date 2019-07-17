const session = require("localStorage");

export const state = () => ({
    list: [],
});


export const getters = {
    totalBasket(state){
        let _t = state.list.map((item) => {return item.price * item.qty })
        let _q = state.list.map((item) => {return item.qty})
        return {
        total: _t.reduce((total, num) => {return total + num},0), 
        qty: _q.reduce((total, num) => {return total + num},0)
        }
    },
};

export const mutations = {
    basketInit(state){
        if (session.getItem("basket")){
            state.list = JSON.parse(session.getItem("basket"));
        }
    },

    basketClear(state){
        state.list = [],
        session.setItem("basket", JSON.stringify(state.list));
    },

    addToBasket(state, item){
        let isNew = true;
        state.list.forEach((n, i) => {
            if(n.id == item.id){
                state.list[i].qty ++;
                isNew = false;
            }
        });
        if(isNew === true){
            state.list.push(item);
        }
        session.setItem("basket", JSON.stringify(state.list));
    },

    updateQty(state, payload){
        state.list.forEach((n, i) => {
            if(n.id === payload.id){
                state.list[i].qty = parseInt(payload.qty);
                session.setItem("basket", JSON.stringify(state.list));
            }
        });
    },

    removeFromBasket(state, id){
        state.list.forEach((n, i) => {
            if(n.id === id){
                state.list.splice(i,1);
                session.setItem("basket", JSON.stringify(state.list));
            }
        })   
    }
};