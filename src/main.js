import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Sample from './sample';

export default class Main extends Component {
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
