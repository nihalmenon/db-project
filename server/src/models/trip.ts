export class Trip {
	tid: number;
	lid: number;
	bio?: string;

	constructor(tid: number, lid: number, bio?: string) {
		this.tid = tid;
		this.lid = lid;
		this.bio = bio;
	}
}