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

class Groups extends React.Component{

  constructor(props) {
    super(props);

    this.state = {visible: false,
                  toggle: false,
                  contacts:[]
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
                      <th className="justify-content-center text-center">{language("CreateEmail")}</th>
                      <th className="justify-content-center text-center">{language("CreatePais")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    { this.state.contacts.map((contacts, i)=>{
                      return(
                        <tr key = {i}>
                          <td className="justify-content-center text-center"></td>
                          <td className="justify-content-center text-center"></td>
                          <td className="justify-content-center text-center"></td>
                          <td className="justify-content-center text-center"></td>
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
