<script lang="ts">
  import { PUBLIC_AUTO_REGENERATE_INTERVAL as i } from "$env/static/public";
  import {
    deepCopy,
    fontWeightOptions,
    getDefaultDependant,
    getDefaultExtra,
    getInitialUtilities,
    type ExtraOptions,
  } from "$lib";
  import { refresh } from "$lib/icons";
  import { createEventDispatcher, onMount } from "svelte";
  import { scale } from "svelte/transition";
  import {
    getImageSyncGenerationOptions,
    type CaptchaSyncOptions,
  } from "vanilla-captcha/utils";
  import ButtonSecondary from "./ButtonSecondary.svelte";
  import ColorInput from "./OptionInputs/ColorInput.svelte";
  import RangeInput from "./OptionInputs/RangeInput.svelte";
  import SelectInput from "./OptionInputs/SelectInput.svelte";
  import SwitchInput from "./OptionInputs/SwitchInput.svelte";
  import TextInput from "./OptionInputs/TextInput.svelte";
  export let options: CaptchaSyncOptions;
  let optionsCP = deepCopy(options);
  export let extra: ExtraOptions = getDefaultExtra();
  let extraCP = deepCopy(extra);
  const dispatch = createEventDispatcher();
  let dependant = getDefaultDependant();
  let utilities = getInitialUtilities();

  const setUtilitiesBounds = () => {
    if (window.innerWidth > 768) {
      utilities.maxWidth = parseInt((window.innerWidth / 2 - 20).toFixed(0));
    } else {
      utilities.maxWidth = window.innerWidth - 20;
    }
    if (optionsCP.width > utilities.maxWidth) {
      optionsCP.width = utilities.maxWidth;
    }
    utilities.maxHeight = parseInt((window.innerHeight / 2 - 140).toFixed(0));
  };

  let intervalID: NodeJS.Timeout;
  const seconds = parseInt(i);
  let timeUntilRegenerate = 0;
  const dispatchRegenerateImage = () => {
    clearInterval(intervalID);
    timeUntilRegenerate = seconds;
    intervalID = setInterval(() => {
      --timeUntilRegenerate;
      if (timeUntilRegenerate === 0) {
        options = deepCopy(optionsCP);
        extra = deepCopy(extraCP);
        dispatch("regenerate-image", { options, extra });
        clearInterval(intervalID);
      }
    }, 1000);
  };

  $: JSON.stringify({ x: optionsCP, y: extraCP }) !=
    JSON.stringify({ x: options, y: extra }) && dispatchRegenerateImage();

  onMount(() => {
    setUtilitiesBounds();
    window.addEventListener("resize", setUtilitiesBounds);
  });

  $: optionsCP = {
    ...optionsCP,
    font: `${dependant.fontWeight} ${dependant.fontSize}px ${dependant.font}`,
  };

  const handleReset = () => {
    optionsCP = getImageSyncGenerationOptions();
    options = deepCopy(optionsCP);
    clearInterval(intervalID);
    timeUntilRegenerate = 0;
    dependant = getDefaultDependant();
    extraCP = getDefaultExtra();
    extra = deepCopy(extraCP);
    dispatch("reset-options");
  };
</script>

<div
  class="relative w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-7 px-3"
>
  <ColorInput bind:value={optionsCP.backgroundColor} id="options-bg-color">
    Background Color
  </ColorInput>
  <ColorInput bind:value={optionsCP.fontColor} id="options-font-color">
    Font Color
  </ColorInput>
  <ColorInput bind:value={optionsCP.lineColor} id="options-line-color">
    Lines Color
  </ColorInput>
  <RangeInput
    id="options-height"
    bind:value={optionsCP.height}
    bind:max={utilities.maxHeight}
  >
    Canvas height
  </RangeInput>
  <RangeInput id="options-font-size" bind:value={dependant.fontSize}>
    Font size
  </RangeInput>
  <RangeInput id="options-line-width" bind:value={optionsCP.lineWidth} max={10}>
    Line width
  </RangeInput>
  <RangeInput
    id="options-width"
    bind:value={optionsCP.width}
    bind:max={utilities.maxWidth}
  >
    Canvas Width
  </RangeInput>
  <RangeInput
    id="options-character-amount"
    bind:value={extraCP.characterAmount}
    min={0}
    max={15}
  >
    Character amount
  </RangeInput>
  <RangeInput
    id="options-line-amount"
    bind:value={optionsCP.lineAmount}
    min={0}
    max={30}
  >
    Lines amount
  </RangeInput>

  <SelectInput
    id="options-font-weight"
    options={fontWeightOptions}
    bind:value={dependant.fontWeight}
  >
    Font weight
  </SelectInput>
  <TextInput placeholder="Arial" bind:value={dependant.font} id="options-font">
    Font
  </TextInput>
  <SwitchInput id="options-case-sensitive" bind:value={extraCP.caseSensitive}>
    Case sensitive
  </SwitchInput>

  <div class="absolute top-0 -right-9">
    <div class="relative">
      <ButtonSecondary
        isIcon
        title="Resets only the styles of the captcha not the answer"
        on:click={handleReset}
      >
        {@html refresh}
      </ButtonSecondary>
      {#if timeUntilRegenerate > 0}
        <span
          transition:scale
          class="absolute -top-1 -right-2 chip variant-glass-primary p-1 rounded-full px-2"
        >
          {timeUntilRegenerate}
        </span>
      {/if}
    </div>
  </div>
</div>
