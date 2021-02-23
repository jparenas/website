<template>
  <v-app dark>
    <v-main>
      <nuxt />
    </v-main>
    <v-footer
      :absolute="false"
      class="mt-1"
      style="z-index: 0;"
    >
      <v-col
        class="text-center"
        cols="12"
      >
        Juan Pablo Arenas Uribe &copy; {{ new Date().getFullYear() }}
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
}
</script>
