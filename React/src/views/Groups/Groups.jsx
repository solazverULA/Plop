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
    PanelHeader,
    Checkbox
} from '../../components';
import Api from '../../api/Api/Api'
//import Api from '../../api/Api/Api'
import language from "../../api/translator/translator"
import Cookies from 'react-cookies';

class Groups extends React.Component{

  constructor(props) {
    super(props);
    let Groups =  Cookies.load("userGroups");
    this.state = {visible: false,
                  toggle: false,
                  contacts:[],
                  User:Cookies.load('userId'),
                  Groups: Groups ? Groups : [],
                  NameNew:"",
                  newListener:[]
                 };

    this.toggleModal = this.toggleModal.bind(this);
    Api._getListenerForUserId(this.state.User.Id, (data)=>{this.setState({contacts:data ? data : []})});
    this.addGroup =  this.addGroup.bind(this)

  }
  deleteGroup(index) {
    this.setState({Groups:this.state.Groups.filter((data,i)=>i!==index)})
    this.saveGroups();
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
  saveGroups() {
    Cookies.save('userGroups', this.state.Groups , { path: '/' })
  }
  addGroup() {
    this.state.Groups.push({Name:this.state.NameNew, Listener:this.state.newListener})
    this.setState({toggle:false, newListener:[], NameNew:""})
    this.saveGroups();
  }

  render(){
        return (
            <div>

              {this.showChart()}

              <Modal isOpen={this.state.toggle} toggle={this.toggleModal}
                className={this.props.className}>
                <ModalHeader toggle={this.toggleModal}>{language("CrearGruposModal")}</ModalHeader>
                <ModalBody>
                  <Row className="flex-center text-center">
                    <FormGroup>
                      <div>
                        {language("CreateName")}
                      </div>
                      <InputGroup>
                        <Input onChange={(event)=>this.setState({NameNew:event.target.value})} type="email" id="login_email" name="Email" required={true}/>
                      </InputGroup>
                    </FormGroup>
                    <Table hover responsive>
                      <thead className="thead-default">
                        <tr>
                          <th className="justify-content-center text-center">{language("CreateName")}</th>
                          <th className="justify-content-center text-center">{language("Telefono")}</th>
                          <th className="justify-content-center text-center">{language("BotonAgregar")}</th>
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
                               <Checkbox
                                    label=""
                                    inputProps={{defaultChecked: false, onChange:()=>this.state.newListener.push(contacts)}}

                                />
                              </td>
                            </tr>
                          );

                        })}
                      </tbody>
                    </Table>

                  </Row>
                </ModalBody>
                <ModalFooter className='justify-content-center text-center'>
                  <Button color="primaryBlue" onClick={this.addGroup}>

                    <div>{language("BotonCrear")}</div>

                  </Button>
                </ModalFooter>

              </Modal>

              { this.state.Groups[0] != null ?

                <Table hover responsive>
                  <thead className="thead-default">
                    <tr>
                      <th className="justify-content-center text-center">{language("CreateName")}</th>
                      <th className="justify-content-center text-center">{language("numContacts")}</th>

                      <th className="justify-content-center text-center">{language("BotonEliminar")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    { this.state.Groups.map((group, i)=>{
                      return(
                        <tr key = {i}>
                          <td className="justify-content-center text-center">{group.Name}</td>
                          <td className="justify-content-center text-center">{group.Listener.length}</td>

                          <td className="justify-content-center text-center">
                           <Button style={{width:'50px', alignItems:"center"}} color="primaryBlue" htmlFor="notification_file" onClick={()=>this.deleteGroup(i)}>
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
                  <h2>{language("CrearGrupos")}</h2>
              </div>

              }

              <div style={{paddingBottom:'2%', paddingRight:'2%'}} className="fixed-right justify-content-right text-right">
                <Button color="primaryBlue" style={{width:'50px', height:'50px'}} className="btn-round btn-icon" onClick={this.toggleModal}>
                  <i className="now-ui-icons ui-1_simple-add"></i>
                </Button>
              </div>

            </div>
        );
    }
}

export default Groups;
