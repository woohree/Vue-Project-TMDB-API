<template>
  <div>
    <watch-list-form></watch-list-form>
    <div class="block d-flex flex-wrap justify-content-center m-3">
      <watch-list-item
      v-for="(movie, index) in watches" 
      :key="index" 
      :movie="movie"
      :index="index"></watch-list-item>
    </div>
  </div>
</template>

<script>
import WatchListForm from '@/components/WatchListForm.vue'
import WatchListItem from '@/components/WatchListItem.vue'
import { mapState } from 'vuex'

export default {
  name: 'WatchListView',
  components: {
    WatchListForm,
    WatchListItem,
  },
  computed: {
    ...mapState(['watches']),
  },
  methods: {
    keyUpEvent(e) {
      if (e.key === 'Enter') {
        const hashtag = document.querySelector('#hashtag')
        hashtag.focus()
      }
    }
  },
  created() {
    window.addEventListener('keyup', this.keyUpEvent)
  },
  destroyed() {
    window.removeEventListener('keyup', this.keyUpEvent)
  }
}
</script>

<style>
  .block {
    position: absolute;
    left: 25%;
    width: 50%;
  }
</style>