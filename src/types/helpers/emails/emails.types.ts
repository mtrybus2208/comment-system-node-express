export interface TemplatesMapper {
  [prop: string]: string;
}

export interface EmailData {
  to: string;
  subject: string;
  from?: string;
}

export type EmailOptions = EmailData & {
  html: string;
};
