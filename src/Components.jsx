import React from "react";
import {Link} from 'react-router-dom'

class CreateUser extends React.Component{ //a modificar. añadiendo campos para registro
    constructor(props){
        super(props);
        this.state = { 
            name:"",
            Username:"",
            email:"",
            address:""
         }
    }
    changeValue= (e) =>{
        const state = this.state
        state[e.target.name]=e.target.value
        this.setState({state})
    }

    sendate = (e) => {
        e.preventDefault()
        console.log('formulario enviado')

    }
    render(){
        const {name, Username, email, address} = this.state
        return(
            <div className="card">
                <div className="card-header">
                    Header
                </div>
                <div className="card-body">
                    <form onSubmit={this.sendate}>
                        <div className="form-group">
                            <label htmlFor="">Name: </label>
                            <input type ="text" name="name" onChange={this.changeValue} value={name} id="name" className="form-control" placeholder="name" aria-describedby="helpId"/>
                            <small id="helpId" className="text-muted">Write the employee's name</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Username: </label>
                            <input type ="text" name="Username" onChange={this.changeValue} value={Username} id="Username" className="form-control" placeholder="Username" aria-describedby="helpId"/>
                            <small id="helpId" className="text-muted">Enter the employee's username</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Email: </label>
                            <input type ="text" name="email" onChange={this.changeValue} value={email} id="email" className="form-control" placeholder="Email" aria-describedby="helpId"/>
                            <small id="helpId" className="text-muted">Write the email</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Address: </label>
                            <input type ="text" name="address" onChange={this.changeValue} value={address} id="address" className="form-control" placeholder="Addreess" aria-describedby="helpId"/>
                            <small id="helpId" className="text-muted"></small>
                        </div>
                        <div className="brn-group" role="group" aria-label="">
                            <button type="submit" className="btn btn-success">Add new employed</button>
                            <Link to={"/"} className="btn btn-cancel">Cancel</Link>
                        </div>
                    </form>
                </div>

            </div>
        )
    }
}

class UsersShow extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            dateLoaded: false,
            employed:[],
        }
    }    
    dates(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then ((dateResponse)=>{
            console.log(dateResponse)
            this.setState({dateLoaded:true, employed:dateResponse })
        })
        .catch(console.log)
    }
    componentDidMount(){
        this.dates();
    }
    DeleteRegister = (id) =>{
        console.log(id)

    }
        render(){
        const {dateLoaded, employed} = this.state
        if (!dateLoaded){return(<div>Loaded...</div>)}
        else{
            return(
            <div className="card">
                <div className="card-header">
                    <Link className="btn btn-success" to={'CreateUser'}>Add new employed</Link>
                </div>
                <div className="card-body">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employed.map(
                            (employ) => (
                        <tr key={employ.id}>
                            <th>{employ.id}</th>
                            <td>{employ.name}</td>
                            <td>{employ.email}</td>
                            <td>
                                <div className="btn-group" role="group" aria-label="">
                                    {/* <Link className="btn btn-warning px-md-4"  to={'DetailUser'}>Detail</Link> */}
                                    <Link className="btn btn-warning px-md-4" to={{
                                        pathname:`/DetailUser/${employ.id}`
                                        }} >Detail</Link>
                                    <button type="button" className="btn btn-danger px-md-4"
                                    onClick={()=>this.DeleteRegister(employ.id)}>Delete</button>
                                </div>
                            </td>
                        </tr>))}
                    </tbody>
                </table>
                </div>
                </div>
            )
        }
    }
}

class UserDetail extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            dateLoaded: false,
            employee:{},
            name:'',
            email:'',
            street:'',
            id:0,
        }
    }
    getUserDetail () {
        this.setState({id: this.props.match.params.id});
        fetch(`https://jsonplaceholder.typicode.com/users/${this.props.match.params.id}`)
        .then(response => response.json())
        .then(response => {
            console.log({ response })
            this.setState({
                employee: response,
                street: response.address.street,
                email: response.email,
                suite: response.address.suite,
                city: response.address.city,
                zipcode: response.address.zipcode,
            });
            console.log(this.state.employee);
            console.log(this.state.street);

        })
        .catch(console.log)
    }
    dates(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then ((dateResponse)=>{
            this.setState({dateLoaded:true, employed:dateResponse })
        })
        .catch(console.log)
    }
    componentDidMount(){
        this.dates();
        this.getUserDetail();
    }
        render(){
        const {dateLoaded, street, employee, suite, city,zipcode , id} = this.state
        if (!dateLoaded){return(<div>Loaded...</div>)}
        else{
            return(
            <div className="card">
                <div className="card-header">
                    <h1>User data</h1>
                </div> 
                <div className="card-body">
                    <p><b className="">ID User: </b>{id}</p>
                    <p><b>Name: </b>{employee.name}</p>
                    <p><b>Username: </b>{employee.username}</p>
                    <p><b>email: </b>{employee.email}</p>
                    <p><b>Phone: </b>{employee.phone}</p>
                    <p><b>Street: </b>{street}</p>
                    <p><b>Suit: </b>{suite}</p>
                    <p><b>City: </b>{city}</p>
                    <p><b>Zipcode: </b>{zipcode}</p>
                </div>   
                
            </div>

            )
        }
        
    }
}




 
export {UsersShow, CreateUser, UserDetail}
