import { With } from "./with";

export class Dweet {
    private _this: string;
    private _by: string;
    private _the: string;
    private _with: Array<With>;

	constructor(_this: string, by: string, the: string, _with: Array<With>) {
		this._this = _this;
		this._by = by;
		this._the = the;
		this._with = _with;
	}

    /**
     * Getter this
     * @return {string}
     */
	public get this(): string {
		return this._this;
	}

    /**
     * Getter by
     * @return {string}
     */
	public get by(): string {
		return this._by;
	}

    /**
     * Getter the
     * @return {string}
     */
	public get the(): string {
		return this._the;
	}

    /**
     * Getter with
     * @return {Array<With>}
     */
	public get with(): Array<With> {
		return this._with;
	}

    /**
     * Setter this
     * @param {string} value
     */
	public set this(value: string) {
		this._this = value;
	}

    /**
     * Setter by
     * @param {string} value
     */
	public set by(value: string) {
		this._by = value;
	}

    /**
     * Setter the
     * @param {string} value
     */
	public set the(value: string) {
		this._the = value;
	}

    /**
     * Setter with
     * @param {Array<With>} value
     */
	public set with(value: Array<With>) {
		this._with = value;
	}


}