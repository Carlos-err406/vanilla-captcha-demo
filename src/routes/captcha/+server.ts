import { error, type RequestHandler } from "@sveltejs/kit"
import generate from "vanilla-captcha"
import { validate } from 'vanilla-captcha/utils'

export const GET: RequestHandler = async ({ cookies }) => {
    const { answer, captcha } = await generate(4)
    cookies.set("Captcha-answer", answer)
    return new Response(captcha, { status: 200 })
}

export const POST: RequestHandler = async ({ cookies, request }) => {
    const body = await request.json()
    const { input } = body
    const answer = cookies.get("Captcha-answer")
    if (!answer) throw error(500, "Cant validate your answer right now, please refresh the page")

    const valid = validate(input, answer, { caseSensitive: false })
    if (!valid) throw error(401, "Wrong captcha")

    return new Response(null, { status: 200 })
}