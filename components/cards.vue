<template>
  <v-container fluid>
    <v-row
      dense
      justify="center"
    >
      <v-col
        v-for="item in items"
        :key="item.id"
        :lg="cols"
        md="6"
        sm="6"
      >
        <card-item :item="item" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CardItem from './card-item.vue'

export default {
  components: {
    CardItem
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    cols: {
      type: Number,
      default: 6
    }
  }
}
</script>
