import cookieparser from 'cookieparser'
export const actions = {
    async nuxtServerInit ({ commit }, { app, req }) {
        if (req.headers.cookie) {
          var parsed = cookieparser.parse(req.headers.cookie)
          await commit('user/setUser', parsed["cs_user"] ? parsed["cs_user"] : "")
          const respIsAdmin = await app.$axios.get("http://localhost/api/user/check", { headers: {"Authorization": "key=" + parsed["cs_user"]} }).catch((err) => {});
          if(respIsAdmin !== undefined){
            if(typeof respIsAdmin.data !== 'undefined' && typeof respIsAdmin.data._id !== 'undefined'){
                await commit("user/setAdminUser", true)  
            }
          } 
        }
    },
};
