<script lang="ts">
  export let type: "submit" | "button" = "submit";
  export let isIcon = false;
  export let title = "";
</script>

<button
  {type}
  {title}
  class="btn btn-md variant-outline-primary"
  class:btn-icon={isIcon}
  on:click
>
  <slot />
</button>
