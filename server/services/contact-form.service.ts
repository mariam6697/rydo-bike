export abstract class ContactFormService {
    abstract save(name: string, email: string, message: string): Promise<void>;
}