import React, {Component} from 'react';
import {Button, Form, Label, Input, FormGroup} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class SearchTerm extends Component {
    constructor() {
        super();

        this.state = {
            searchTerm: ''
        }
    }


    handleSearchChange = (e) => {
        console.log(this.state.searchTerm)
        this.setState({
          
                [e.currentTarget.name]: e.currentTarget.value
            
        })
    }


    render () {
    return(
            <div>
            <h1>Upcoming Events</h1>
            <Form onSubmit = {this.props.performSearch.bind(null, this.state.searchTerm)}>
                <FormGroup>
                    <Label for="searchTerm">Search for Nearby Events</Label>
                    < Input type="search" value ={this.state.searchTerm} name="searchTerm" onChange={this.handleSearchChange} id="searchTerm" placeholder="search here"  icon="fas fa-search"/> 
                </FormGroup>
                <FontAwesomeIcon icon="search" /><Button input type="submit" value="Submit">Submit</Button>
            </Form>
            </div>
         )    

    }

}

export default SearchTerm;