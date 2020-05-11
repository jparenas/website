<template>
  <v-container fluid>
    <list-item
      v-for="item in items"
      :key="item.id"
      :item="item"
      class="mb-2"
    />
  </v-container>
</template>

<script>
import ListItem from './list-item.vue'

export default {
  components: {
    ListItem
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>
