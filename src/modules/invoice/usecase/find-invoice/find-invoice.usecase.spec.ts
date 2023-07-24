import Id from "../../../@shared/domain/value-object/id.value-object"
import Invoice from "../../domain/invoce.entity"
import Product from "../../domain/product.entity"
import Address from "../../domain/value-object/address"
import FindInvoiceUseCase from "./find-invoice.usecase"

const product = new Product({
    id: new Id("1"),
    name: "Product one",
    price: 99
});

const product2 = new Product({
    id: new Id("2"),
    name: "Product two",
    price: 100
});

const inputAddress = {
    street: "Rua 123",
    number: 999,
    city: "Develepment city",
    complement: "-",
    state: "RS",
    zipCode: "99987654",
}

const invoice = new Invoice({
    id: new Id("1"),
    name: "Invoice-1",
    document: "NF-e-1",
    address: new Address(inputAddress),
    items: [product]
});

const invoice2 = new Invoice({
    id: new Id("2"),
    name: "Invoice-2",
    document: "NF-e-2",
    address: new Address(inputAddress),
    items: [product, product2]
});

const MockRepository = () => {
    return {
        generate: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    }
}

const MockRepository2 = () => {
    return {
        generate: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(invoice2)),
    }
}

describe("Find Invoice use case unit test", () => {

    it("should find an invoice", async () => {
        const invoiceRepository = MockRepository()
        const findInvoiceUseCase = new FindInvoiceUseCase(invoiceRepository)

        const input = {
            id: "1",
        }

        const result = await findInvoiceUseCase.execute(input)

        expect(invoiceRepository.find).toHaveBeenCalled()
        expect(result.id).toBe("1")
        expect(result.name).toBe("Invoice-1")
        expect(result.document).toBe("NF-e-1")
        expect(result.address.street).toBe("Rua 123")
        expect(result.address.number).toBe(999)
        expect(result.address.complement).toBe("-")
        expect(result.address.city).toBe("Develepment city")
        expect(result.address.state).toBe("RS")
        expect(result.address.zipCode).toBe("99987654")
        expect(result.items[0].id).toBe("1")
        expect(result.items[0].name).toBe("Product one")
        expect(result.items[0].price).toBe(99)
        expect(result.total).toBe(99)
        expect(result.createdAt).toEqual(expect.any(Date))
    });

    it("should find an invoice whit two products", async () => {
        const invoiceRepository = MockRepository2()
        const findInvoiceUseCase = new FindInvoiceUseCase(invoiceRepository)

        const input = {
            id: "2",
        }

        const result = await findInvoiceUseCase.execute(input)

        expect(invoiceRepository.find).toHaveBeenCalled()
        expect(result.id).toBe("2")
        expect(result.name).toBe("Invoice-2")
        expect(result.document).toBe("NF-e-2")
        expect(result.address.street).toBe("Rua 123")
        expect(result.address.number).toBe(999)
        expect(result.address.complement).toBe("-")
        expect(result.address.city).toBe("Develepment city")
        expect(result.address.state).toBe("RS")
        expect(result.address.zipCode).toBe("99987654")
        expect(result.items[0].id).toBe("1")
        expect(result.items[0].name).toBe("Product one")
        expect(result.items[0].price).toBe(99)
        expect(result.items[1].id).toBe("2")
        expect(result.items[1].name).toBe("Product two")
        expect(result.items[1].price).toBe(100)
        expect(result.total).toBe(199)
        expect(result.createdAt).toEqual(expect.any(Date))
    });
});