
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const myCustomTheme: CustomThemeConfig = {
    name: 'my-custom-theme',
    properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		"--theme-font-family-heading": `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		"--theme-font-color-base": "0 0 0",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "8px",
		"--theme-rounded-container": "6px",
		"--theme-border-base": "1px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "255 255 255",
		"--on-secondary": "0 0 0",
		"--on-tertiary": "0 0 0",
		"--on-success": "0 0 0",
		"--on-warning": "0 0 0",
		"--on-error": "255 255 255",
		"--on-surface": "255 255 255",
		// =~= Theme Colors  =~=
		// primary | #0071eb 
		"--color-primary-50": "217 234 252", // #d9eafc
		"--color-primary-100": "204 227 251", // #cce3fb
		"--color-primary-200": "191 220 250", // #bfdcfa
		"--color-primary-300": "153 198 247", // #99c6f7
		"--color-primary-400": "77 156 241", // #4d9cf1
		"--color-primary-500": "0 113 235", // #0071eb
		"--color-primary-600": "0 102 212", // #0066d4
		"--color-primary-700": "0 85 176", // #0055b0
		"--color-primary-800": "0 68 141", // #00448d
		"--color-primary-900": "0 55 115", // #003773
		// secondary | #75acd8 
		"--color-secondary-50": "234 243 249", // #eaf3f9
		"--color-secondary-100": "227 238 247", // #e3eef7
		"--color-secondary-200": "221 234 245", // #ddeaf5
		"--color-secondary-300": "200 222 239", // #c8deef
		"--color-secondary-400": "158 197 228", // #9ec5e4
		"--color-secondary-500": "117 172 216", // #75acd8
		"--color-secondary-600": "105 155 194", // #699bc2
		"--color-secondary-700": "88 129 162", // #5881a2
		"--color-secondary-800": "70 103 130", // #466782
		"--color-secondary-900": "57 84 106", // #39546a
		// tertiary | #8170b1 
		"--color-tertiary-50": "236 234 243", // #eceaf3
		"--color-tertiary-100": "230 226 239", // #e6e2ef
		"--color-tertiary-200": "224 219 236", // #e0dbec
		"--color-tertiary-300": "205 198 224", // #cdc6e0
		"--color-tertiary-400": "167 155 200", // #a79bc8
		"--color-tertiary-500": "129 112 177", // #8170b1
		"--color-tertiary-600": "116 101 159", // #74659f
		"--color-tertiary-700": "97 84 133", // #615485
		"--color-tertiary-800": "77 67 106", // #4d436a
		"--color-tertiary-900": "63 55 87", // #3f3757
		// success | #0bef85 
		"--color-success-50": "218 253 237", // #dafded
		"--color-success-100": "206 252 231", // #cefce7
		"--color-success-200": "194 251 225", // #c2fbe1
		"--color-success-300": "157 249 206", // #9df9ce
		"--color-success-400": "84 244 170", // #54f4aa
		"--color-success-500": "11 239 133", // #0bef85
		"--color-success-600": "10 215 120", // #0ad778
		"--color-success-700": "8 179 100", // #08b364
		"--color-success-800": "7 143 80", // #078f50
		"--color-success-900": "5 117 65", // #057541
		// warning | #dbbe06 
		"--color-warning-50": "250 245 218", // #faf5da
		"--color-warning-100": "248 242 205", // #f8f2cd
		"--color-warning-200": "246 239 193", // #f6efc1
		"--color-warning-300": "241 229 155", // #f1e59b
		"--color-warning-400": "230 210 81", // #e6d251
		"--color-warning-500": "219 190 6", // #dbbe06
		"--color-warning-600": "197 171 5", // #c5ab05
		"--color-warning-700": "164 143 5", // #a48f05
		"--color-warning-800": "131 114 4", // #837204
		"--color-warning-900": "107 93 3", // #6b5d03
		// error | #e53434 
		"--color-error-50": "251 225 225", // #fbe1e1
		"--color-error-100": "250 214 214", // #fad6d6
		"--color-error-200": "249 204 204", // #f9cccc
		"--color-error-300": "245 174 174", // #f5aeae
		"--color-error-400": "237 113 113", // #ed7171
		"--color-error-500": "229 52 52", // #e53434
		"--color-error-600": "206 47 47", // #ce2f2f
		"--color-error-700": "172 39 39", // #ac2727
		"--color-error-800": "137 31 31", // #891f1f
		"--color-error-900": "112 25 25", // #701919
		// surface | #565469 
		"--color-surface-50": "230 229 233", // #e6e5e9
		"--color-surface-100": "221 221 225", // #dddde1
		"--color-surface-200": "213 212 218", // #d5d4da
		"--color-surface-300": "187 187 195", // #bbbbc3
		"--color-surface-400": "137 135 150", // #898796
		"--color-surface-500": "86 84 105", // #565469
		"--color-surface-600": "77 76 95", // #4d4c5f
		"--color-surface-700": "65 63 79", // #413f4f
		"--color-surface-800": "52 50 63", // #34323f
		"--color-surface-900": "42 41 51", // #2a2933
		
	}
}