import type { RequestHandler } from "@sveltejs/kit"
import { generateImage } from "vanilla-captcha"
export const GET: RequestHandler = async ({ cookies, url, fetch }) => {
    const params = url.searchParams
    const characterAmmount = params.get("characterAmount")
    const currentAnswer = cookies.get("Captcha-Answer") as string
    if (characterAmmount?.length != currentAnswer.length) {
        return fetch('/captcha?' + params.toString(), { method: "GET" });
    } else {
        const options: any = {}
        params.forEach((value, key) => Object.assign(options, { [key]: value }))
        const captcha = await generateImage(currentAnswer, options)
        return new Response(captcha, { status: 200 })
    }
}
