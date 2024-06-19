export class Activity {
	tid: number;
	a_no: number;
	a_description?: string;
	dte?: Date;

	constructor(tid: number, a_no: number, a_description?: string, dte?: Date) {
		this.tid = tid;
		this.a_no = a_no;
		this.a_description = a_description;
		this.dte = dte;
	}
}
