<script lang="ts">
  import OptionInput from "./OptionInput.svelte";
  export let value: string;
  export let id: string;
  export let placeholder = "";
</script>

<OptionInput column>
  <label for={id}><slot /> {value}</label>
  <input {id} type="text" class="input py-1 px-2" {placeholder} bind:value />
</OptionInput>
