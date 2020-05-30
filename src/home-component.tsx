import React from 'react';
import { IProps, IState, IFreelancer } from './typings';
import RestService from './shared/rest-service'


class HomeComponent extends React.Component<IProps, IState> {
    restService: RestService;

    constructor(props: Readonly<IProps>) {
        super(props);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.restService = new RestService();
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        return (this.state && (
            <div className='container'>

                <h1>Home</h1>
                <div className="dropdown">
                    <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                        Dropdown button
                    </button>
                    <div className="dropdown-menu">
                        <span className="dropdown-item">Link 1</span>
                        <span className="dropdown-item">Link 2</span>
                        <span className="dropdown-item">Link 3</span>
                    </div>
                </div>
                <input className="form-control" type="text" placeholder="Search" aria-label="Search" onChange={this.handleUpdate}></input>

                {/* <div className='row'>
                    <div className='pull-right'>
                        <span>{this.state.page} </span>
                        <span>{this.state.per_page} </span>
                        <span>{this.state.total_pages} </span>
                        <span>{this.state.page}</span>
                    </div>
                </div> */}
                {this.state.dataCurrent.map((freelancer: IFreelancer) => {
                    return (<div>{freelancer.first_name}</div>);
                })}
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>)
        );
    }

    getData() {
        this.restService.getData().then(response => {
            this.setState({
                page: response.page,
                per_page: response.per_page,
                total: response.total,
                total_pages: response.total_pages,
                data: response.data,
                ad: response.ad,
                dataCurrent: response.data
            });
        });
    }

    private handleUpdate(event: any) {
        const searchParam = event.target.value.toLowerCase();
        let dataUpdate = this.state.data;
        dataUpdate = dataUpdate.filter((freelancer: IFreelancer) => {
            return freelancer.first_name.toLowerCase().includes(searchParam);
        });
        this.setState({ dataCurrent: dataUpdate });
    }
}
export default HomeComponent;
