export class User {
	uid: number;
	first_name: string;
	last_name: string;
	dob: Date;
	gender: 'm' | 'f' | 'x';
	email: string;
	phone?: string;
	socials?: string;
	pwd: string;

	constructor(
		uid: number,
		first_name: string,
		last_name: string,
		dob: Date,
		gender: 'm' | 'f' | 'x',
		email: string,
		phone: string,
		socials: string,
		pwd: string
	) {
		this.uid = uid;
		this.first_name = first_name;
		this.last_name = last_name;
		this.dob = dob;
		this.gender = gender;
		this.email = email;
		this.phone = phone;
		this.socials = socials;
		this.pwd = pwd;
	}
}