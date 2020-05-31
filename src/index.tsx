import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import HomeComponent from './home-component/home-component';
import * as serviceWorker from './serviceWorker';

const routing = (
	<Router>
		<div>
			<Route exact path="/"><Redirect to="/home" /></Route>
			<Route path="/home" component={HomeComponent} />
		</div>
	</Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
