const check = {
  template: '#check',
  props: ['checked', 'id']
}

const product = {
  template: '#product',
  data: function () {
    return {
      products: [0, 1, 2, 3, 4, 5, 6, 7],
      selected: []
    }
  },
  methods: {
    select: function (e) {
      var clone = _.clone(this.selected)
      
      if (e.checked) clone.push(e.id)
      else _.remove(clone, function (i) {
        return i === e.id
      })

      this.selected = clone
    },
    checked: function (value) {
      return this.selected.indexOf(value) === -1 ? false : true 
    }
  },
  components: {
    check: check
  }
}

new Vue({
  el: '#root',
  template: '#app',
  components: {
    product: product
  }
})