<template>
  <div class="input-wrapper">
    <label :for="name">
      {{ name || "NO Label" }}:
      <small>{{ error }}</small>
    </label>
    <input
      :id="name"
      type="text"
      v-bind="$attrs"
      :value="value"
      @input="handle($event.target.value)"
    />
  </div>
</template>

<script setup="props, { emit }" lang="ts">
declare const props: {
  name: string;
  value?: string;
  required?: boolean;
  minlength?: number;
};
declare function emit(event: "update", payload: updateEvent): void;
export type updateEvent = { name: string; value?: string; errors: string[] };

//EQUIVALE A VECCHIO METHOD
export function handle(value?: string) {
  emit("update", { value, name: props.name, errors: validate(value) });
}
export function validate(value?: string | null): string[] {
  //VALIDATION RULE FATTE A MANO...
  const err: string[] = [];
  if (props.required && !value) err.push(`Campo ${name} obbligatorio!`);
  if (props.minlength && value?.length! < props.minlength)
    err.push(
      `${props.name} deve essere di almeno ${props.minlength} caratteri!`
    );
  return err; //RITORNA ARRAY DEGLI ERRORI -> valid SE VUOTO!
}

// EQUIVALE A VECCHIO computed
import { computed } from "vue";
export const error = computed(() => {
  return validate(props.value)[0]; //MOSTRA IL PRIMO ERRORE SE C'E' ALTRIMENTI undefined
});

// USATO PER NON AGGANCIARE ULTERIRORI ATTRIBUTI AL TAG PRINCIPALE MA TRAMITE $attr -> input VEDI:  https://github.com/vuejs/rfcs/blob/sfc-improvements/active-rfcs/0000-sfc-script-setup.md#declaring-props-or-additional-options
export default { inheritAttrs: true };
</script>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  text-align: start;
}
label {
  display: flex;
  text-transform: capitalize;
  justify-content: space-between;
}
small {
  color: var(--warn, red);
}
input {
  background: white;
  border: 1px solid var(--vue-green, silver);
  border-radius: 5px;
  padding: 10px;
  margin: 5px 0;
  font-size: 16px;
}
</style>
