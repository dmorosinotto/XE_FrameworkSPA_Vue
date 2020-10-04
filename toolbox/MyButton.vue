<template>
  <button type="button" :style="{ border: border }" @click="doCmd">
    {{ CMD }}
  </button>
</template>

<script setup="props, { emit }" lang="ts">
// PER SINTASSI SFC SETUP + TS VEDI: https://github.com/vuejs/rfcs/blob/sfc-improvements/active-rfcs/0000-sfc-script-setup.md#with-typescript
declare const props: {
  text: string;
  info?: any;
  color?: string;
  background?: string;
};
declare function emit(event: "click", cmd: string): void;
declare function emit(event: "do", { cmd: string, info: unknown }): void;

// EQUIVALE A VECCHIO computed
import { computed } from "vue";
export const CMD = computed(
  () => props.text.toUpperCase() + ((props as any)?.disabled ? "❌" : "✔️") //NOTARE TYPESAFE IN BASE A declare props
);
export const border = computed(() =>
  !props?.background
    ? `1px solid ${props.color || "var(--vue-blue, black)"}`
    : "none"
);

// EQUIVALE A VECCHIO methods
export const doCmd = () =>
  props.info == null
    ? emit("click", props.text) //NOTARE TYPESAFE IN BASE A DEFINIZIONE FIRMA declare emit
    : emit("do", { cmd: props.text, info: props.info });

// USATO PER AGGANCIARE ULTERIRORI ATTRIBUTI ALL TAG PRINCIPALE button -> disabled VEDI:  https://github.com/vuejs/rfcs/blob/sfc-improvements/active-rfcs/0000-sfc-script-setup.md#declaring-props-or-additional-options
export default { inheritAttrs: true };
</script>

<style scoped vars="{ color, background }">
/* PER SINTASSI SFC + style VARS VEDI: https://github.com/vuejs/rfcs/blob/sfc-improvements/active-rfcs/0000-sfc-style-variables.md */
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
button {
  background: var(--background, none);
  color: var(--color, var(--vue-blue, black));
  border-radius: 5px;
  padding: 10px 25px;
  font-size: 16px;
  cursor: pointer;
}
button:hover {
  filter: brightness(150%);
}
</style>
