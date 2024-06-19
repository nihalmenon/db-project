export class Loc {
	lid: number;
	c_code?: string;
	city?: string;

	constructor(lid: number, c_code?: string, city?: string) {
		this.lid = lid;
		this.c_code = c_code;
		this.city = city;
	}
}