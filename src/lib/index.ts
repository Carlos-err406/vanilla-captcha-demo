import type { ToastSettings } from "@skeletonlabs/skeleton";
import type { CaptchaOptions, CaptchaSyncOptions } from "vanilla-captcha/utils";

// place files you want to import through the `$lib` alias in this folder.
export interface ExtraOptions {
    characterAmount: number
    caseSensitive: boolean
}
export interface IOption {
    value: any;
    label: string;
}
export interface IUtilities {
    maxWidth: number
    maxHeight: number
    maxCharacters: number
}
export interface IDependant {
    font: string,
    fontWeight: string | number,
    fontSize: number,
}

export const fontWeightOptions: IOption[] = [
    { value: "Bolder", label: "Bolder" },
    { value: "Bold", label: "Bold" },
    { value: "Light", label: "Light" },
    { value: "Lighter", label: "Lighter" },
    { value: "900", label: "900" },
    { value: "800", label: "800" },
    { value: "700", label: "700" },
    { value: "600", label: "600" },
    { value: "500", label: "500" },
    { value: "400", label: "400" },
    { value: "300", label: "300" },
    { value: "200", label: "200" },
    { value: "100", label: "100" },
];
export const getDefaultExtra = () => ({
    characterAmount: 4,
    caseSensitive: false,
});

interface ToastType {
    close: (id: string) => void;
    trigger: (toast: ToastSettings) => string;
    freeze: (index: number) => void;
    unfreeze: (index: number) => void;
    clear: () => void;
}
export const getDefaultDependant = () => ({
    font: "Arial",
    fontWeight: "Bold",
    fontSize: 30,
});

export const getDefaultUtilities = (): IUtilities => ({
    maxWidth: 400,
    maxHeight: 96,
    maxCharacters: 30
})

export const triggerValidToast = (toast: ToastType) => {
    toast.trigger({
        timeout: 3000,
        message: "VALID",
        background: "variant-filled-success",
    });
}
export const triggerInvalidToast = (toast: ToastType) => {
    toast.trigger({
        timeout: 3000,
        message: "INVALID",
        background: "variant-filled-error",
    });
}
export const triggerInternalErrorToast = (toast: ToastType) => {
    toast.trigger({
        timeout: 4000,
        message:
            "something went wrong please<br/>reload the page or try again",
        background: "variant-filled-error",
    });
}

export const getParams = (options: object | null) => {
    const params = new URLSearchParams();
    if (!options) return params;
    Object.entries(options).forEach(([key, value]) =>
        params.append(key, value)
    );
    return params
};

export const getServerCaptcha = async (
    characterAmmount: number,
    options?: CaptchaOptions
) => {
    const params = getParams(options ?? null);
    params.append("characterAmount", characterAmmount.toString());
    return fetch(`/captcha?${params.toString()}`, {
        method: "GET",
    })
        .then((r) => r.blob())
        .then((img) =>
            URL.createObjectURL(img)
        );
};


export const reGenerateServerCaptcha = async (
    options?: CaptchaOptions
) => {
    const params = getParams(options ?? null);
    return fetch(`/captcha/get-again?${params.toString()}`, {
        method: "GET",
    })
        .then((r) => r.blob())
        .then((img) =>
            URL.createObjectURL(img)
        );
};

export const deepCopy = <T>(obj: T): T => {
    const isFunction = (value: any): value is (...args: any[]) => any => {
        return typeof value === 'function';
    };

    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    const result: any = Array.isArray(obj) ? [] : {};

    for (const key in obj) {
        if (key in obj) {
            if (typeof obj[key] === 'object') {
                result[key] = deepCopy(obj[key]);
            } else if (isFunction(obj[key])) {
                result[key] = (obj[key] as (...args: any[]) => any).bind(result);
            } else {
                result[key] = obj[key];
            }
        }
    }

    return result;
};

export const getServerOptionsWithParsedFont = (options: CaptchaSyncOptions) => {
    console.log(options)
    const fullFont = options.font;
    let [weight, size, font] = fullFont.split(" ");
    size = size.slice(0, -2);
    const serverOptions: CaptchaOptions = {
        ...options,
        fontSize: parseInt(size),
        fontWeight: weight,
        font,
    };
    return serverOptions
}