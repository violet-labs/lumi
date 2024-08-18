<template>
  <label v-if="label && label.trim() !== ''" :for="id" class="form-label" :class="labelClass">{{ label }}
    <span v-if="required" class="text-danger">*</span>
  </label>
  <input :id="id" :type="type" class="form-control" :class="getClasses(size, centered)" :name="name" :value="modelValue"
    :placeholder="placeholder" :isRequired="isRequired" :disabled="disabled" :readonly="readonly"
    @input="$emit('update:modelValue', $event.target.value); inputEvent();"
    v-maska="mask"
    />
</template>

<script>
import setMaterialInput from "@/assets/js/material-input.js";
import { vMaska } from "maska/vue"

export default {
  name: "MaterialInput",
  directives: { maska: vMaska },
  props: {
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
      required: true,
    },
    modelValue: {
      type: String,
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
    inputEvent() {
      if (this.input)
        this.input()
    },

    getClasses: (size, centered) => {
      let sizeValue;

      sizeValue = size ? `form-control-${size}` : '';

      if (centered)
        sizeValue += ' text-center'

      return sizeValue;
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
