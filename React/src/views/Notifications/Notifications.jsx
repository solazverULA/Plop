import React from 'react';

/*
import {
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Table,
} from 'reactstrap';
*/

import {
    Button,  Row,  Modal,  ModalHeader,  ModalBody,  ModalFooter,  Input,  InputGroup, FormGroup, Table
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
import language from "../../api/translator/translator"

class Notifications extends React.Component{

  constructor(props) {
    super(props);

    this.state = {visible: false,
                  toggle: false,
                  notifications:[]
                 };

    this.toggleModal = this.toggleModal.bind(this);
    this.registerNotification = this.registerNotification.bind(this);

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
    Api._RegisterNotification(this.state, File, '25302093',this.toggleModal)
  }

    render(){
        return (
            <div>

              {this.showChart()}

              <Modal isOpen={this.state.toggle} toggle={this.toggleModal}
                className={this.props.className}>
                <ModalHeader toggle={this.toggleModal}>{language("CrearNotificacion")}</ModalHeader>
                <ModalBody style={{'paddingLeft':'7%', 'paddingRight':'7%'}}>
                  <div style={{'paddingLeft':'7%', 'paddingRight':'7%'}}>
                    <Row>
                      <FormGroup>
                        <div>
                          {language("CreateTitulo")}
                        </div>
                        <InputGroup>
                          <Input style={{width:'300px'}} type="text" id="notification_title" name="Title" placeholder="Notification title" onChange={(event)=>this.setState({Title:event.target.value})} required={true}/>
                        </InputGroup>
                      </FormGroup>
                    </Row>
                    <Row>
                      <FormGroup>
                        {language("AdjuntarImagen")}
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
                          {language("CreateMensaje")}
                        </div>
                        <InputGroup>
                          <textarea onChange={(event)=>this.setState({Body:event.target.value})} className='business-title-color' style={{'borderRadius':'5px', 'borderColor':'#979797', 'height':'107px'}} type="text" id="notification_Body" name="Body" required={true}/>
                        </InputGroup>
                      </FormGroup>
                    </Row>
                  </div>

                </ModalBody>
                <ModalFooter className='justify-content-right text-right'>
                  <Button color="primaryBlue" onClick={this.registerNotification}>{language("BotonCrear")}</Button>
                </ModalFooter>

              </Modal>

              { this.state.notifications[0] != null ?

                <Table hover responsive>
                  <thead className="thead-default">
                    <tr>
                      <th className="justify-content-center text-center">{language("CreateTitulo")}</th>
                      <th className="justify-content-center text-center">{language("Fecha")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    { this.state.notifications.map((notifications, i)=>{
                      return(
                        <tr key = {i}>
                          <td className="justify-content-center text-center"></td>
                          <td className="justify-content-center text-center"></td>
                        </tr>
                      );

                    })}
                  </tbody>
                </Table>

              :

              <div className="content flex-center animated animatedFadeInUp fadeInUp">
                  <h2>{language("CrearNuevaNotificacion")}</h2>
              </div>

              }

              <div style={{paddingBottom:'1%', paddingRight:'1%'}} className="fixed-right justify-content-right text-right">
                <Button color="primaryBlue" style={{width:'50px', height:'50px'}} className="btn-round btn-icon" onClick={this.toggleModal}>
                  <i className="now-ui-icons ui-1_simple-add"></i>
                </Button>
              </div>

            </div>
        );
    }
}

export default Notifications;
