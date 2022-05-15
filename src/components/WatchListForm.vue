<template>
  <div class="watch-form">
    <h1 class="display-5">My Watch List</h1>
    <form @submit="onSubmit">
      <input id="hashtag" class="input-indigo" type="text" placeholder="해시태그" v-model="inputMovie" @keydown.esc="onEsc">
      <button class="ms-1 m-0 btn btn-indigo btn-sm text-white">입력</button>
    </form>
  </div>
</template>

<script>
import { mapActions} from 'vuex'

export default {
  name: 'WatchListForm',
  data() {
    return {
      inputMovie: ''
    }
  },
  methods: {
    ...mapActions(['pushWatches']),
    onSubmit(event) {
      event.preventDefault()
      this.pushWatches(this.inputMovie)
      this.inputMovie = ''
    },
    onEsc() {
      this.inputMovie = ''
    }
  }
}
</script>

<style>
  .watch-form > h1 {
    font-weight: bold;
  }
  .watch-form {
    background-color: #e0cffc85;
    padding: 2rem 0;
  }
  .watch-form button {
    width: 50px;
  }
  .btn-indigo {
  background-color: #6610f2;
  border-radius: 5px;
  }
  .input-indigo {
    border: 1px solid #6610f2;
    border-radius: 5px;
  }
</style>