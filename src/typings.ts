export interface IProps {}

export interface IState {
	page: number;
	per_page: number;
	total: number;
	total_pages: number;
	data: IFreelancer[];
	ad: IAd;
	dataCurrent: IFreelancer[];
}

export interface IFreelancer {
	id: number;
	email: string;
	first_name: string;
	last_name: string;
	avatar: string;
}

export interface IAd {
	company: string;
	url: string;
	text: string;
}
