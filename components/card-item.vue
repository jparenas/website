<template>
  <v-card elevation="1">
    <div class="d-flex flex-no-wrap justify-left align-center text-center pl-2 py-1">
      <div
        v-if="item.image"
        v-lazy-container="{ selector: 'img' }"
      >
        <v-avatar
          class="ma-1"
          size="75"
          tile
        >
          <img
            :data-src="getImage().src"
            :data-loading="getLqipImage()"
          >
        </v-avatar>
      </div>

      <v-card-title class="pl-2 pr-0 py-2">
        <v-container
          fluid
          class="py-0 ma-0"
        >
          <v-row v-text="item.title" />
          <div v-if="item.subtitles">
            <v-row
              v-for="(subtitle, index) in item.subtitles"
              :key="index"
              class="font-weight-light subtitle-1"
              v-text="subtitle"
            />
          </div>
        </v-container>
      </v-card-title>
    </div>
    <v-card-text
      v-if="item.text !== undefined"
      class="pt-0 pb-2"
    >
      <SSRMarkdown :data="item.text" />
    </v-card-text>
  </v-card>
</template>

<script>
import SSRMarkdown from './ssr-markdown.vue'

export default {
  components: {
    SSRMarkdown
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    getImage (option) {
      return require(`~/assets/images/icons/${this.item.image}?size=75`)
    },
    getLqipImage (option) {
      return require(`~/assets/images/icons/${this.item.image}?lqip`)
    }
  }
}
</script>

<style scoped>
img[lazy="loading"] {
  filter: blur(15px);
}
</style>
