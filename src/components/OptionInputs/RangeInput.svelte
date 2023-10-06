<script lang="ts">
  import { RangeSlider } from "@skeletonlabs/skeleton";
  import OptionInput from "./OptionInput.svelte";
  export let value: number;
  export let id: string;
  export let step = 1;
  export let max: number = 100;
  export let min = 1;
</script>

<OptionInput column>
  <RangeSlider name={id} {id} bind:value {step} bind:max bind:min on:change>
    <div class="flex justify-between gap-5 pr-5 items-center">
      <label for={id}><slot /> </label>
      <div class="text-sm font-semibold">
        {value} / {max}
      </div>
    </div>
  </RangeSlider>
</OptionInput>
