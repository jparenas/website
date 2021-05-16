<template>
  <v-card>
    <div class="d-flex flex-no-wrap justify-left align-center w-100">
      <div
        v-if="item.image !== undefined"
        v-lazy-container="{ selector: 'img' }"
        class="ma-1"
      >
        <img
          :data-src="getImage().src"
          :data-loading="getLqipImage()"
        >
      </div>
      <div class="flex-grow-1">
        <v-card-title class="py-1">
          <v-container
            fluid
            class="pa-0 d-flex text-center justify-left align-center"
          >
            <span>{{ item.title }}</span>
            <v-spacer />
            <v-tooltip
              v-for="url in item.urls"
              :key="url.url"
              :disabled="url.tooltip === undefined"
              top
            >
              <template #activator="{ on }">
                <v-btn
                  :href="url.url"
                  target="_blank"
                  rel="noopener"
                  icon
                  color="gray"
                  v-on="on"
                >
                  <v-icon>{{ url.icon }}</v-icon>
                </v-btn>
              </template>
              <span>{{ url.tooltip }}</span>
            </v-tooltip>
          </v-container>
        </v-card-title>
        <v-divider class="mx-2" />
        <v-card-text
          v-if="item.text"
          class="pt-1 pb-2"
        >
          <SSRMarkdown :data="item.text" />
        </v-card-text>
      </div>
    </div>
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
