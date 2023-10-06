<script lang="ts">
  import OptionInput from "./OptionInput.svelte";
  export let value: string;
  export let id: string;
</script>

<OptionInput>
  <input {id} type="color" class="input" bind:value />
  <div>
    <label class="flex flex-col gap-0" for={id}>
      <slot />
      <span>{value}</span>
    </label>
  </div>
</OptionInput>
