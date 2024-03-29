import { createStore } from 'vuex';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

// const BASE_URL = 'http://localhost:8000/'
const BASE_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : 'http://localhost:8000/';
const api = axios.create({ baseURL: BASE_URL });
const getDataToken = localStorage.getItem('token') ? localStorage.getItem('token') : '';
let getDataAuth = '';
if (getDataToken) {
  getDataAuth = jwt_decode(getDataToken);
}
export default createStore({
  state() {
    return {
      baseUrl: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : 'http://localhost:8000/',
      baseUrlFE: import.meta.env.VITE_API_URLFE ? import.meta.env.VITE_API_URLFE : 'http://localhost:3000/',
      // auth
      token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
      isLogin: localStorage.getItem('isLogin') ? localStorage.getItem('isLogin') : false,
      dataAuth: getDataAuth,
      isSideBarActive: false,
      // vuegoodtabelsettings
      settingVueGoodTable: {
        search: true,
        pagination: true,
        perPageDropdown: [10, 15, 25, 50],
        styleClass: 'vgt-table striped bordered condensed',
      },
      //getSettings
      dataSettings: {
        'app_nama': 'SI MONITORING PKL',
        'app_namapendek': 'SIPKL',
        'app_tapel_aktif': '2',
        'app_tapel_aktif_nama': '2022/2023',
        'pendaftaranpkl': 'Aktif',
        'login_siswa': 'Aktif',
        'login_pembimbingsekolah': 'Aktif',
        'login_pembimbinglapangan': 'Aktif',
      },
      dataAuth: {
        'id': null,
        'nama': 'Nama Siswa',
        'kelas': 'Kelas Siswa',
        'nomeridentitas': '1',
        'hakakses': 'User',
      },
      tempatPklSelected: [],
    };
  },
  getters: {
  },
  mutations: {
    setSideBar(state, value) {
      state.isSideBarActive = value;
    },
    setToken(state, value) {
      state.token = value;
    },
    setIsLogin(state, value) {
      state.isLogin = value;
    },
    setDataSettings(state, value) {
      state.dataSettings = value;
    },
    setDataAuth(state, value) {
      state.dataAuth = value;
    },
    setTempatPklSelected(state, value) {
      state.tempatPklSelected = value;
    },
  },

  actions: {
  },

});
