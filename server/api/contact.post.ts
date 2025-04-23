import { defineEventHandler, readBody, setResponseStatus } from 'h3';
import type { ContactFormService } from '../services/contact-form.service';
import { ContactFormServiceImpl } from '../services/impl/contact-form.service';

const contactFormService: ContactFormService = new ContactFormServiceImpl();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    // Check data
    if (!body.name || !body.email || !body.message) {
        setResponseStatus(event, 400);
        return { error: 'Missing required fields' };
    }

    await contactFormService.save(body.name, body.email, body.message);

    return { message: `Contact form data succesfully saved for email ${body.email}` };
});