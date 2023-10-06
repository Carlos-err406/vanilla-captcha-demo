<script lang="ts">
  import type { IOption } from "$lib";
  import OptionInput from "./OptionInput.svelte";

  export let id: string;
  export let value: any;
  export let options: IOption[];
</script>

<OptionInput column>
  <label for="options-font-weight">
    <slot />
  </label>
  <select {id} class="select select-text input px-2 py-1.5" bind:value on:change>
    {#if options}
      {#each options as { value, label } (label)}
        <option {value}>{label}</option>
      {/each}
    {/if}
  </select>
</OptionInput>
