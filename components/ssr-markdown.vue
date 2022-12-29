<template>
  <span ref="span" v-html="text" />
</template>

<script>
import MarkdownIt from 'markdown-it';

export default {
  props: {
    data: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      text: ''
    }
  },
  fetch() {
    if (process.server) {
      const md = MarkdownIt({
        breaks: true
      })
      this.text = md.render(this.data)
    }
  }
}
</script>
