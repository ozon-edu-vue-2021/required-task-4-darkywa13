<template>
  <div :class="['radio-group', { 'radio-group_has-error': hasError }]">
    <!-- Здесь желательно бы реализовать представление RadioButton отдельно -->
    <div v-for="(option, index) in options" :key="index" class="radio-button">
      <input
        :value="option"
        type="radio"
        :id="option"
        :name="radioName"
        @change="$emit('input', $event.target.value)"
      />
      <label :for="option">{{ option }}</label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    radioName: {
      type: String,
      required: true,
    },
    error: {
      type: String,
      required: false,
    },
  },
  computed: {
    hasError() {
      return Boolean(this.error);
    },
  },
  methods: {
    change($event) {
      this.$emit("input", $event.target.value);
    },
  },
};
</script>

<style scoped>
.radio-group {
  width: fit-content;
  display: flex;
}

.radio-button {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.radio-button:last-child {
  margin-right: 0;
}

.radio-button label {
  padding-left: 10px;
  font-size: 14px;
}

.radio-group_has-error label {
  color: red;
}

.radio-button input {
  width: 20px;
  height: 20px;
}
</style>
