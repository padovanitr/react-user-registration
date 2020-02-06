import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import UserReg from '../components/user/UserReg'

export default props => 
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/users' component={UserReg} />
        <Redirect from='*' to='/' />
    </Switch>