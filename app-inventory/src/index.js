import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { RecoilRoot } from 'recoil';
import RecoilizeDebugger from 'recoilize';

ReactDOM.render(
	<RecoilRoot>
		<RecoilizeDebugger />
		{/* <React.StrictMode> */}
		<App />
		{/* </React.StrictMode> */}
	</RecoilRoot>,
	document.querySelector('#root')
);
