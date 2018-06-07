import React, {Component} from 'react';
// import logo from '../logo.svg';
import { Button } from 'antd';

class Sample extends Component {
    render() {
        return (
            <div className="App">
            <div className="wrap">
                <h1 className="hello">
                Boilerplate with redux, ant design UI kit, less, sass, axios, react router and linting
                    over ride colors in src/less/var.css       
                </h1>
                <Button type="primary">Primary</Button>
                <Button>Default</Button>
                <Button type="dashed">Dashed</Button>
                <Button type="danger">Danger</Button>
                </div>
            </div>
        );
    }
}

export default Sample;
