import React, { Component } from 'react';
import './App.css';
import Posts from './PostsContainer/PostsContainer';
import EventContainer from './EventContainer/EventContainer';
import NavContainer from './NavContainer/NavContainer'
import { Col, Container, Row} from 'reactstrap';
import Login from './Login/Login';
import {Route, Switch} from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import Cookie from 'js-cookie';

library.add(faSearch)


const My404 = () => {
  return (
    <div>
      You're Lost
    </div>
    )
};
class App extends Component {
  constructor () {
    super()
      this.state = {
        loggedIn: false,
        username: "",
        password: ""
      }
  }
  componentDidMount(){
    this.getToken()
    console.log('GOT TOKEN********')
  }

  getToken = async () => {
    const token = await fetch('http://localhost:8000/users/getToken', {
      method: 'get',
      credentials: 'include', // this sends our session cookie with our request
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  handleInputs = (e) => {
  this.setState({
    [e.currentTarget.name]: e.currentTarget.value
  })
  }
  
  handleRegistration = async (e) => {
  e.preventDefault();
  console.log(this.state);
  const csrfCookie = Cookie('csrftoken');

  try{
    const createdUser = await fetch('http://localhost:8000/users/', {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfCookie,
      } 
    });
    const createdUserJSON = await createdUser.json();
    if(createdUserJSON.status == 200){
      this.setState({
        loggedIn: true,
        username: createdUserJSON.data.username,
        password: createdUserJSON.data.password
      })
      console.log(this.state.username, "<---- username bro")
    } else if (createdUserJSON.status == 500){
      console.log("INTERNAL SERVER ERROR")
    }
  }catch(err){
    console.log(err, " error")
  }
  }

  handleLogin = async (e) => {
    e.preventDefault();
    console.log(this.state);
    const csrfCookie = Cookie('csrftoken');

    try{
      const foundUser = await fetch('http://localhost:8000/users/login/', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfCookie,
        }, 
      });
      console.log(foundUser , "Getting here")
      const foundUserJSON = await foundUser.json();
      console.log(foundUserJSON, ' this is found user')
      if(foundUser.status == 200){
        this.setState({
          loggedIn: true,
          username: this.state.username,
          password: this.state.password
        })
        console.log(this.state, '<----user is loggedin')
        console.log(this.state.username, "<---- username bro")
      } else if (foundUserJSON.status == 500){
        console.log("INTERNAL SERVER ERROR")
      }
    }catch(err){
      console.log(err, " error")
    }
    }
    
    getToken = async () => {
      const token = await fetch('http://localhost:8000/users/getToken', {
        method: 'get',
        credentials: 'include', // this sends our session cookie with our request
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const tokenResponse = token.json();
      return tokenResponse;
    }
  
   render() {
    return (
      <div className="App">
     
      <NavContainer />
    
          { this.state.loggedIn ? 
          <div>
            <Row>
              
              
                  <img src="live-music2.jpeg" className="live-music"/>
            
            </Row>

            <Container>
              <Row>
                  <Posts username = {this.state.username} /> 
                </Row>  
                <Row> 
                    <EventContainer />
                </Row>
            </Container>
   
          
          </div>: 
          
   
            <Login handleRegistration={this.handleRegistration} handleInputs={this.handleInputs} handleLogin={this.handleLogin}/>}
        
          
      </div>
    );
  }
}

export default App;