<template>
  <div id="home" class="home">
    <button class="up-btn btn btn-indigo" @click="onUp">위로</button>
    <ul class="home-list">
      <span @click="setMovies('popular')">영화 랭킹</span> |
      <span @click="setMovies('now_playing')">현재 상영중</span> |
      <span @click="setMovies('upcoming')">개봉 예정작</span>
    </ul>
    <movie-card
      v-for="movie in movies"
      :key="movie.id"
      :movie="movie"
    ></movie-card>
    <infinite-loading @infinite="pushMovies"></infinite-loading>
  </div>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";
import { mapState, mapActions } from 'vuex'
import MovieCard from '@/components/MovieCard.vue'

export default {
  name: 'HomeView',

  components: {
    MovieCard,
    InfiniteLoading,
  },

  methods: {
    ...mapActions(['setMovies', 'pushMovies']),
    onUp() {
      window.scrollTo(0, 0)
    }
  },

  computed: {
    ...mapState(['movies'])
  },

  created() {
    this.setMovies('popular')
  }
}

</script>

<style>
  .home-list span {
    cursor: pointer;
  }

  .home-list :hover {
    font-weight: bold;
    color: #6610f2;
  }
  .up-btn {
    position: fixed;
    bottom: 5%;
    right: 25%;
    z-index: 1;
    color: white;
  }
  .up-btn:hover {
    color: #dedef8;
    font-weight: bold;
  }

</style>
