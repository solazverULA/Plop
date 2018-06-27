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
import Cookies from 'react-cookies';
import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from 'react-share';
import {
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  WhatsappIcon,
  EmailIcon,
} from 'react-share';

class Contacts extends React.Component{

  constructor(props) {
    super(props);

    this.state = {visible: false,
                  toggle: false,
                  contacts:[],
                  User:Cookies.load('userId')
                 };

    this.toggleModal = this.toggleModal.bind(this);
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
      shareButton: !this.state.shareButton
    });
  }

  deleteListener(index) {
    this.setState({contacts:this.state.contacts.filter((data,i)=>i!==index)})
  }
    render(){
        return (
            <div>

              {this.showChart()}

              <Modal isOpen={this.state.toggle} toggle={this.toggleModal}
                className={this.props.className}>
                <ModalHeader toggle={this.toggleModal}>{language("InvitarReceptores")}</ModalHeader>
                <ModalBody>
                  <Row className="flex-center text-center">
                    <FormGroup>
                      <div>
                        {language("CompartirEnlace")}
                      </div>
                      <InputGroup>
                        <Input style={{width:'300px'}} type="text" id="notification_title" name="Title" placeholder="Notification title" onChange={(event)=>this.setState({Title:event.target.value})} required={true}/>
                      </InputGroup>
                    </FormGroup>
                  </Row>
                </ModalBody>
                <ModalFooter className='justify-content-center text-center'>
                  <Button color="primaryBlue">
                    <i className="now-ui-icons arrows-1_share-66"></i>
                  </Button>
                  <Button color="primaryBlue">
                    <i className="now-ui-icons files_single-copy-04"></i>
                  </Button>
                </ModalFooter>

              </Modal>

              { this.state.contacts[0] != null ?

                <Table hover responsive>
                  <thead className="thead-default">
                    <tr>
                      <th className="justify-content-center text-center">{language("CreateName")}</th>
                      <th className="justify-content-center text-center">{language("Telefono")}</th>
                      <th className="justify-content-center text-center">{language("CreatePais")}</th>
                      <th className="justify-content-center text-center">{language("BotonEliminar")}</th>
                    </tr>
                  </thead>
                  <tbody>
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
                            {contacts.Srcicon}
                          </td>
                          <td className="justify-content-center text-center">
                            <Button style={{width:'50px', alignItems:"center"}} color="primaryBlue" for="notification_file" onClick={()=>this.deleteListener(i)}>
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
                  <h2>{language("InvitarReceptores")}</h2>
              </div>

              }

              <div style={{paddingBottom:'1%', paddingRight:'1%'}} className="fixed-right justify-content-right text-right">
                <Button color="primaryBlue" style={{width:'50px', height:'50px'}} className="btn-round btn-icon" onClick={this.toggleModal}>
                  <i className="now-ui-icons ui-1_simple-add"></i>
                </Button>
              </div>
              <Modal className="boton-volver" style={{}} isOpen={this.state.shareButton} toggle={()=>{ this.setState({shareButton:false})}} >
                <ModalHeader  >
                    <table>
                      <tr>
                        <td>{language("Compartir")}</td>
                      </tr>
                    </table>
                  </ModalHeader>
                  <table style={{margin:'10%'}} >
                    <tr>
                      <td onClick={()=>{this.setState({shareButton:false})}}>
                        <WhatsappShareButton children={<WhatsappIcon size={32} round={true} />} title={""} url={"https://localhost:3000/ListenerWeb/"+this.state.User.Id}
                        />
                      </td>
                      <td>Whatsapp</td>
                    </tr>
                    <tr>
                      <td onClick={()=>{this.setState({shareButton:false})}}>
                        <TwitterShareButton children={<TwitterIcon size={32} round={true} />} title={""} url={"https://localhost:3000/ListenerWeb/"+this.state.User.Id}
                        />
                      </td>
                      <td>Twitter</td>
                    </tr>
                    <tr>
                      <td onClick={()=>{this.setState({shareButton:false})}}>
                        <EmailShareButton children={<EmailIcon size={32} round={true} />} subject={""} body={"https://localhost:3000/ListenerWeb/"+this.state.User.Id}
                        />
                      </td>
                      <td>Email</td>
                    </tr>

                  </table>
                  <ModalFooter  >
                    <Button className="boton-volver" style={{marginRight: '38%'}} onClick={()=>{this.setState({shareButton:this.state.shareButton})}}>{language("Cerrar")}</Button>
                  </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default Contacts;
