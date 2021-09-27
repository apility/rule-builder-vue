const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280
}

let _width = window.innerWidth

export default {
  data: () => ({
    width: _width
  }),

  created() {
    window.addEventListener('resize', () => {
      _width = window.innerWidth
      this.$set(this, 'width', _width)
    })
  },

  computed: {
    breakpoints () {
      return {
        sm: this.width <= breakpoints.md,
        md: this.width <= breakpoints.lg,
        lg: this.width <= breakpoints.xl,
        xl: this.width > breakpoints.xl
      }
    }
  },
}