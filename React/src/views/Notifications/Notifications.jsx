import React from 'react';

/*
import {
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Table,
} from 'reactstrap';
*/

import {
    Button,  Row,  Modal,  ModalHeader,  ModalBody,  ModalFooter,  Input,  InputGroup, FormGroup
} from 'reactstrap';

/*
// react plugin used to create charts
import { Line, Bar } from 'react-chartjs-2';
*/

// function that returns a color based on an interval of numbers

import {
    PanelHeader
} from '../../components';

import Api from '../../api/Api/Api'

class Dashboard extends React.Component{

  constructor(props) {
    super(props);

    this.state = {visible: false,
                  toggle: false
                 };

    this.toggleModal = this.toggleModal.bind(this);

  }

  showChart() {
    return (
      <PanelHeader
          size="sm"
      />
    )
  }

  toggleModal() {
    this.setState({
      toggle: !this.state.toggle
    });
  }

  registerNotification() {
    Api._RegisterNotification(this.state, File, '25302093')

  }

    render(){
        return (
            <div>

              {this.showChart()}

              <div style={{'marginLeft':'1%', }}>
                <Button color="primaryBlue" className="btn-round btn-icon" onClick={this.toggleModal}>
                  <i className="now-ui-icons ui-1_simple-add"></i>
                </Button>
              </div>

              <Modal isOpen={this.state.toggle} toggle={this.toggleModal}
                className={this.props.className}>
                <ModalHeader toggle={this.toggleModal}>Create a new notification</ModalHeader>
                <ModalBody style={{'paddingLeft':'7%', 'paddingRight':'7%'}}>
                  <div style={{'paddingLeft':'7%', 'paddingRight':'7%'}}>
                    <Row>
                      <FormGroup>
                        <div>
                          Title
                        </div>
                        <InputGroup>
                          <Input style={{width:'300px'}} type="text" id="notification_title" name="Title" placeholder="Notification title" onChange={(event)=>this.setState({Title:event.target.value})} required={true}/>
                        </InputGroup>
                      </FormGroup>
                    </Row>
                    <Row>
                      <FormGroup>
                        Atach an image
                        <InputGroup>
                          <Button style={{width:'150px'}} color="primaryBlue" for="notification_file" onClick={()=>{document.getElementById("notification_file").click()}}>
                            <i className='now-ui-icons design_image'></i>
                          </Button>
                          <Input onChange={(event)=>{this.setState({File: event.target.files[0]})}} style={{paddingLeft:'100%'}} className='custom-file-upload' type="file" id="notification_file" name="File"/>
                        </InputGroup>
                      </FormGroup>
                    </Row>
                    <Row>
                      <FormGroup>
                        <div className='business-title-color'>
                          Message
                        </div>
                        <InputGroup>
                          <textarea onChange={(event)=>this.setState({Body:event.target.value})} className='business-title-color' style={{'borderRadius':'5px', 'borderColor':'#979797', 'height':'107px'}} type="text" id="notification_Body" name="Body" required={true}/>
                        </InputGroup>
                      </FormGroup>
                    </Row>
                  </div>

                </ModalBody>
                <ModalFooter className='justify-content-right text-right'>
                  <Button color="primaryBlue" onClick={this.registerNotification()}>Create</Button>
                </ModalFooter>

              </Modal>

              <div className="content flex-center animated animatedFadeInUp fadeInUp">
                  <h2>Create a new notification!</h2>
              </div>

            </div>
        );
    }
}

export default Dashboard;
