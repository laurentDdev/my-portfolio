import { Resend } from 'resend';
import EmailTemplate from "@/app/components/EmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {

        const body = await req.json();

        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: ['laurentd.dev@gmail.com'],
            subject: 'New message from portfolio',
            react: EmailTemplate({ fromMail: body.email, content: body.message }),
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}