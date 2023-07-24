type AddressProps = {
    street: string;
    number: number;
    city: string;
    complement: string;
    state: string;
    zipCode: string;
}

export default class Address {
    private _street: string = "";
    private _number: number = 0;
    private _city: string = "";
    private _complement: string = "";
    private _state: string = "";
    private _zipCode: string = "";

    constructor(props: AddressProps) {
        this._street = props.street;
        this._number = props.number;
        this._zipCode = props.zipCode;
        this._city = props.city;
        this._complement = props.complement;
        this._state = props.state;

        this.validate();
    }

    get street(): string {
        return this._street;
    }

    get number(): number {
        return this._number;
    }

    get zip(): string {
        return this._zipCode;
    }

    get city(): string {
        return this._city;
    }

    get state(): string {
        return this._state;
    }

    get complement(): string {
        return this._complement;
    }

    get zipCode(): string {
        return this._zipCode;
    }

    changeStreet(value: string): void {
        this._street = value;
        this.validate();
    }

    validate() {
        if (this._street.length === 0) {
            throw new Error("Street is required");
        }
        if (this._number === 0) {
            throw new Error("Number is required");
        }
        if (this._zipCode.length === 0) {
            throw new Error("Zip is required");
        }
        if (this._city.length === 0) {
            throw new Error("City is required");
        }
        if (this._state.length === 0) {
            throw new Error("State is required");
        }
    }

    toString() {
        return `${this._street}, ${this._number}, ${this._city}, ${this._state} - ${this._zipCode} `;
    }
}