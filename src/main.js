import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import  Sample  from './sample'
// import official less entry file


export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }
    
    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={Sample}/>
                </Switch>
            </main>
        )
    }
}
