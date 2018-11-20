import React, {Component} from "react";
import { Form, Label, Button } from "reactstrap";
import './Login.css'

class Login extends Component {
    render(){
        return(
            <div>
             
                <h2>Login</h2>
                <Form onSubmit={this.props.handleLogin}>
                    <Label>
                        username: 
                        <input type="text" name="username" onChange={this.props.handleInputs} />
                    </Label>
                    <Label>
                        password: <input type="password" name="password" onChange={this.props.handleInputs} />
                    </Label>
                    <br/>
                    <br/>
                    <Button>Submit</Button>
                </Form>
                <div className="spacer"/>
                <div className="spacer"/>
                <h2>Register</h2>
                <Form onSubmit={this.props.handleRegistration}>
                    <Label>
                        username: 
                        <input type="text" name="username" onChange={this.props.handleInputs} />
                    </Label>
                    <Label>
                        password: <input type="password" name="password" onChange={this.props.handleInputs} />
                    </Label>
                    
                    <br/>
                    <br/>
                    <Button>Submit</Button>
                </Form>
            </div>
        )
    }
}

export default Login;