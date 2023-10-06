<script lang="ts">
  export let captcha: string;
</script>

<button
  title="refresh captcha"
  type="button"
  class:placeholder={!captcha}
  class:animate-pulse={!captcha}
  class:w-[345px]={!captcha}
  class:h-[96px]={!captcha}
  class:cursor-pointer={captcha}
  class:cursor-default={!captcha}
  on:click
>
  {#if captcha}
    <img
      src={captcha}
      alt="captcha"
      class="rounded-md hover:scale-105 transition-all duration-200 hover:shadow-md"
    />
  {/if}
</button>
