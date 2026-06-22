const check = {
  template: '#check',
  data: function () {
    return {
      checked: false
    }
  },
  props: ['id']
}

const thumb = {
  template: '#thumb',
  props: ['thumbs']
}

const product = {
  template: '#product',
  data: function () {
    return {
      ids: [0, 1, 2, 3, 4, 5, 6, 7],
      selected: []
    }
  },
  methods: {
    select: function (e) {
      var selected = _.clone(this.selected)
      if (e.checked) selected.push(e.id)
      else _.remove(selected, function (i) { return i === e.id })

      // emit
      this.$emit('selected', selected)

      // update for next time
      this.selected = selected
    }
  },
  components: {
    check: check
  }
}

new Vue({
  el: '#root',
  template: '#app',
  data: function () {
    return {
      thumbs: []
    }
  },
  components: {
    thumb: thumb,
    product: product
  }
})