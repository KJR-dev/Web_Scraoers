export type THttpResponse = {
    success: boolean;
    statusCode: number;
    request: {
        ip?: string | null;
        method: string;
        url: string;
    };
    message: string;
    data: unknown;
};

export type THttpError = {
    success: boolean;
    statusCode: number;
    request: {
        ip?: string | null;
        method: string;
        url: string;
    };
    message: string;
    data: unknown;
    trace?: object | null;
};

export type SponsoredData = {
    query: string;
    sponsoredDomains: string[];
    pagesLinkLength: number;
};

export type CreateSendGridTemplate = {
    templateName: string;
    subject: string;
    htmlContent: string;
    plainTextContent: string;
    version: number;
};

export type SendGridTemplateVersion = {
    id: string;
    user_id: number;
    template_id: string;
    active: number;
    name: string;
    html_content: string;
    plain_content: string;
    generate_plain_content: boolean;
    subject: string;
    updated_at: string;
    editor: string;
    thumbnail_url: string;
};

export type SendGridTemplate = {
    id: string;
    name: string;
    generation: string;
    updated_at: string;
    versions: SendGridTemplateVersion[];
};

export type GetSendGridTemplatesResponse = {
    templates: SendGridTemplate[];
};

export type EmailSendData = {
    clients: { to: string; url: string }[];
    sender: string;
    templateId: string;
};

export type EmailEntry = {
    email: string;
    name: string;
    groupId: number;
};

export type EmailDetailsType = Record<string, EmailEntry>;

