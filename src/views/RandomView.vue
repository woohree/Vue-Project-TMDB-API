<template>
  <div>
    <div>
      <button class="pick-btn btn btn-indigo text-white" @click="setRandomMovie"><strong>RANDOM PICK</strong></button>
    </div>
    <img class="random-img" v-if="isMovie" :src="moviePosterPath" :alt="movieTitle" data-bs-toggle="modal" :data-bs-target="`#movie${movieId}`">

    <!-- Modal -->
    <div class="modal fade" :id="`movie${movieId}`" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <div class="modal-card">
              <img :src="moviePosterPath" class="card-img-top" :alt="movieTitle">
              <div class="card-body">
                <h2 class="card-title text-start"><strong>{{ movieTitle }}</strong></h2>
                <div class="card-text text-start">
                  <strong>인기도</strong>: {{ moviePopularity }} <br>
                  <strong>평점</strong>: {{ movieVoteAverage }} <br>
                  <strong>개봉일</strong>: {{ movieReleaseDate }} <br><br>
                  {{ movieOverview }} <br>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer justify-content-center">
            <button type="button" class="modal-btn btn btn-indigo" data-bs-dismiss="modal">닫기</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'RandomView',
  computed: {
    ...mapGetters(['movieTitle', 'moviePosterPath', 'isMovie', 'movieId', 'moviePopularity', 'movieReleaseDate', 'movieVoteAverage', 'movieOverview']),
  },
  methods: {
    ...mapActions(['setRandomMovie', 'setMovies']),
  },
}
</script>

<style scoped>
  .pick-btn {
    width: 35rem;
    margin-bottom: 1rem;
  }
  .random-img {
    width: 35rem;
    cursor: pointer;
  }
  .btn-indigo {
    background-color: #6610f2;
    border-radius: 5px;
  }
  .modal-btn {
    color: white;
  }
</style>