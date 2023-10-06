<script lang="ts">
  export let type: "submit" | "button" = "submit";
  export let isIcon = false;
  export let title = "";
  export let classes = ""
</script>

<button
  {type}
  {title}
  class="btn btn-md variant-outline-primary {classes}"
  class:btn-icon={isIcon}
  on:click
>
  <slot />
</button>
