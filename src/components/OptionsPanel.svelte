<script lang="ts">
  import { PUBLIC_AUTO_REGENERATE_INTERVAL as i } from "$env/static/public";
  import {
    deepCopy,
    getDefaultDependant,
    getDefaultExtra,
    getDefaultUtilities,
    type ExtraOptions,
  } from "$lib";
  import { createEventDispatcher, onMount } from "svelte";
  import type {
    CaptchaOptions,
    CaptchaSyncOptions,
  } from "vanilla-captcha/utils";
  import OptionsPanelFields from "./OptionsPanelFields.svelte";
  import OptionsPanelResetButton from "./OptionsPanelResetButton.svelte";
  export let type: "server" | "browser";
  export let options: CaptchaSyncOptions | CaptchaOptions;
  let optionsCP = deepCopy(options);
  export let extra: ExtraOptions = getDefaultExtra();
  let extraCP = deepCopy(extra);
  const dispatch = createEventDispatcher();
  let dependant = getDefaultDependant();
  let utilities = getDefaultUtilities();

  onMount(() => {
    setUtilitiesBounds();
    window.addEventListener("resize", setUtilitiesBounds);
  });

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

  const regenerateNow = () => {
    options = deepCopy(optionsCP);
    extra = deepCopy(extraCP);
    dispatch("regenerate-image", { options, extra });
  };

  const handleDependantChange = () => {
    if (type === "browser" && optionsCP) {
      optionsCP = {
        ...optionsCP,
        font: `${dependant.fontWeight} ${dependant.fontSize}px ${dependant.font}`,
      };
    } else if (optionsCP) {
      optionsCP = {
        ...optionsCP,
        font: dependant.font,
        fontWeight: dependant.fontWeight,
        fontSize: dependant.fontSize,
      };
    }
    regenerateNow();
  };

  const handleGeneralChange = () => regenerateNow();
  const handleCharacterAmountChange = () => regenerateNow();
  const handleCaseSensitiveChange = () =>
    (extra.caseSensitive = extraCP.caseSensitive);

  const compareOptions = () =>
    JSON.stringify(options) === JSON.stringify(optionsCP);

  const handleReset = () => {
    dependant = getDefaultDependant();
    extraCP = getDefaultExtra();
    extra = deepCopy(extraCP);
    dispatch("reset-options");
  };
</script>

<div
  class="relative w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-7 px-3"
>
  <OptionsPanelResetButton on:reset={handleReset} />
  <OptionsPanelFields
    on:general-change={handleGeneralChange}
    on:character-amount-change={handleCharacterAmountChange}
    on:dependant-change={handleDependantChange}
    on:case-sensitive-change={handleCaseSensitiveChange}
    options={optionsCP}
    {utilities}
    extra={extraCP}
    {dependant}
  />
</div>
