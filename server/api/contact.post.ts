import { defineEventHandler, readBody, setResponseStatus } from 'h3';
import { ContactFormModel } from '../db/models/contact-form.models';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    // Check data
    if (!body.name || !body.email || !body.message) {
        setResponseStatus(event, 400);
        return { error: 'Missing required fields' };
    }

    const newContactForm = new ContactFormModel({
        name: body.name,
        email: body.email,
        message: body.message
    });
    await newContactForm.save();

    return { message: `Contact form data succesfully saved for email ${body.email}` };
});