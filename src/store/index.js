import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'
import axios from 'axios'
import _ from 'lodash'

Vue.use(Vuex)

const API_URL = 'https://api.themoviedb.org/3'
const API_KEY = process.env.VUE_APP_TMDB_API_KEY
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/original'

export default new Vuex.Store({
  plugins: [
    createPersistedState(),
  ],
  
  state: {
    movies: [],
    page: 2,
    flag: '',
    randomMovie: {},
    watches: [],
  },

  getters: {
    movieId: state => state.randomMovie.id,
    movieTitle: state => state.randomMovie.title,
    moviePosterPath: state => IMG_BASE_URL + state.randomMovie.poster_path,
    moviePopularity: state => state.randomMovie.popularity,
    movieReleaseDate: state => state.randomMovie.release_date,
    movieVoteAverage: state => state.randomMovie.vote_average,
    movieOverview: state => state.randomMovie.overview,
    isMovie: state => !_.isEmpty(state.randomMovie)
  },

  mutations: {
    SET_MOVIES(state, data) {
      state.page = 2
      state.movies = data.results
      state.flag = data.flag
    },

    PUSH_MOVIES(state, results) {
      state.movies.push(...results)
      state.page += 1
    },
    
    SET_RANDOM_MOVIE(state, movie) {
      state.randomMovie = movie
    },

    PUSH_WATCHES(state, movie) {
      state.watches.push('# ' + movie)
    },

    DELETE_WATCH(state, watch) {
      const idx = state.watches.indexOf('# ' + watch)
      state.watches.splice(idx, 1)
    }
  },
  actions: {
    setMovies({ commit }, flag) {
      const params = {
        api_key: API_KEY,
        language: 'ko-KR',
        page: 1,
      }
      axios.get(API_URL + `/movie/${flag}`, { params })
        .then( res => {
          commit('SET_MOVIES', {results: res.data.results, flag: flag})
        })
        .catch(err => console.error(err))
    },

    pushMovies({ state, commit }, inf) {
      const params = {
        api_key: API_KEY,
        language: 'ko-KR',
        page: state.page,
      }
      axios.get(API_URL + `/movie/${state.flag}`, { params })
        .then( res => {
          commit('PUSH_MOVIES', res.data.results)
          inf.loaded()
        })
        .catch(err => console.error(err))
    },

    setRandomMovie({ state, commit }) {
      const randomMovie = _.sample(state.movies)
      commit('SET_RANDOM_MOVIE', randomMovie)
    },

    pushWatches({ state, commit }, movie) {
      const showNotice = (movieId, flag) => {
        const notice = document.querySelector(`#notice${movieId}`)
        const p = document.querySelector(`#noticeText${movieId}`)
        p.innerText = 'Watch List ' + flag
        notice.classList.add('show')
        setTimeout(() => {
          notice.classList.remove('show')
        }, 1000)
      }
      if (!movie) {
        alert('해시태그를 입력해 주세요!')
      } else if (typeof(movie) === 'string') {
        commit('PUSH_WATCHES', movie)
      } else if (state.watches.indexOf('# ' + movie.title) === -1) {
        commit('PUSH_WATCHES', movie.title)
        showNotice(movie.id, '+1')
      } else if (movie) {
        commit('DELETE_WATCH', movie.title)
        showNotice(movie.id, '-1')
      }
    },
    
    deleteWatch({ commit }, watch) {
      const realWatch = watch.replace('# ', '')
      commit('DELETE_WATCH', realWatch)
    },
  },

  modules: {
  },
})
