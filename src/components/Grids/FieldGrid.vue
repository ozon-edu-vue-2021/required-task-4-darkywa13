<template>
  <div :class="['field-grid', { 'field-grid_error': error }]">
    <label v-if="label" :for="fieldName">
      {{ label }}

      <button
        v-if="error"
        type="button"
        class="field-grid__error-info"
        :title="error"
        @click="showAlert"
      >
        i
      </button>
    </label>

    <slot />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: false,
      default: "",
    },
    fieldName: {
      type: String,
      required: false,
      default: "",
    },
    error: {
      type: String,
      required: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    showAlert() {
      window.alert(this.error);
    },
  },
};
</script>

<style scoped>
.field-grid {
  flex: 1;
}

.field-grid label {
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
  color: #8a8a8a;
}

.field-grid_error label {
  color: red;
}

.field-grid__error-info {
  margin-left: 5px;
  display: inline-flex;
  width: 16px;
  height: 16px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: red;
  color: #fff;
  outline: none;
  border: none;
}

.field-grid__error-info:hover {
  cursor: pointer;
}

@media screen and (max-width: 520px) {
  .field-grid {
    flex: auto;
  }
}
</style>
