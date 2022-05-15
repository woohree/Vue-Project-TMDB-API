<template>
  <div @dblclick="deleteWatch(movie)" :class="(index % 2 ? 'odd' : 'even')" class="m-1 watch-list lead px-2">
    {{ movie }}
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'WatchListItem',
  props: {
    movie: String,
    index: Number,
  },
  computed: {
    ...mapState(['watches']),
  },
  methods: {
    ...mapActions(['deleteWatch']),
  }
}
</script>

<style>
  .watch-list {
    cursor: pointer;
  }
  .watch-list:hover {
    background-color: #e0cffc;
    color: #031633;
    font-weight: bold;
  }
  .odd {
    background-color: #3d0a91;
    color: white;
    border-radius: 10px;
  }
  .even {
    background-color: #8c68cd;
    color: white;
    border-radius: 10px;
  }
</style>