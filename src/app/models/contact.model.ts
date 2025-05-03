export interface Contact {
    contactID?: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt?: Date;
    isRead?: boolean;
} 