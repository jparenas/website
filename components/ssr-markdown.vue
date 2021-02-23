<template>
  <span
    ref="span"
    v-html="text"
  />
</template>

<script>
export default {
  props: {
    data: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      text: ''
    }
  },
  fetch () {
    if (process.server) {
      const md = require('markdown-it')({
        breaks: true
      })
      this.text = md.render(this.data)
    }
  }
}
</script>
