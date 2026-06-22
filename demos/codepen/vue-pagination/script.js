// TODO
// + scroll to top on page change
// + settimeout page change

new Vue({
  el: '#app',
  data: {
    items: [
      { name: 'foo1' }, { name: 'bar1' }, { name: 'baz1' }, { name: 'qux1' }, { name: 'cue1' },
      { name: 'foo2' }, { name: 'bar2' }, { name: 'baz2' }, { name: 'qux2' }, { name: 'cue2' },
      { name: 'foo3' }, { name: 'bar3' }, { name: 'baz3' }, { name: 'qux3' }, { name: 'cue3' },
      { name: 'foo4' }, { name: 'bar4' }, { name: 'baz4' }, { name: 'qux4' }, { name: 'cue4' },
      { name: 'foo5' }, { name: 'bar5' }, { name: 'baz5' }, { name: 'qux5' }, { name: 'cue5' },
      { name: 'foo6' }, { name: 'bar6' }, { name: 'baz6' }, { name: 'qux6' }, { name: 'cue6' },
      { name: 'foo7' }, { name: 'bar7' }, { name: 'baz7' }, { name: 'qux7' }, { name: 'cue7' },
      { name: 'foo8' }, { name: 'bar8' }, { name: 'baz8' }
    ],
    range: 8,
    page: 1
  },
  computed: {
    last: function () {
      return Math.ceil(this.items.length / this.range)
    },
    display: function () {
      var range = this.range,
          offset = range * (this.page - 1)

      return _.slice(this.items, offset, range + offset)
    }
  }
})