import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import Mailgun from 'mailgun-js';
import * as nodemailer from 'nodemailer';
import { IMailData } from 'src/interfaces/mail.interface';

@Injectable()
export class MailService {
    // private mg: Mailgun.Mailgun;

    private transporter: nodemailer.Transporter;

    constructor(private readonly configService: ConfigService) {
        // this.mg = Mailgun({
        //     apiKey: this.configService.get<string>('MAILGUN_API_KEY'),
        //     domain: this.configService.get<string>('MAILGUN_API_DOMAIN'),
        // });

        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: this.configService.get<string>('CHAT_MAIL'),
                pass: this.configService.get<string>('CHAT_MAIL_PASSWORD'),
            },
        });
    }

    async send(data: IMailData): Promise<any> {
        const result = await this.transporter.sendMail({
            from: this.configService.get<string>('CHAT_MAIL'),
            to: data.to,
            subject: data.subject,
            html: data.text,
        });

        return result;

        // return new Promise((res, rej) => {
        //     this.mg.messages().send(data, function (error, body) {
        //         if (error) {
        //             rej(error);
        //         }
        //         res(body);
        //     });
        // });
    }
}
