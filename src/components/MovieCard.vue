<template>
  <div class="card my-3 d-flex flex-row align-items-center">
    <div class="">
      <img style="width: 12rem;" :src="moviePosterPath" class="card-img-top" :alt="`${movieTitle}'s poster`">
    </div>
    <div class="ms-2 text-start">
      <h2 class=""><strong>{{ movieTitle }}</strong></h2>
      <p class="lead ellipsis">{{ movieOverview }}</p>

      <!-- Button trigger modal -->
      <button type="button" class="m-btn btn btn-indigo" data-bs-toggle="modal" :data-bs-target="`#movie${movieId}`">
        상세정보
      </button>
      <button type="button" class="m-btn like btn btn-indigo" 
      @click="pushWatches(movie)">봤어요!</button>

      <!-- Modal -->
      <div class="modal fade" :id="`movie${movieId}`" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <div class="modal-card">
                <img :src="moviePosterPath" class="card-img-top" :alt="movieTitle">
                <div class="card-body">
                  <h2 class="card-title"><strong>{{ movieTitle }}</strong></h2>
                  <div class="card-text">
                    <strong>인기도</strong>: {{ moviePopularity }} <br>
                    <strong>평점</strong>: {{ movieVoteAverage }} <br>
                    <strong>개봉일</strong>: {{ movieReleaseDate }} <br><br>
                    {{ movieOverview }} <br>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer justify-content-center">
              <button type="button" class="btn btn-indigo" data-bs-dismiss="modal">닫기</button>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="notice" :id="`notice${movieId}`">
      <p :id="`noticeText${movieId}`"></p>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

const IMG_BASE_URL = 'https://image.tmdb.org/t/p/original'

export default {
  name: 'MovieCard',

  props: {
    movie: Object,
  },

  computed: {    
    movieId() {return this.movie.id},
    movieTitle() {return this.movie.title},
    movieOverview() {return this.movie.overview},
    moviePosterPath() {return IMG_BASE_URL + this.movie.poster_path},
    moviePopularity() {return this.movie.popularity},
    movieReleaseDate() {return this.movie.release_date},
    movieVoteAverage() {return this.movie.vote_average},
  },

  methods: {
    ...mapActions(['pushWatches']),
  }
}
</script>

<style>
  .card {
    border: 1px solid #6610f2;
    background-color: #e0cffc1f;
    width: 60%;
    margin-left: 20%;
  }
  .card .btn {
    width: 6rem;
    color: white;
  }
  .card:hover {
    background-color: #8f4ff51f;
  }
  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .modal-card {
    width: 100%;
  }
  .modal-card .card-text {
    margin-top: 1rem;
  }
  .modal-dialog {
    border: 1px solid #6610f2;
    border-radius: 0.3rem;
  }
  .modal-content {
    background-color: #fbf9ff;
    background-clip: padding-box;
  }
  .like {
    margin-left: 0.7rem;
  }

  .notice {
  background: rgba(0,0,0,.3);
  border-radius: 10px 10px 0 0 ;
  padding: 15px 20px;
  position: absolute;
  left: 53%;
  bottom: 0;
  display: none;
  }

  .notice.show {
    display: block;
  }
  .m-btn:hover {
    color: #dedef8;
    font-weight: bold;
  }
</style>