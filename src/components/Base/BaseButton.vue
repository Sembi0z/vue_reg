<template>
  <button
    :type="type"
    :class="classnames($style.btn, $style[variant])"
    :disabled="disabled"
    @click="handleButtonClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import classnames from "classnames";

export interface IBaseButton {
  type?: "button" | "submit";
  disabled?: boolean;
  variant?: "blue" | "primary__600" | "white";
  loading?: boolean;
}

const emit = defineEmits<{
  (e: "on-click"): void;
}>();

withDefaults(defineProps<IBaseButton>(), {
  type: "button",
  disabled: false,
  variant: "blue",
  loading: false,
});

const handleButtonClick = () => {
  emit("on-click");
};
</script>

<style module>
.btn {
  cursor: pointer;
  font-size: 14px;
  line-height: 20px;
  font-family: sans-serif;
  font-weight: bold;
  padding: 12px 16px;
  border-radius: 8px;
  color: #fff;
  background-color: #007aff;
  border: none;
  transition: box-shadow 0.15s ease-in-out;
}
.btn:hover {
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.16);
}

.blue {
  background-color: #007aff;
  border: none;
  color: #fff;
}

.primary__600 {
  background-color: #7f56d9;
  border: none;
  color: #fff;
}
.white {
  background-color: #fff;
  border: 1px solid #d0d5dd;
  color: #000;
}
</style>
