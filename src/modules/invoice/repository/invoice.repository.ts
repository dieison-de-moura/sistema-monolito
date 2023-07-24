import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoce.entity";
import Product from "../domain/product.entity";
import Address from "../domain/value-object/address";
import InvoiceGateway from "../gateway/invoice.gateway";
import { InvoiceModel } from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {

    async generate(invoice: Invoice): Promise<void> {

        await InvoiceModel.create({
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: invoice.items.map((item) => ({
                id: item.id.id,
                name: item.name,
                price: item.price,
            })),
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt,
        },
            {
                include: ["items"]
            }
        );
    }

    async find(id: string): Promise<Invoice> {

        const invoice = await InvoiceModel.findOne(
            {
                where: { id },
                include: ["items"]
            }
        );

        if (!invoice) {
            throw new Error(`Invoice with id ${id} not found`)
        }

        const propsAddress = {
            street: invoice.street,
            number: invoice.number,
            complement: invoice.complement,
            city: invoice.city,
            state: invoice.state,
            zipCode: invoice.zipCode,
        }

        return new Invoice({
            id: new Id(invoice.id),
            name: invoice.name,
            document: invoice.document,
            address: new Address(propsAddress),
            items: invoice.items.map((item) => {
                return new Product({
                    id: new Id(item.id),
                    name: item.name,
                    price: item.price
                })
            }),
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt,
        });
    }
}