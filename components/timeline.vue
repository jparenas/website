<template>
  <v-timeline dense>
    <TimelineItem
      v-for="item in items"
      :key="item.id"
      :item="item"
    />
  </v-timeline>
</template>

<script>
import TimelineItem from './timeline-item.vue'

export default {
  components: {
    TimelineItem
  },
  props: {
    items: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>
