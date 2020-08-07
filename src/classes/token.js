import crypto from "crypto";

export class DecToken{
    constructor(token) {
        const [enc_header, enc_payload, enc_signature] = token.split(".")
        const header = JSON.parse(Buffer.from(enc_header, 'base64').toString('ascii'))
        const payload = JSON.parse(Buffer.from(enc_payload, 'base64').toString('ascii'))
        const signature = Buffer.from(enc_signature, 'base64').toString('ascii')
        this.header = header
        this.payload = payload
        if (crypto.createHmac('sha256', 'S4vEHyg69aLL1uLLlk4').update(`${enc_header}.${enc_payload}`).digest('hex') === signature) {
            this.verified = true
        }
        else this.verified = false
    }
}