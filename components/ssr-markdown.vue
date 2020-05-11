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
  fetch () {
    const md = require('markdown-it')({
      breaks: true
    })
    this.text = md.render(this.data)
  },
  data () {
    return {
      text: ''
    }
  }
}
</script>
