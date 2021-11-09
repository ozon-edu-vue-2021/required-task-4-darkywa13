<template>
  <fieldset class="fieldset-grid">
    <legend v-if="legend">{{ legend }}</legend>

    <slot />
  </fieldset>
</template>

<script>
export default {
  props: {
    legend: {
      type: String,
      required: false,
      default: "",
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.fieldset-grid {
  padding: 0;
  margin: 0;
  margin-bottom: 30px;
  border: none;
}

.fieldset-grid:last-child {
  margin-bottom: 0;
}

.fieldset-grid legend {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
