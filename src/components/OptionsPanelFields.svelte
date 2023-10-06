<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import {
    fontWeightOptions,
    type ExtraOptions,
    type IUtilities,
    type IDependant,
  } from "$lib";
  import type {
    CaptchaOptions,
    CaptchaSyncOptions,
  } from "vanilla-captcha/utils";
  import ColorInput from "./OptionInputs/ColorInput.svelte";
  import RangeInput from "./OptionInputs/RangeInput.svelte";
  import SelectInput from "./OptionInputs/SelectInput.svelte";
  import SwitchInput from "./OptionInputs/SwitchInput.svelte";
  import TextInput from "./OptionInputs/TextInput.svelte";
  export let options: CaptchaOptions | CaptchaSyncOptions;
  export let utilities: IUtilities;
  export let extra: ExtraOptions;
  export let dependant: IDependant;
  const dispatch = createEventDispatcher();
  const mergeActions = () => dispatch("general-change");
  const handleCharacterAmountChange = () => dispatch("character-amount-change");
  const handleCaseSensitiveChange = () => dispatch("case-sensitive-change");
  const handleDependantChange = () => dispatch("dependant-change");
</script>

<ColorInput
  bind:value={options.backgroundColor}
  id="options-bg-color"
  on:change={mergeActions}
>
  Background Color
</ColorInput>
<ColorInput
  bind:value={options.fontColor}
  id="options-font-color"
  on:change={mergeActions}
>
  Font Color
</ColorInput>
<ColorInput
  bind:value={options.lineColor}
  id="options-line-color"
  on:change={mergeActions}
>
  Lines Color
</ColorInput>
<RangeInput
  on:change={mergeActions}
  id="options-height"
  bind:value={options.height}
  bind:max={utilities.maxHeight}
>
  Canvas height
</RangeInput>
<RangeInput
  on:change={handleDependantChange}
  id="options-font-size"
  bind:value={dependant.fontSize}
>
  Font size
</RangeInput>
<RangeInput
  on:change={mergeActions}
  id="options-line-width"
  bind:value={options.lineWidth}
  max={10}
>
  Line width
</RangeInput>
<RangeInput
  on:change={mergeActions}
  id="options-width"
  bind:value={options.width}
  bind:max={utilities.maxWidth}
>
  Canvas Width
</RangeInput>
<RangeInput
  on:change={handleCharacterAmountChange}
  id="options-character-amount"
  bind:value={extra.characterAmount}
  min={0}
  max={15}
>
  Character amount
</RangeInput>
<RangeInput
  on:change={mergeActions}
  id="options-line-amount"
  bind:value={options.lineAmount}
  min={0}
  max={30}
>
  Lines amount
</RangeInput>

<SelectInput
  on:change={handleDependantChange}
  id="options-font-weight"
  options={fontWeightOptions}
  bind:value={dependant.fontWeight}
>
  Font weight
</SelectInput>
<TextInput
  on:input={handleDependantChange}
  placeholder="Arial"
  bind:value={dependant.font}
  id="options-font"
>
  Font
</TextInput>
<SwitchInput
  on:change={handleCaseSensitiveChange}
  id="options-case-sensitive"
  bind:value={extra.caseSensitive}
>
  Case sensitive
</SwitchInput>
