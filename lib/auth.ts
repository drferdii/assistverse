import { betterAuth } from 'better-auth'
import { magicLink } from 'better-auth/plugins'
import { createClient } from '@libsql/client'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const db = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN,
})

export const auth = betterAuth({
  database: {
    db,
    type: 'sqlite',
  },
  user: {
    additionalFields: {
      profesi: {
        type: 'string',
        required: false,
        input: true,
      },
    },
  },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        await resend.emails.send({
          from: 'Sentra Assist <noreply@sentraai.id>',
          to: email,
          subject: 'Tautan masuk ke Sentra Assist',
          html: `
            <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:40px 24px;background:#F4F2EC;">
              <p style="font-family:monospace;font-size:10px;letter-spacing:0.25em;color:#4A4944;margin-bottom:32px;">SENTRA ASSIST</p>
              <h2 style="font-family:sans-serif;font-size:20px;font-weight:600;color:#1A1A18;margin-bottom:12px;">Masuk ke Sentra Assist</h2>
              <p style="color:#4A4944;font-size:14px;line-height:1.6;margin-bottom:28px;">Klik tautan di bawah untuk masuk. Tautan berlaku <strong>15 menit</strong>.</p>
              <a href="${url}" style="display:inline-block;background:#1A1A18;color:#F4F2EC;padding:14px 28px;text-decoration:none;font-family:monospace;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;">
                Masuk ke Sentra Assist →
              </a>
              <p style="color:#4A4944;font-size:12px;margin-top:36px;border-top:1px solid #DAD7CE;padding-top:20px;">
                Jika Anda tidak meminta tautan ini, abaikan email ini.
              </p>
            </div>
          `,
        })
      },
    }),
  ],
})
