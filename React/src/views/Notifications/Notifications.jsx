import React from 'react';

/*
import {
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Table,
} from 'reactstrap';
*/

import {
    Button,  Row,  Modal,  ModalHeader,  ModalBody,  ModalFooter,  Input,  InputGroup, FormGroup, Table, Col
} from 'reactstrap';

/*
// react plugin used to create charts
import { Line, Bar } from 'react-chartjs-2';
*/

// function that returns a color based on an interval of numbers

import {
    PanelHeader,
    Checkbox
} from '../../components';

import Api from '../../api/Api/Api'
import language from "../../api/translator/translator"
import Cookies from 'react-cookies';
class Notifications extends React.Component{

  constructor(props) {
    super(props);
    let Groups =  Cookies.load("userGroups");
    this.state = {visible: false,
                  toggle: false,
                  notifications:[],
                  notificationType:0,
                  User:Cookies.load('userId'),
                  Groups: Groups ? Groups : [],
                  contacts:[],
                  Listeners:[],
                 };

    this.toggleModal = this.toggleModal.bind(this);
    this.registerNotification = this.registerNotification.bind(this);
    this.changeNotificationType = this.changeNotificationType.bind(this);
    Api._getNotificationsUser(this.state.User.Id, (data)=>this.setState({notifications:data ? data : []}));
    Api._getListenerForUserId(this.state.User.Id, (data)=>{this.setState({contacts:data ? data : []})});

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
      toggle: !this.state.toggle,
      showAddContacts:false
    });
  }

  registerNotification() {

    if(!this.state.showAddContacts){
      this.setState({showAddContacts:true})
      return;
    }
    Api._RegisterNotification(this.state, this.state.File, this.state.User.Id,this.toggleModal)
  }

  deleteNotification(index) {
    this.setState({notifications:this.state.notifications.filter((data,i)=>i!==index)})
  }

  changeNotificationType(event){
    this.setState({notificationType:Number(event.target.value), Type:Number(event.target.value)})
  }

  addListenerToNotification(contacts) {
    this.state.Listeners.push(contacts.Id)
  }
  addListenerFromGroup(index) {
    this.state.Groups[index].Listener.forEach((data)=>{
      this.addListenerToNotification(data)
    })
  }

  render(){
     return (
            <div>

              {this.showChart()}

              <Modal isOpen={this.state.toggle} toggle={this.toggleModal}
                className={this.props.className}>
                <ModalHeader toggle={this.toggleModal}>{language("CrearNotificacion")}</ModalHeader>
                <ModalBody style={{'paddingLeft':'7%', 'paddingRight':'7%'}}>
                  { !this.state.showAddContacts ? 
                    <div>
                        <InputGroup style={{'marginLeft':'1%'}}>
                        <Input onChange={this.changeNotificationType} style={{'borderRadius':'5px', 'borderColor':'#979797'}} className='business-title-color' type="select" id="notification_type" name="Type" required={true}>
                          <option value="0">{language("NotificacionSimple")}</option>
                          <option value="2">{language("NotificacionURL")}</option>
                        </Input>
                      </InputGroup>

                      <div style={{'paddingBottom':'5%', 'paddingTop':'5%'}}>
                        <div style={{'width':'100%', 'height':'1px', 'backgroundColor':'#616A6B'}}/>
                      </div>

                      { this.state.notificationType === 0?

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
                              <Button style={{width:'150px'}} color="primaryBlue" htmlFor="notification_file" onClick={()=>{document.getElementById("notification_file").click()}}>
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
                      : null }

                      { this.state.notificationType === 2 ?

                        <div style={{'paddingLeft':'7%', 'paddingRight':'7%'}}>

      										<Col xs="12" md="6" sm="6" lg="6">
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

      											<Row style={{'paddingBottom':'2%'}}>
      												<strong>{language("EnlaceNotificacion")}</strong>
      											</Row>

      											<Row>
      												<FormGroup>
      													<div className='business-title-color'>
      														{language("EtiquetaBoton")}
      													</div>
                                <InputGroup>
                                  <Input style={{width:'300px'}} type="text" id="notification_title" name="Title" placeholder="Notification title" onChange={(event)=>this.setState({Namebutton:event.target.value})} required={true}/>
                                </InputGroup>
      												</FormGroup>
      											</Row>
      											<Row>
    													<FormGroup>
      													<div className='business-title-color'>
      														URL
      													</div>
                                <InputGroup>
                                  <Input style={{width:'300px'}} type="text" id="notification_title" name="Title" placeholder="Notification title" onChange={(event)=>this.setState({Action:event.target.value})} required={true}/>
                                </InputGroup>
      												</FormGroup>
      											</Row>
      										</Col>
      										<Col xs="12" md="6" sm="6" lg="6">
                              <FormGroup>
                                <div className='business-title-color'>
                                  {language("CreateMensaje")}
                                </div>
                                <InputGroup>
                                  <textarea onChange={(event)=>this.setState({Body:event.target.value})} className='business-title-color' style={{'borderRadius':'5px', 'borderColor':'#979797', 'height':'107px'}} type="text" id="notification_Body" name="Body" required={true}/>
                                </InputGroup>
                              </FormGroup>
      										</Col>
      									</div>

                      : null }

                    </div>
                  :<div>
                       <Table hover responsive>
                        <thead className="thead-default">
                          <tr>
                          
                          </tr>
                        </thead>
                        <tbody>
                          { this.state.Groups.map((group, i)=>{
                            return(
                              <tr key = {i}>
                                <td className="justify-content-center text-center">{group.Name}</td>
                                <td className="justify-content-center text-center">{group.Listener.length}</td>
                            
                                <td className="justify-content-center text-center">
                                  <Checkbox
                                      label=""
                                      inputProps={{defaultChecked: false, onChange:()=>this.addListenerFromGroup(i)}}

                                  />
                                </td>
                              </tr>
                            );

                          })}
                
                          { this.state.contacts.map((contacts, i)=>{
                            return(
                              <tr key = {i}>
                                <td className="justify-content-center text-center">
                                  {contacts.Nameprofile}
                                </td>
                                <td className="justify-content-center text-center">
                                  {contacts.Gender}
                                </td>
                                <td className="justify-content-center text-center">
                                 <Checkbox
                                      label=""
                                      inputProps={{defaultChecked: false, onChange:()=>this.addListenerToNotification(contacts)}}

                                  />
                                </td>
                              </tr>
                            );

                          })}
                        </tbody>
                      </Table>
                     
                    </div>
                    
                  }

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
                      <th className="justify-content-center text-center">{language("CreateMensaje")}</th>
                      <th className="justify-content-center text-center">{language("CreateImagen")}</th>
                      <th className="justify-content-center text-center">{language("BotonEliminar")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    { this.state.notifications.map((notifications, i)=>{
                      return(
                        <tr key = {i}>
                          <td className="justify-content-center text-center">
                            {notifications.Notifications.Title}
                          </td>
                          <td className="justify-content-center text-center">
                            {notifications.Notifications.Body}
                          </td>
                          <td className="justify-content-center text-center">
                            <img width="50" height="50" src={"https://drive.google.com/uc?export=view&id="+notifications.Notifications.Srcimage}/>
                          </td>
                          <td className="justify-content-center text-center">
                             <Button style={{width:'50px', alignItems:"center"}} color="primaryBlue" htmlFor="notification_file" onClick={()=>this.deleteNotification(i)}>
                              <i className='now-ui-icons ui-1_simple-remove'></i>
                            </Button>
                          </td>
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
