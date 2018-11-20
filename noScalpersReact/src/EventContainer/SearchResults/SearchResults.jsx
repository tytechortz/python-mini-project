import React, {Component} from 'react';
import './SearchResults.css';
import { Button, Modal,CardSubtitle, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Form, Card, CardTitle, CardText, CardBody} from 'reactstrap';


class SearchResults extends Component {
    constructor() {
        super();

        this.state = {
            searchResultsId : ''
        }

  
    }



    render() {

        const searchResults = this.props.searchResults.map((searchResult, i) =>{
            return (
                <div key={i}>
                    <div>
                        <Card className="result-card">
                            <CardBody>
                                <CardSubtitle >{searchResult.displayName}</CardSubtitle>
                                <CardSubtitle className="time">{searchResult.start.time}</CardSubtitle>
                                <Button color="info" href={searchResult.uri}>Click Here to Learn More</Button>
                            </CardBody>
                        </Card> 
                    </div>
                </div>

            )
        })


        return (  

            <div >             
                <p className="searchResults"><a href=""></a>{searchResults} </p>
            </div>
        )
    }
}

export default SearchResults;