var store = new Vuex.Store({
  state: {
    items: [0, 1, 2, 3, 4, 5, 6, 7],
    queue: []
  },
  mutations: {
    filter: function (state, value) {
      var clone = _.clone(state.queue)

      if (value.queue) clone.push(value.id)
      else _.remove(clone, function (i) {
        return i === value.id
      })

      state.queue = clone
    },
  }
})

var check = {
  template: '#check',
  props: ['item'],
  methods: {
    queue: function () {
      this.$store.commit('filter', this.item)
    }
  }
}

var item = {
  template: '#item',
  computed: {
    items: function () {
      return this.$store.state.items
    },
    queued: function () {
      return this.$store.state.queue
    }
  },
  methods: {
    is_queued: function (value) {
      return this.queued.indexOf(value) === -1
    }
  },
  components: {
    check: check
  }
}

new Vue({
  el: '#root',
  template: '#app',
  store,
  components: {
    item: item
  }
})