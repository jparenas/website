<template>
  <div style="position: relative;">
    <v-container id="navbar" fluid :class="navBarClasses">
      <v-row no-gutters>
        <h2>
          Juan Pablo Arenas Uribe
        </h2>
        <v-spacer />
        <v-switch v-model="$vuetify.theme.isDark" dense inset flat :ripple="false" :hide-details="true"
          prepend-icon="mdi-brightness-3" class="pt-0" style="margin-top: 6px !important;" />
        <v-btn href="https://github.com/jparenas" target="_blank" rel="noopener" icon color="gray">
          <v-icon>mdi-github</v-icon>
        </v-btn>
        <v-btn href="https://www.linkedin.com/in/juanpablo-arenas/" target="_blank" rel="noopener" icon color="gray">
          <v-icon>mdi-linkedin</v-icon>
        </v-btn>
        <v-btn rel="me" href="https://mastodon.jparenas.com/@jparenas" target="_blank" icon color="gray">
          <v-icon>mdi-mastodon</v-icon>
        </v-btn>
        <client-only>
          <v-btn :href="'mailto:' + decode('bWVAanBhcmVuYXMuY29t')" rel="noopener" icon color="gray">
            <v-icon>mdi-email</v-icon>
          </v-btn>
        </client-only>
      </v-row>
    </v-container>
    <style v-text="getGradientStyle" />
    <div id="background-cover">
      <div v-lazy-container="{ selector: 'img' }">
        <img id="background-cover" :data-srcset="coverSizes.srcSet"
          :data-loading="require('~/assets/images/background.jpg?lqip')">
      </div>
    </div>
    <v-container id="content" justify-center align-center class="px-0 pb-0">
      <v-row class="elevation-4">
        <v-col id="side-bar" sm="12" md="3"
          :class="'text-center grey ' + ($vuetify.theme.isDark ? 'darken-2' : 'lighten-3')">
          <div id="picture">
            <v-row justify="center" class="my-1">
              <v-avatar size="200" :style="`border: 5px solid ${$vuetify.theme.isDark ? 'gray' : 'white'};`">
                <img :src="require('~/assets/images/avatar.jpg?size=400').src" alt="Juan Pablo Arenas">
              </v-avatar>
            </v-row>
          </div>
          <client-only>
            <v-divider v-if="$vuetify.breakpoint.mdAndUp" class="mt-4" />
          </client-only>
          <scrollactive id="links" class="py-4">
            <a v-for="content in contents" :key="content.id" :href="`#${content.id}`" class="scrollactive-item">
              {{ content.title }} <br>
            </a>
          </scrollactive>
        </v-col>
        <v-col md="9" sm="12" :class="'pa-2 ' + ($vuetify.theme.isDark ? 'grey darken-4' : 'white')">
          <v-container class="pa-2 ma-0">
            <div v-for="(content, index) in contents" :key="content.id">
              <v-row class="mx-2 my-2">
                <v-container fluid class="pt-0">
                  <v-row>
                    <h2 :id="content.id" class="pb-3">
                      {{ content.title }}
                    </h2>
                  </v-row>
                  <v-row>
                    <div v-if="content.type === 'text'">
                      <SSRMarkdown :data="content.data.text" />
                      <v-container v-if="content.data.button !== undefined" fluid class="pb-0">
                        <v-row align="center" justify="center">
                          <v-col cols="auto">
                            <v-btn :href="content.data.button.url" target="_blank" rel="noopener" class="text-center">
                              <v-icon left>
                                {{ content.data.button.icon }}
                              </v-icon> {{ content.data.button.text }}
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-container>
                    </div>
                    <timeline v-else-if="content.type === 'timeline'" :items="content.data" />
                    <cards v-else-if="content.type === 'cards'" :items="content.data" :cols="content.cols" />
                    <list v-else-if="content.type === 'list'" :items="content.data" />
                    <span v-else v-text="`Error! Type not found: ${content.type}`" />
                  </v-row>
                </v-container>
              </v-row>
              <v-divider v-if="index !== contents.length - 1" class="my-4" />
            </div>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Cards from '@/components/cards.vue'
import List from '@/components/list.vue'
import SSRMarkdown from '@/components/ssr-markdown.vue'
import Timeline from '@/components/timeline.vue'

const coverSizes = require('~/assets/images/background.jpg?resize&sizes[]=1440&sizes[]=1080&sizes[]=720')

