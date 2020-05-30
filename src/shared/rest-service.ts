import Configuration from './configuration';

class RestService {
    config: Configuration;

    constructor() {
        this.config = new Configuration();
      }

    async getData() {
        return fetch(this.config.GET_URL)
            .then(response => {
                if (!response.ok) {
                this.handleResponseError(response);
                }
                return response.json();
            })
            .then(json => {
                console.log('Retrieved Data');
                console.log(json);
                return json;
            })
            .catch(error => {
                this.handleError(error);
              });
    }
    
    handleResponseError(response: Response) {
        throw new Error("HTTP error, status = " + response.status);
    }
    
    handleError(error: any) {
        console.log(error.message);
    }
}

export default RestService;