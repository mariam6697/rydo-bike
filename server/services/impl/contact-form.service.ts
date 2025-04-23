import { ContactFormModel } from "~/server/db/models/contact-form.models";
import type { ContactFormService } from "../contact-form.service";

export class ContactFormServiceImpl implements ContactFormService {
    async save(name: string, email: string, message: string): Promise<void> {
        const newContactForm = new ContactFormModel({
            name,
            email,
            message
        });
        await newContactForm.save();
    }
}