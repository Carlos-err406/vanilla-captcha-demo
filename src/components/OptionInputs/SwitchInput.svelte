<script lang="ts">
  import { SlideToggle } from "@skeletonlabs/skeleton";
  import OptionInput from "./OptionInput.svelte";
  export let id: string;
  export let value = false;
</script>

<OptionInput column>
  <div class="flex gap-2 items-center flex-col justify-center">
    <label for={id}><slot /> ({value ? "Yes" : "No"})</label>
    <SlideToggle name={id} bind:checked={value} />
  </div>
</OptionInput>
