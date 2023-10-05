<script lang="ts">
  import type { ExtraOptions } from "$lib";
  import { createEventDispatcher } from "svelte";
  import {
    getImageSyncGenerationOptions,
    type CaptchaSyncOptions,
  } from "vanilla-captcha/utils";
  import ButtonPrimary from "./ButtonPrimary.svelte";
  import ButtonSecondary from "./ButtonSecondary.svelte";
  const dispatch = createEventDispatcher();
  export let options: CaptchaSyncOptions = getImageSyncGenerationOptions();
  const getDefaultExtra = () => ({
    characterAmount: 4,
    caseSensitive: false,
  });
  export let extra: ExtraOptions = getDefaultExtra();
  const getDefaultDependant = () => ({
    font: "Arial",
    fontWeight: "Bold",
    fontSize: 30,
  });
  let dependant = getDefaultDependant();

  $: options = {
    ...options,
    font: `${dependant.fontWeight} ${dependant.fontSize}px ${dependant.font}`,
  };
  const setWidthBoundries = (element: HTMLInputElement) => {
    element.min = "1";
    element.max = "" + (window.innerWidth / 2 - 40);
  };
  const setHeightBoundries = (element: HTMLInputElement) => {
    element.min = "1";
    element.max = "" + (window.innerHeight / 2 - 140);
  };

  const handleSubmitOptions = () => {
    console.log(options);
    dispatch("options-change", { options, extra });
  };

  const handleReset = () => {
    options = getImageSyncGenerationOptions();
    dependant = getDefaultDependant();
    extra = getDefaultExtra();
    dispatch("reset-options");
  };
</script>

<div class="w-full h-full grid grid-cols-3 gap-x-2 gap-y-7 p-3">
  <div class="flex items-center gap-4">
    <input
      id="options-bg"
      type="color"
      class="input"
      bind:value={options.backgroundColor}
    />
    <label for="options-bg">Background color {options.backgroundColor}</label>
  </div>

  <div class="flex items-center gap-4">
    <input
      id="options-font-color"
      type="color"
      class="input"
      bind:value={options.fontColor}
    />
    <label for="options-font-color">Font color {options.fontColor}</label>
  </div>

  <div class="flex items-center gap-4">
    <input
      id="options-lines-color"
      type="color"
      class="input"
      bind:value={options.lineColor}
    />
    <label for="options-lines-color">Lines color {options.lineColor}</label>
  </div>

  <div class="flex gap-2 flex-col justify-center">
    <label for="options-canvas-height">Canvas height {options.height}</label>
    <input
      type="range"
      class="input"
      bind:value={options.height}
      use:setHeightBoundries
    />
  </div>
  <div class="flex gap-2 flex-col justify-center">
    <label for="options-font-size">Font size {dependant.fontSize}px</label>
    <input
      id="options-font-size"
      type="range"
      class="input"
      bind:value={dependant.fontSize}
      min="1"
    />
  </div>
  <div class="flex gap-2 flex-col justify-center">
    <label for="options-line-width">Lines width {options.lineWidth}</label>
    <input
      id="options-line-width"
      type="range"
      class="input"
      bind:value={options.lineWidth}
      min="1"
      max="10"
    />
  </div>
  <div class="flex gap-2 flex-col justify-center">
    <label for="options-width">Canvas width {options.width}</label>
    <input
      id="options-width"
      type="range"
      class="input"
      bind:value={options.width}
      use:setWidthBoundries
    />
  </div>
  <div class="flex gap-2 flex-col justify-center">
    <label for="options-font-weight">Font weight</label>
    <select
      id="options-font-weight"
      class="input px-2 py-1"
      bind:value={dependant.fontWeight}
    >
      <option value="Bolder">Bolder</option>
      <option value="Bold">Bold</option>
      <option value="Light">Light</option>
      <option value="Lighter">Lighter</option>
      <option value="900">900</option>
      <option value="800">800</option>
      <option value="700">700</option>
      <option value="600">600</option>
      <option value="500">500</option>
      <option value="400">400</option>
      <option value="300">300</option>
      <option value="200">200</option>
      <option value="100">100</option>
    </select>
  </div>
  <div class="flex gap-2 flex-col justify-center">
    <label for="options-lines-amount">Lines ammount {options.lineAmount}</label>
    <input
      id="options-lines-amount"
      type="number"
      class="input py-1 px-2"
      min="0"
      max="30"
      bind:value={options.lineAmount}
    />
  </div>
  <div class="flex gap-2 flex-col justify-center">
    <label for="options-char-amount">Character ammount</label>
    <input
      id="options-char-amount"
      type="number"
      class="input py-1 px-2"
      min="0"
      max="30"
      bind:value={extra.characterAmount}
    />
  </div>

  <div class="flex gap-2 flex-col justify-center">
    <label for="options-font">Font {dependant.font}</label>
    <input
      id="options-font"
      type="text"
      class="input py-1 px-2"
      placeholder="Arial"
      bind:value={dependant.font}
    />
  </div>
  <div class="flex gap-2 flex-col items-center justify-center">
    <label for="options-case-sensitive">Case sensitive </label>
    <input
      id="options-case-sensitive"
      type="checkbox"
      class="input checkbox"
      bind:checked={extra.caseSensitive}
    />
  </div>

  <div class="col-span-3 flex h-fit justify-center gap-4">
    <ButtonSecondary on:click={handleReset}>Reset</ButtonSecondary>
    <ButtonPrimary on:click={handleSubmitOptions}>Submit options</ButtonPrimary>
  </div>
</div>
