<template>
  <label v-if="label && label.trim() !== ''" :for="id" class="form-label" :class="labelClass">{{ label }}
    <span v-if="required" class="text-danger">*</span>
  </label>
  <input :id="id" :name="name" :type="type" :isRequired="isRequired" :readonly="readonly" :disabled="disabled"
    class="form-control" :class="getClasses(size, centered)" :placeholder="placeholder" :value="modelValue"
    @input="($event) => { $emit('update:modelValue', $event.target.value); inputEvent($event); }" v-maska="mask" :style="style" :ref="id" />
</template>

<script>
import setMaterialInput from "@/assets/js/material-input.js";
import { vMaska } from "maska/vue"

export default {
  name: "MaterialInput",
  directives: { maska: vMaska },
  props: {
    class: {
      type: String,
      default: '',
    },
    style: {
      type: String,
      default: '',
    },
    mask: {
      type: String,
      default: null,
    },
    required: {
      type: Boolean,
      default: false,
    },
    input: {
      type: Function,
      default: null,
    },
    variant: {
      type: String,
      default: "outline",
    },
    label: {
      type: String,
      default: "",
    },
    labelClass: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "default",
    },
    success: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    centered: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      required: false,
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue", 'input'],
  mounted() {
    setMaterialInput();
  },
  methods: {
    inputEvent($event) {
      if (this.input)
        this.input($event)
    },

    getClasses: function (size, centered) {
      let classes;

      classes = size ? `form-control-${size}` : '';

      if (centered)
        classes += ' text-center'

      if (this.class)
        classes += ' ' + this.class

      return classes;
    },
    getStatus: (error, success) => {
      let isValidValue;

      if (success) {
        isValidValue = "is-valid";
      } else if (error) {
        isValidValue = "is-invalid";
      } else {
        isValidValue = null;
      }

      return isValidValue;
    },
  },
};
</script>
