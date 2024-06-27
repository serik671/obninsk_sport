import nodemailer from 'nodemailer';

export default class MailController {
    private transporter: nodemailer.Transporter

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_KEY,
            }
        });
    }

    sendMail(addr: string | string[], title: string, textBody: string, htmlBody?: string) {
        const mailOptions = {
            from: '"Obninsk Sport" <vlad.b8239@gmail.com>', // адрес отправителя
            to: addr,                    // список получателей
            subject: title,                         // Тема письма
            text: textBody,                          // текстовая версия письма
            html: htmlBody,               // HTML версия письма
        };

        this.transporter.sendMail(mailOptions, (error: any, info: any) => {
            if (error) {
              return console.log('Ошибка отправки письма' + error);
            } else {
                console.log('Письмо отправлено: %s', info.messageId);
            }
        });
    }
}