export default {
  components: {
    Cards,
    List,
    SSRMarkdown,
    Timeline
  },
  data() {
    return {
      contents: [],
      coverSizes,
      atTop: true
    }
  },
  fetch() {
    if (process.server) {
      this.contents = require('~/assets/content.json')
    }
  },
  computed: {
    navBarClasses() {
      let classes = 'py-2 px-2 ma-0 d-flex'
      if (!this.atTop) {
        classes += ' elevation-3 active-header'
      }
      return classes
    },
    getGradientStyle() {
      return `#background-cover:after {
      display: block;
      position: absolute;
      background: linear-gradient(to bottom,
      rgba(${this.$vuetify.theme.isDark ? '19, 19, 19' : '255, 255, 255'}, 0) 0%,
      rgba(${this.$vuetify.theme.isDark ? '19, 19, 19' : '255, 255, 255'}, 0) 90%,
      rgba(${this.$vuetify.theme.isDark ? '19, 19, 19' : '255, 255, 255'}, 1) 98%,
      rgba(${this.$vuetify.theme.isDark ? '19, 19, 19' : '255, 255, 255'}, 1) 100%);
      top: 0;
      height: 100vh;
      width: 100%;
      content: "";
      }`
    }
  },
  mounted() {
    window.addEventListener('scroll', this.checkAtTop)
    this.checkAtTop()
  },
  destroyed() {
    window.removeEventListener('scroll', this.checkAtTop)
  },
  methods: {
    checkAtTop() {
      this.atTop = window.scrollY === 0
    },
    decode(str) {
      if (!(process.client) || window === undefined) {
        return str
      }
      return window.atob(str)
    }
  }
}
</script>

<style scoped lang="scss">
@import "~vuetify/src/styles/styles.sass";

#side-bar {
  position: relative;
  padding-bottom: 0;
}

#links {
  position: sticky;
  top: 45px;
}

#background-cover {
  position: absolute;
  display: block;
  top: 0;
  height: 100vh;
  width: 100%;
}

#content {
  position: relative;
  padding-top: 300px;
  word-break: normal !important;
}

@media all and (max-width: map-get($grid-breakpoints, "md")) {
  #background-cover {
    position: static;
    display: block;
    top: 0;
    height: auto;
    width: 100%;
  }

  #background-cover:after {
    display: none;
  }

  #content {
    position: static;
    padding-top: 0px;
  }

  #picture {
    position: relative;
    top: -150px;
    margin-bottom: -150px;
  }
}

a.scrollactive-item,
a.scrollactive-item i {
  position: relative;
  transition: color 0.75s ease;
  color: var(--v-primary-base);
  text-decoration: none;
}

a.scrollactive-item:hover,
a.scrollactive-item i:hover {
  color: var(--v-primary-lighten1);
  text-decoration: none;
  cursor: pointer;
}

a.scrollactive-item:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 1px;
  bottom: 0;
  left: 0;
  background-color: #616161;
  visibility: hidden;
  transform: scaleX(0);
  transition: 0.2s ease-in-out;
}

a.scrollactive-item:hover:before {
  background: #757575;
  visibility: visible;
  transform: scaleX(1);
}

a.scrollactive-item.is-active,
a.scrollactive-item.is-active i {
  color: #29b6f6;
}

a.scrollactive-item.is-active:hover,
a.scrollactive-item.is-active i:hover {
  color: #4fc3f7;
}

a.scrollactive-item.is-active:before {
  background-color: #29b6f6;
}

a.scrollactive-item.is-active:hover:before {
  background-color: #4fc3f7;
}

#navbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9000;
  transition: box-shadow 0.2s ease-in-out;
}

#navbar.active-header {
  backdrop-filter: blur(20px);
}

::v-deep img[lazy="loading"] {
  filter: blur(15px);
}

::v-deep img[lazy="loaded"] {
  opacity: 0;
  animation-name: fadein;
  animation-duration: 0.5s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-direction: normal;
  animation-timing-function: ease-out;

  @keyframes fadein {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
}

::v-deep h2 {
  margin-top: -42px;
  padding-top: 42px;
}

::v-deep .v-input__append-outer {
  margin-left: 0 !important;
}

::v-deep .v-input__control {
  margin-top: 1px !important;
}

::v-deep .v-input--selection-controls__input {
  margin-right: 0px !important;
}
</style>
