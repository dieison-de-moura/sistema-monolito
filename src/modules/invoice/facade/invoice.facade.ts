import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceFacadeInterface from "./invoice.facade.interface";
import {
    FindInvoiceFacadeInterfaceInputDto,
    FindInvoiceFacadeInterfaceOutputDto,
    GenerateInvoiceFacadeInterfaceInputDto,
    GenerateInvoiceFacadeInterfaceOutputDto
} from "./invoice.facade.interface.dto";

export interface UseCaseProps {
    generateUseCase: UseCaseInterface
    findUseCase: UseCaseInterface
}

export default class InvoiceFacade implements InvoiceFacadeInterface {

    private _generateUseCase: UseCaseInterface
    private _findUseCase: UseCaseInterface

    constructor(useCaseProps: UseCaseProps) {
        this._generateUseCase = useCaseProps.generateUseCase
        this._findUseCase = useCaseProps.findUseCase
    }

    async generate(input: GenerateInvoiceFacadeInterfaceInputDto): Promise<GenerateInvoiceFacadeInterfaceOutputDto> {
        return this._generateUseCase.execute(input)
    }

    async find(input: FindInvoiceFacadeInterfaceInputDto): Promise<FindInvoiceFacadeInterfaceOutputDto> {
        return this._findUseCase.execute(input)
    }
}