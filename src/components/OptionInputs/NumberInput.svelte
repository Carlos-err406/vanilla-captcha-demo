<script lang="ts">
  import OptionInput from "./OptionInput.svelte";
  export let value: number;
  export let id: string;
  export let min: number;
  export let max: number;
</script>

<OptionInput column>
  <label for={id}><slot /> {value}</label>
  <input {id} type="number" class="input py-1 px-2" {min} {max} bind:value />
</OptionInput>
