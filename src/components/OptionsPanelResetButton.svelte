<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { refresh } from "$lib/icons";
  import { scale } from "svelte/transition";
  import ButtonSecondary from "./ButtonSecondary.svelte";
  const dispatch = createEventDispatcher();
  const handleReset = () => dispatch("reset");
</script>

<div class="absolute top-10 right-10 sm:top-1 sm:-right-8">
  <div class="relative">
    <ButtonSecondary
      isIcon
      title="Resets only the styles of the captcha not the answer"
      on:click={handleReset}
      classes="active:-rotate-[180deg] transition-all duration-300 hover:rotate-[45deg]"
    >
      {@html refresh}
    </ButtonSecondary>
  </div>
</div>
