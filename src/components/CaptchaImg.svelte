<script lang="ts">
  export let captcha: string;
</script>

<button type="button" on:click>
  <img src={captcha} alt="captcha" class="rounded-md hover:scale-105 transition-all duration-200 hover:shadow-md"/>
</button>
