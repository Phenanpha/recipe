import { createStore } from 'vuex';
import axios from 'axios';
export default createStore({
  state: {
    loginUsername: {}, // เก็บ username ที่ล็อกอิน
    liked: localStorage.getItem('liked') === 'true',
    loginId: {},
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    likedRecipes: JSON.parse(localStorage.getItem('likedRecipes')) || {}, // โหลด liked recipes จาก localStorage
  },
  mutations: {
    setUsername(state, payload) {
      state.loginUsername = payload; // สร้าง mutation เพื่อเปลี่ยนแปลงค่าใน state
      state.isLoggedIn = true;
      localStorage.setItem('username', payload); // เก็บค่า username ลงใน localStorage
    },
    logout(state) {
      state.isLoggedIn = false; // เปลี่ยน isLoggedIn เป็น false เมื่อมีการออกจากระบบ
      state.loginUsername = {};
      state.loginId = {};
      localStorage.removeItem('isLoggedIn'); // ลบค่า isLogin ออกจาก localStorage เมื่อ logout
      localStorage.removeItem('username'); // ลบค่า username ออกจาก localStorage เมื่อ logout
      localStorage.removeItem('id'); // ลบค่า id ออกจาก localStorage เมื่อ logout
    },
    setId(state, payload) {
      state.loginId = payload; // สร้าง mutation เพื่อเปลี่ยนแปลงค่าใน state
      localStorage.setItem('id', payload); // เก็บค่า id ลงใน localStorage
    },
    setLogin_status(state, status) {
      state.isLoggedIn = status;
      localStorage.setItem('isLoggedIn', status ? 'true' : 'false'); // เก็บค่า isLoggedIn ลงใน localStorage
    },
    setLiked(state, { recipeId, liked }) {
      if (liked) {
        state.likedRecipes[recipeId] = true;
      } else {
        delete state.likedRecipes[recipeId];
      }
      localStorage.setItem('likedRecipes', JSON.stringify(state.likedRecipes));
    },
  },
  actions: {
    async loadLoginStatus({ commit }) {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      commit('setLogin_status', isLoggedIn);
      if (isLoggedIn) {
        const username = localStorage.getItem('username');
        const id = localStorage.getItem('id');
        commit('setUsername', username);
        commit('setId', id);
      }
    },
    setLike({ commit }, { recipeId, liked }) {
      commit('setLiked', { recipeId, liked });
    },
  },

});