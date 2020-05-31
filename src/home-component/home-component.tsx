import React from 'react';
import { IProps, IState, IFreelancer } from '../typings';
import RestService from '../shared/rest-service';
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
                <div className='my-4'>
                    <div className='header-font d-lg-none my-3'>
                        <h3>Find My</h3>
                        <h1>Freelancer</h1>
                    </div>
                    {this.renderSearch()}
                </div>

                <div className='row mb-4'>
                    <div className='header-font find d-none d-lg-block col-lg-6'>
                        <h4 className='title-small'>Find My</h4>
                        <h1 className='title-big'>Freelancer</h1>
                    </div>
                    {this.state.dataCurrent.map((freelancer: IFreelancer) => {
                        return (this.renderFreelancerDetails(freelancer));
                    })}
                </div>

                <div className='row'>
                    <div className='col-12 col-md-6'>
                        <div className="card">
                            <div className="card-body p-1">
                                <h5 className="card-title">{this.state.ad.company}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Advertisement</h6>
                                <p className="card-text">{this.state.ad.text}</p>
                                <a className="btn btn-primary" href={this.state.ad.url} target="_blank" rel="noopener noreferrer">Visit {this.state.ad.company}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ));
    }

    private renderSearch() {
        return (
            <form className="form-inline flex-grow-1">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <label className="input-group-text">Search By</label>
                    </div>
                    <select className="custom-select" onChange={this.handleSearchTypeInput}>
                        <option value="email">Email</option>
                        <option value="first_name">First Name</option>
                        <option value="last_name">Last Name</option>
                    </select>
                </div>
                <div className="input-group flex-grow-1 ml-sm-3">
                    <input className="form-control flex-grow-1" type="text" placeholder="Search" aria-label="Search" onChange={this.handleSearchInput}></input>
                </div>
            </form>
        );
    }

    private renderFreelancerDetails(freelancer: IFreelancer) {
        return (
            <div className='freelancer-info col-12 col-sm-3' key={freelancer.id}>
                <div className="card" >
                    <img className="card-img-top img-fluid" src={freelancer.avatar} alt="Freelancer's Profile" />
                    <div className="card-body px-1">
                        <h5 className="card-title mb-1">{freelancer.first_name} {freelancer.last_name}</h5>
                        <p className="card-text email">{freelancer.email}</p>
                    </div>
                </div>
            </div>
        );
    }

    private getData() {
        this.restService.getData().then(response => {
            if (response) {
                this.setState({
                    page: response.page,
                    per_page: response.per_page,
                    total: response.total,
                    total_pages: response.total_pages,
                    data: response.data,
                    ad: response.ad,
                    dataCurrent: response.data,
                    searchBy: 'email'
                });
            }

        });
    }

    private handleSearchInput(event: any) {
        const searchParam = event.target.value.toLowerCase();
        let dataUpdate = this.state.data;
        dataUpdate = dataUpdate.filter((freelancer: IFreelancer) => {
            switch (this.state.searchBy) {
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
        this.setState({ searchBy: input });
    }
}
export default HomeComponent;
