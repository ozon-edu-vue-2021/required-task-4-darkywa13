<template>
  <field-grid :label="label" :field-name="fieldNameId" :error="error">
    <input
      :class="[
        'field-text',
        { 'field-text_is-empty': !value, 'field-text_has-error': hasError },
      ]"
      :id="fieldNameId"
      :value="value"
      :type="type"
      :required="required"
      :placeholder="placeholder"
      @input="input"
    />
  </field-grid>
</template>

<script>
import FieldGrid from "../Grids/FieldGrid.vue";

export default {
  components: { FieldGrid },
  model: {
    event: "input",
    prop: "value",
  },
  props: {
    value: {
      type: [String, Number],
      required: false,
      default: "",
    },
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
    type: {
      type: String,
      required: false,
      default: "text",
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
    placeholder: {
      type: String,
      required: false,
    },
    error: {
      type: String,
      required: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    fieldNameId() {
      return this.fieldName ? "field-text-" + this.fieldName : "";
    },
    hasError() {
      return Boolean(this.error);
    },
  },
  methods: {
    input($event) {
      const value = $event.target.value;

      this.$emit("input", value);
    },
  },
};
</script>

<style scoped>
.field-text {
  border: 1px solid #cdcdcd;
  border-radius: 3px;
  height: 40px;
  padding: 0 10px;
  outline: none;
  width: 100%;
  font-size: 14px;
}

.field-text:focus {
  border-color: #8a8a8a;
}

.field-text_is-empty[type="date"]:not(:focus) {
  color: #8a8a8a;
}

.field-text_has-error,
.field-text_has-error[type="date"]:not(:focus) {
  border-color: red;
  color: red;
}
</style>
