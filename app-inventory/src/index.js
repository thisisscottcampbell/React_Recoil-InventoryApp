import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { RecoilRoot } from 'recoil';
import RecoilizeDebugger from 'recoilize';

ReactDOM.render(
	<RecoilRoot>
		<RecoilizeDebugger />
		<App />
	</RecoilRoot>,
	document.querySelector('#root')
);
