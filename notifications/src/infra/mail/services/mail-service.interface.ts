export type Address = {
  email: string;
  name: string;
};

export type Message = {
  to: Address;
  subject: string;
  html: string | Buffer;
};

export abstract class MailService {
  abstract sendMail(message: Message): Promise<void>;
}
