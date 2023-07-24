import GenerateInvoiceUseCase from "./generate-invoice.usecase"

const MockRepository = () => {

    return {
        generate: jest.fn(),
        find: jest.fn()
    }
}

describe("Generate Invoice use case unit test", () => {

    it("should generate an invoice", async () => {

        const invoiceRepository = MockRepository()
        const usecase = new GenerateInvoiceUseCase(invoiceRepository)

        const product = {
            id: "1",
            name: "Product one",
            price: 99
        }

        const inputInvoice = {
            id: "1",
            name: "Invoice-1",
            document: "NF-e-1",
            street: "Rua 123",
            number: 999,
            city: "Develepment city",
            complement: "-",
            state: "RS",
            zipCode: "99987654",
            items: [product]
        }

        const result = await usecase.execute(inputInvoice)

        expect(invoiceRepository.generate).toHaveBeenCalled()
        expect(result.id).toBeDefined()
        expect(result.name).toBe(inputInvoice.name)
        expect(result.document).toBe(inputInvoice.document)
        expect(result.street).toBe(inputInvoice.street)
        expect(result.number).toBe(inputInvoice.number)
        expect(result.complement).toBe(inputInvoice.complement)
        expect(result.city).toBe(inputInvoice.city)
        expect(result.state).toBe(inputInvoice.state)
        expect(result.zipCode).toBe(inputInvoice.zipCode)
        expect(result.items[0].id).toBe(inputInvoice.items[0].id)
        expect(result.items[0].name).toBe(inputInvoice.items[0].name)
        expect(result.items[0].price).toBe(inputInvoice.items[0].price)
    });

    it("should generate an invoice whit more than one product", async () => {

        const invoiceRepository = MockRepository()
        const usecase = new GenerateInvoiceUseCase(invoiceRepository)

        const product = {
            id: "1",
            name: "Product one",
            price: 99
        }
        const product2 = {
            id: "2",
            name: "Product two",
            price: 199
        }

        const inputInvoice = {
            id: "1",
            name: "Invoice-1",
            document: "NF-e-1",
            street: "Rua 123",
            number: 999,
            city: "Develepment city",
            complement: "-",
            state: "RS",
            zipCode: "99987654",
            items: [product, product2]
        }

        const result = await usecase.execute(inputInvoice)

        expect(invoiceRepository.generate).toHaveBeenCalled()
        expect(result.id).toBeDefined()
        expect(result.name).toBe(inputInvoice.name)
        expect(result.document).toBe(inputInvoice.document)
        expect(result.street).toBe(inputInvoice.street)
        expect(result.number).toBe(inputInvoice.number)
        expect(result.complement).toBe(inputInvoice.complement)
        expect(result.city).toBe(inputInvoice.city)
        expect(result.state).toBe(inputInvoice.state)
        expect(result.zipCode).toBe(inputInvoice.zipCode)
        expect(result.items[0].id).toBe(inputInvoice.items[0].id)
        expect(result.items[0].name).toBe(inputInvoice.items[0].name)
        expect(result.items[0].price).toBe(inputInvoice.items[0].price)
        expect(result.items[1].id).toBe(inputInvoice.items[1].id)
        expect(result.items[1].name).toBe(inputInvoice.items[1].name)
        expect(result.items[1].price).toBe(inputInvoice.items[1].price)
    });
});