import {i18n} from 'element-react';
import locale from 'element-react/src/locale/lang/en';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

i18n.use(locale);

ReactDOM.render(
    <BrowserRouter>
    <App/>
</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
