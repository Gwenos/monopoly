export class Logger {

	owner: any;

	constructor(owner: any) {
		this.owner = owner;
	}

	info(message: string): void {
		let date = new Date();
		const pad = (n: number) => n.toString().padStart(2, "0");
		const pad2 =  (n: number) => n.toString().padEnd(15, " ");
		console.log(
			`%c[${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}] %c<INFO> %c<${pad2(this.owner)}>: ${message}`,
			"color: pink;",
			"color: green;",
			"color: inherit;"
		);
	}

	warn(message: string): void {
		let date = new Date();
		const pad = (n: number) => n.toString().padStart(2, "0");
		const pad2 =  (n: number) => n.toString().padEnd(15, " ");
		console.log(
			`%c[${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}] %c<WARN> %c<${pad2(this.owner)}>: ${message}`,
			"color: pink;",
			"color: orange;",
			"color: inherit;"
		);
	}

	error(message: string): void {
		let date = new Date();
		const pad = (n: number) => n.toString().padStart(2, "0");
		const pad2 =  (n: number) => n.toString().padEnd(15, " ");
		console.log(
			`%c[${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}] %c<ERROR> %c<${pad2(this.owner)}>: ${message}`,
			"color: pink;",
			"color: red;",
			"color: inherit;"
		);
	}

}