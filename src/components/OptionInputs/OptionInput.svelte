<script>
  export let column = false;
</script>

<div
  class="flex w-full gap-x-4 gap-y-2"
  class:items-center={!column}
  class:justify-center={column}
  class:flex-col={column}
>
  <slot />
</div>
