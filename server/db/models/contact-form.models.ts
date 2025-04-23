import type { Document } from 'mongoose';
import { model, Schema } from 'mongoose';

interface ContactForm extends Document {
    name: string;
    email: string;
    message: string;
    createdAt: Date;
}

const ContactFormSchema = new Schema<ContactForm>({
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const ContactFormModel = model<ContactForm>('ContactForm', ContactFormSchema);

export { ContactForm, ContactFormModel };
