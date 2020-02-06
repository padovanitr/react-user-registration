import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon:'pencil',
    title:'User Registration',
    subtitle:'Make your registration'
}

const baseUrl = 'http://localhost:3001/users'
const initialState = {
    user: {
        name: '',
        email: '',
        phone: '',
        address: '',
        dateOfBirth: ''
    },
    list: []
    
}

export default class Signup extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({
                list: resp.data
            })
        })
    }

    clear() {
        this.setState({
            user: initialState.user
        })
    }

    save () {
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({
                    user: initialState.user,
                    list
                })
            })
    }

    getUpdatedList (user, add = true) {
        const list = this.state.list.filter(u => u.id !== user.id)
        if(add) list.unshift(user)
        return list
    }

    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }


    renderForm () {
        return (
            <div className="form">
                <div className="row">
                    {/* Name */}
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Name</label>
                            <input 
                                type='text' 
                                className='form-control'
                                name='name'
                                value={this.state.user.name}
                                onChange={e => this.updateField(e)}
                                placeholder='Type your name...'
                            />
                        </div>
                    </div>
                    {/* Email */}
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Email</label>
                            <input 
                                type='text' 
                                className='form-control'
                                name='email'
                                value={this.state.user.email}
                                onChange={e => this.updateField(e)}
                                placeholder='Type your email...'
                            />
                        </div>
                    </div>
                    {/* Phone */}
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Phone</label>
                            <input 
                                type='number' 
                                className='form-control'
                                name='phone'
                                value={this.state.user.phone}
                                onChange={e => this.updateField(e)}
                                placeholder='Type your phone number...'
                            />
                        </div>
                    </div>
                    {/* Address */}
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Address</label>
                            <input 
                                type='text' 
                                className='form-control'
                                name='address'
                                value={this.state.user.address}
                                onChange={e => this.updateField(e)}
                                placeholder='Type your adress...'
                            />
                        </div>
                    </div>
                    {/* Date of birth */}
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Date Of Birth</label>
                            <input 
                                type='date' 
                                className='form-control'
                                name='dateOfBirth'
                                value={this.state.user.dateOfBirth}
                                onChange={e => this.updateField(e)}
                                placeholder='Type your adress...'
                            />
                        </div>
                    </div>

                </div>
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}
                        >
                            Save
                        </button>
                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(user) {
        this.setState({ user })
    }

    remove (user) {
        axios.delete(`${baseUrl}/${user.id}`).then(resp =>{
            const list = this.getUpdatedList(user, false)
            this.setState({ list })
        })
    }

    renderTable () {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Birth</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.address}</td>
                    <td>{user.dateOfBirth}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render (){
    
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}