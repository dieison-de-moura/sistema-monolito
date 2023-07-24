import { Sequelize } from "sequelize-typescript"
import { InvoiceModel } from "../repository/invoice.model"
import { ProductModel } from "../repository/product.model"
import InvoiceFacadeFactory from "../factory/facade.factory"

const product = {
    id: "1",
    name: "Product name",
    price: 19.55
}

const invoiceProps = {
    id: "1",
    name: "Invoice-1",
    document: "NF-e-1",
    street: "Rua shaushaushaush",
    number: 9999,
    complement: "NA",
    city: "aaaaaaaaaaaaaa",
    state: "RS",
    zipCode: "99978654",
    items: [product]
}

describe("Invoice Facade test", () => {

    let sequelize: Sequelize

    beforeEach(async () => {

        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })

        sequelize.addModels([InvoiceModel, ProductModel])
        await sequelize.sync()
    });

    afterEach(async () => {
        await sequelize.close()
    });

    it("Facade - should generate an invoice", async () => {

        const invoiceFacade = InvoiceFacadeFactory.create()

        const invoiceResult = await invoiceFacade.generate(invoiceProps)

        expect(invoiceResult).toBeDefined()
        expect(invoiceResult.id).toEqual(expect.any(String))
        expect(invoiceResult.name).toEqual(invoiceProps.name)
        expect(invoiceResult.document).toEqual(invoiceProps.document)
        expect(invoiceResult.street).toEqual(invoiceProps.street)
        expect(invoiceResult.number).toEqual(invoiceProps.number)
        expect(invoiceResult.complement).toEqual(invoiceProps.complement)
        expect(invoiceResult.city).toEqual(invoiceProps.city)
        expect(invoiceResult.state).toEqual(invoiceProps.state)
        expect(invoiceResult.zipCode).toEqual(invoiceProps.zipCode)
        expect(invoiceResult.items[0].id).toEqual(invoiceProps.items[0].id)
        expect(invoiceResult.items[0].name).toEqual(invoiceProps.items[0].name)
        expect(invoiceResult.items[0].price).toEqual(invoiceProps.items[0].price)
    });

    it("Facade - should find an invoice", async () => {

        const invoiceFacade = InvoiceFacadeFactory.create()

        const invoiceResult = await invoiceFacade.generate(invoiceProps)

        expect(invoiceResult).toBeDefined()
        expect(invoiceResult.id).toEqual(expect.any(String))
        expect(invoiceResult.name).toEqual(invoiceProps.name)
        expect(invoiceResult.document).toEqual(invoiceProps.document)
        expect(invoiceResult.street).toEqual(invoiceProps.street)
        expect(invoiceResult.number).toEqual(invoiceProps.number)
        expect(invoiceResult.complement).toEqual(invoiceProps.complement)
        expect(invoiceResult.city).toEqual(invoiceProps.city)
        expect(invoiceResult.state).toEqual(invoiceProps.state)
        expect(invoiceResult.zipCode).toEqual(invoiceProps.zipCode)
        expect(invoiceResult.items[0].id).toEqual(invoiceProps.items[0].id)
        expect(invoiceResult.items[0].name).toEqual(invoiceProps.items[0].name)
        expect(invoiceResult.items[0].price).toEqual(invoiceProps.items[0].price)

        const invoiceFound = await invoiceFacade.find({ id: invoiceResult.id })

        expect(invoiceResult).toBeDefined()
        expect(invoiceResult.id).toEqual(invoiceFound.id)
        expect(invoiceResult.name).toEqual(invoiceFound.name)
        expect(invoiceResult.document).toEqual(invoiceFound.document)
        expect(invoiceResult.street).toEqual(invoiceFound.address.street)
        expect(invoiceResult.number).toEqual(invoiceFound.address.number)
        expect(invoiceResult.complement).toEqual(invoiceFound.address.complement)
        expect(invoiceResult.city).toEqual(invoiceFound.address.city)
        expect(invoiceResult.state).toEqual(invoiceFound.address.state)
        expect(invoiceResult.zipCode).toEqual(invoiceFound.address.zipCode)
        expect(invoiceResult.items[0].id).toEqual(invoiceFound.items[0].id)
        expect(invoiceResult.items[0].name).toEqual(invoiceFound.items[0].name)
        expect(invoiceResult.items[0].price).toEqual(invoiceFound.items[0].price)
    });
});