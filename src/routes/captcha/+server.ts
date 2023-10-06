import { getDefaultExtra } from '$lib'
import { error, type RequestHandler } from "@sveltejs/kit"
import generate from "vanilla-captcha"
import { validate } from 'vanilla-captcha/utils'
export const GET: RequestHandler = async ({ cookies, url }) => {
    const params = url.searchParams

    const options: any = {}
    params.forEach((value, key) => Object.assign(options, { [key]: value }))
    let characterAmount = options.characterAmount ?? getDefaultExtra().characterAmount

    const { answer, captcha } = await generate(characterAmount, options)

    //I suggest you save an encrypted version of the answer here, and decrypt it in the POST method
    cookies.set("Captcha-Answer", answer, { 'httpOnly': true, 'path': '/', 'sameSite': true })
    return new Response(captcha, { status: 200 })
}

export const POST: RequestHandler = async ({ cookies, request }) => {
    const body = await request.json()
    const { input } = body
    const answer = cookies.get("Captcha-Answer")
    if (!answer) throw error(500, "Cant validate your answer right now, please refresh the page")

    const valid = validate(input, answer, { caseSensitive: false })
    if (!valid) throw error(401, "Wrong captcha")

    return new Response(null, { status: 200 })
}