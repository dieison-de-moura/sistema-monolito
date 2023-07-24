import Invoice from "../domain/invoce.entity";

export default interface InvoiceGateway {
    generate(client: Invoice): Promise<void>;
    find(id: string): Promise<Invoice>;
}