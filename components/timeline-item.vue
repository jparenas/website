<template>
  <v-timeline-item :color="item.color !== undefined ? item.color : 'red lighten-2'">
    <v-card elevation="2">
      <div class="d-flex flex-no-wrap justify-space-between align-center">
        <div v-lazy-container="{ selector: 'img' }">
          <v-avatar
            class="ma-3"
            size="125"
            tile
          >
            <img
              :data-src="getImage().src"
              :data-loading="getLqipImage()"
            >
          </v-avatar>
        </div>

        <div>
          <v-card-title
            class="headline py-2"
            style="word-break: normal;"
          >
            <v-container
              fluid
              class="py-0 my-0"
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
          <v-card-text>
            <SSRMarkdown :data="item.text" />
          </v-card-text>
        </div>
      </div>
    </v-card>
  </v-timeline-item>
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
    getImage () {
      return require(`~/assets/images/icons/${this.item.image}?size=125`)
    },
    getLqipImage () {
      return require(`~/assets/images/icons/${this.item.image}?lqip`)
    }
  }
}
</script>
