import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cacheCityName:'',
    cacheLngLat:'',
    addDesc:''
  },
  getters: {
    getCacheCityName: (state) => {
      return state.cacheCityName;
    },
    getCacheLngLat:state => {
      return state.cacheLngLat;
    },
    getAddDesc:state => {
      return state.addDesc;
    }
  },
  mutations:{
    setCacheCityName(state,cityName){
      console.log(state,cityName);
      state.cacheCityName=cityName;
    },
    setCacheLngLat(state,cacheLngLat){
      state.cacheLngLat=cacheLngLat;
    },
    setAddDesc(state,setAddDescTxt){
      state.addDesc=setAddDescTxt;
    }
  },
  actions: {
    setCacheCityName ({ commit }) {
      commit('setCacheCityName')
    },
    setCacheLngLat ({ commit }) {
      commit('setCacheLngLat')
    },
    setAddDesc ({ commit }) {
      commit('setAddDesc')
    }

  }
})
export default {
  store
}
