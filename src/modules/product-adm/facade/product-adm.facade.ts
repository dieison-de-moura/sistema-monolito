import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import { AddProductFacadeInputDto } from "./dto/add.product.facade.dto";
import { CheckStockFacadeInputDto, CheckStockFacadeOutputDto } from "./dto/check.stock.facade.dto";
import ProductAdmFacadeInterface, {
} from "./product-adm.facade.interface";

export interface UseCasesProps {
    addUseCase: UseCaseInterface;
    stockUseCase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
    private _addUseCase: UseCaseInterface;
    private _checkStockUseCase: UseCaseInterface;

    constructor(useCasesProps: UseCasesProps) {
        this._addUseCase = useCasesProps.addUseCase;
        this._checkStockUseCase = useCasesProps.stockUseCase;
    }

    addProduct(input: AddProductFacadeInputDto): Promise<void> {
        // caso o dto do caso de uso for != do dto da facade,
        // converter o dto da facade para o dto do caso de uso
        return this._addUseCase.execute(input);
    }
    checkStock(
        input: CheckStockFacadeInputDto
    ): Promise<CheckStockFacadeOutputDto> {
        return this._checkStockUseCase.execute(input);
    }
}