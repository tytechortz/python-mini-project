import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Form, Card, CardTitle, CardText, CardBody} from 'reactstrap';
import './PostDetail.css'

class PostDetail extends Component {
    constructor(props) {
        super(props);

        this.state ={

            modal : false, 
            postToEdit: {
                title: props.post.title,
                commentBody: props.post.commentBody,
                _id: props.post._id
              },

        }
        this.toggle = this.toggle.bind(this);
    }


    toggle() {
    this.setState({
        modal: !this.state.modal
    });
    }

    modalShow () {
        this.setState({
            modal: true
        })
    }

    modalClose = () => {
        this.props.submitEdit(
           this.state.postToEdit
        );
        this.setState ({
            modal: false
        })
    }


    handleChange = (e) => {
        this.setState({
            postToEdit: {
                ...this.state.postToEdit,
                [e.currentTarget.name]: e.currentTarget.value
            }
        })
    }

    render() {
        return(

                <div key ={this.props.post._id}>
                  
                    <Card className="post-card">
                        <CardBody>
                            <CardTitle className="card-title">{this.props.post.title}</CardTitle>
                            <CardText>{this.props.post.commentBody}</CardText>
                            <Button color="danger" onClick={this.props.deletePost.bind(null, this.props.post._id)}>Delete</Button>
                            <Button color="info" onClick={this.toggle}>Edit</Button>
                        </CardBody>
                    </Card>
                     <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Edit Post</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Input type="text"  onChange={this.handleChange} name="title" id="title" placeholder= {this.props.post.title}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="commentBody">Comment</Label>
                                    <Input type="textarea"  onChange={this.handleChange} name="commentBody" id="commentBody" placeholder={this.props.post.commentBody}/>
                                </FormGroup>
                            </Form>  
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.modalClose}>Submit</Button>
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                 </div>      
        )
    }



}

export default PostDetail; 