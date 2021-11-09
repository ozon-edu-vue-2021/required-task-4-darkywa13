<template>
  <field-grid :label="label" :field-name="fieldNameId" :error="error">
    <div v-click-outside="hideDropdown" class="field-select" :style="{ width }">
      <div
        :class="[
          'field-select__activator',
          {
            'field-select__activator_is-open': isDropdownOpen,
            'field-select__activator_is-empty': !value,
            'field-select__activator_has-error': hasError,
          },
        ]"
        @click="isDropdownOpen = !isDropdownOpen"
      >
        <div class="field-select__activator-label">{{ selectedLabel }}</div>
      </div>

      <!-- Здесь можно было бы реализовать расчет позиций и открывать в нужном направлении -->
      <div v-show="isDropdownOpen" class="dropdown">
        <div v-if="withSearch" class="dropdown__search">
          <input
            v-model="searchValue"
            :id="fieldNameId"
            class="dropdown__search-input"
          />
        </div>

        <ul v-if="visibleItems.length > 0" class="dropdown__list">
          <li
            v-for="item in visibleItems"
            :key="item.value"
            class="dropdown__item"
            @click="select(item)"
          >
            {{ item.label }}
          </li>
        </ul>

        <div v-else class="dropdown__empty">Нет доступных элементов</div>
      </div>
    </div>
  </field-grid>
</template>

<script>
import ClickOutside from "vue-click-outside";
import FieldGrid from "../Grids/FieldGrid.vue";
import { debounce } from "../../helpers";

export default {
  components: { FieldGrid },
  model: {
    event: "input",
    prop: "value",
  },
  directives: {
    ClickOutside,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    value: {
      type: Object,
      required: false,
      default: null,
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
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
    placeholder: {
      type: String,
      required: false,
      default: "",
    },
    width: {
      type: String,
      required: false,
      default: "auto",
    },
    withSearch: {
      type: Boolean,
      required: false,
      default: false,
    },
    error: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      isDropdownOpen: false,
      searchValue: "",
      visibleItems: [],
      debouncedSearch: null,
    };
  },
  computed: {
    fieldNameId() {
      return this.fieldName ? "field-select-" + this.fieldName : "";
    },
    selectedLabel() {
      return this.value?.label || this.placeholder;
    },
    hasError() {
      return Boolean(this.error);
    },
  },
  watch: {
    searchValue(val) {
      this.debouncedSearch(val);
    },
  },
  created() {
    this.visibleItems = this.items;
    this.debouncedSearch = debounce(this.search, 200);
  },
  methods: {
    hideDropdown() {
      this.isDropdownOpen = false;
    },
    select(item) {
      this.$emit("input", item);
      this.hideDropdown();
    },
    search(searchWord) {
      this.visibleItems = this.items.filter((item) =>
        item.label.includes(searchWord)
      );
    },
  },
};
</script>

<style scoped>
.field-select {
  position: relative;
  max-width: 100%;
}

.field-select__activator {
  border: 1px solid #cdcdcd;
  border-radius: 3px;
  height: 40px;
  padding: 0 10px;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 14px;
}

.field-select__activator:hover {
  cursor: pointer;
}

.field-select__activator::after {
  margin-left: 15px;
  content: "\25bc";
}

.field-select__activator_is-open::after {
  content: "\25b2";
}

.field-select__activator-label {
  flex: 1;
}

.field-select__activator_is-empty {
  color: #8a8a8a;
}

.field-select__activator_has-error {
  color: red;
  border-color: red;
}

.dropdown {
  position: absolute;
  width: 100%;
  z-index: 10;
  top: 50px;
  left: 0;
  background-color: #ffffff;
  border-radius: 3px;
  box-shadow: 0px 2px 5px rgb(0 0 0 / 30%);
  padding: 10px 0;
}

.dropdown__search {
  padding: 10px;
}

.dropdown__search-input {
  border: 1px solid #cdcdcd;
  border-radius: 3px;
  height: 40px;
  padding: 0 10px;
  outline: none;
  width: 100%;
}

.dropdown__search-input:focus {
  border-color: #8a8a8a;
}

.dropdown__list {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 200px;
  overflow: auto;
}

.dropdown__item {
  padding: 10px;
}

.dropdown__item:hover {
  background-color: #eeeeee;
  cursor: pointer;
}

.dropdown__empty {
  text-align: center;
  padding: 10px;
  font-weight: bold;
  color: red;
}
</style>
