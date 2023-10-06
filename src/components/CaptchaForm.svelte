<script lang="ts">
  import CaptchaImg from "./CaptchaImg.svelte";
  import ButtonPrimary from "./ButtonPrimary.svelte";
  import ButtonSecondary from "./ButtonSecondary.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let src: string;
  export let type: "browser" | "server";
  let value: string;
  const handleSubmit = () => {
    dispatch("submit", value);
    handleReload();
  };
  const handleReload = () => {
    value = "";
    dispatch("reload");
  };
</script>

<form
  action=""
  on:submit|preventDefault={handleSubmit}
  class="w-full h-full flex flex-none justify-center"
>
  <div class="w-fit flex flex-col items-center gap-4">
    <h2 class="h2">
      <span
        class="bg-gradient-to-br bg-clip-text text-transparent box-decoration-clone whitespace-nowrap"
        class:from-blue-500={type === "server"}
        class:to-cyan-300={type === "server"}
        class:from-orange-500={type === "browser"}
        class:to-red-500={type === "browser"}
      >
        Generated in {type}
      </span>
    </h2>
    <CaptchaImg captcha={src} on:click={handleReload} />
    <input
      type="text"
      placeholder="captcha"
      bind:value
      class="input w-80 px-4 py-2"
    />
    <footer>
      <ButtonSecondary type="button" on:click={handleReload}>
        Reset
      </ButtonSecondary>
      <ButtonPrimary>Submit</ButtonPrimary>
    </footer>
  </div>
</form>
