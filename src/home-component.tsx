import React from 'react';
import { IProps, IState, IFreelancer } from './typings';
import RestService from './shared/rest-service';
import './home-component.css'


class HomeComponent extends React.Component<IProps, IState> {
    restService: RestService;

    constructor(props: Readonly<IProps>) {
        super(props);
        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.handleSearchTypeInput = this.handleSearchTypeInput.bind(this);
        this.restService = new RestService();
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        return (this.state && (
            <div className='container'>

                <h1>Find My Freelancer</h1>
                <div className='row'>
                    <form className="form-inline">
                        <div className="form-group mb-2">
                            {/* <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Category: {this.state.searchFor}
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" onChange={this.handleSearchInput}>Email</a>
                                <a className="dropdown-item" onChange={this.handleSearchInput}>First Name</a>
                                <a className="dropdown-item" onChange={this.handleSearchInput}>Last Name</a>
                            </div> */}
                            <select className="category dropdown dropdown-toggle" onChange={this.handleSearchTypeInput}>
                                <option value="email">Email</option>
                                <option value="first_name">First Name</option>
                                <option value="last_name">Last Name</option>
                            </select>
                        </div>
                        <div className="form-group mx-sm-3 mb-2">
                            <input className="form-control" type="text" placeholder="Search" aria-label="Search" onChange={this.handleSearchInput}></input>
                        </div>
                    </form>
                </div>
                <div className='row'>
                    {/* <div className='find col-xs-6 m-3'>
                        <h4>Find My</h4>
                        <h1>Freelancer</h1>
                    </div> */}
                    {this.state.dataCurrent.map((freelancer: IFreelancer) => {
                        return (this.renderFreelancerDetails(freelancer));
                    })}
                </div>
                <div className="footer">
                    <a className ='ad' href={this.state.ad.url}>
                        <span className='ad'>
                            {this.state.ad.company}
                            {this.state.ad.text}
                        </span>
                    </a>
                </div>
            </div>)
        );
    }

    private renderFreelancerDetails(freelancer: IFreelancer) {
        return (
        <div className='freelancer-info col-xs-12 col-md-4 p-2' key={freelancer.id}>
            <div className="card" >
                <img className="card-img-top img-fluid" src={freelancer.avatar} alt="Freelancer's Profile"/>
                <div className="card-body">
                    <h5 className="card-title">{freelancer.first_name} {freelancer.last_name}</h5>
                    <p className="card-text">{freelancer.email}</p>
                    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                </div>
            </div>
        </div>
        );
    }

    private getData() {
        this.restService.getData().then(response => {
            this.setState({
                page: response.page,
                per_page: response.per_page,
                total: response.total,
                total_pages: response.total_pages,
                data: response.data,
                ad: response.ad,
                dataCurrent: response.data,
                searchFor: 'email'
            });
        });
    }

    private handleSearchInput(event: any) {
        const searchParam = event.target.value.toLowerCase();
        let dataUpdate = this.state.data;
        dataUpdate = dataUpdate.filter((freelancer: IFreelancer) => {
            switch(this.state.searchFor) {
                case 'email':
                    return freelancer.email.toLowerCase().includes(searchParam);
                case 'first_name':
                    return freelancer.first_name.toLowerCase().includes(searchParam);
                case 'last_name':
                    return freelancer.last_name.toLowerCase().includes(searchParam);
                default:
                    return freelancer.email.toLowerCase().includes(searchParam);
            }
        });
        this.setState({ dataCurrent: dataUpdate });
    }

    private handleSearchTypeInput(event: any) {
        const input = event.target.value;
        this.setState({ searchFor: input });
    }
}
export default HomeComponent;
