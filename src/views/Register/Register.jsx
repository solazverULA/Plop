import React from 'react';
import {
    Card, CardHeader, Button, CardBody, CardFooter, CardTitle, Row, Col, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Table, Input,  InputGroup, FormGroup
} from 'reactstrap';
// react plugin used to create charts
import { Line, Bar } from 'react-chartjs-2';
// function that returns a color based on an interval of numbers

import {
    PanelHeader, Stats, CardCategory, Tasks
} from '../../components';

import {
    dashboardPanelChart,
    dashboardShippedProductsChart,
    dashboardAllProductsChart,
    dashboard24HoursPerformanceChart
} from '../../variables/charts.jsx';

import { tasks } from '../../variables/general.jsx';

class Register extends React.Component{
    render(){
        return (
            <div>
                <PanelHeader
                    size="sm"
                />
              <div className="content">
                    <Row className="justify-content-center">
                        <Col xs={12} md={4} className="justify-content-center">
                            <Card className="card-chart" style={{height: '300px'}}>
                                <CardHeader style={{paddingTop:'7%'}}>
                                    <CardTitle>Register</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <div xs={10} md={2} lg={2} style={{paddingTop:'2%'}}>
                                      <FormGroup>
                                        <div>
                                          E-mail
                                        </div>
                                        <InputGroup>
                                          <Input type="email" id="register_email" name="Email" required={true}/>
                                        </InputGroup>
                                      </FormGroup>
                                      <FormGroup>
                                        <div>
                                          Password
                                        </div>
                                        <InputGroup>
                                          <Input type="password" id="register_password" name="Password" required={true}/>
                                        </InputGroup>
                                      </FormGroup>
                                      <FormGroup>
                                        <div>
                                          Confirm password
                                        </div>
                                        <InputGroup>
                                          <Input type="password" id="register_confirm_password" name="Password" required={true}/>
                                        </InputGroup>
                                      </FormGroup>
                                      <FormGroup>
                                        <div>
                                          ID number
                                        </div>
                                        <InputGroup>
                                          <Input type="number" id="register_id_number" name="id" required={true}/>
                                        </InputGroup>
                                      </FormGroup>
                                      <FormGroup>
                                        <div>
                                          Gender
                                        </div>
                                        <InputGroup>
                                          <Input type="number" id="register_id_number" name="id" required={true}/>
                                        </InputGroup>
                                      </FormGroup>
                                    </div>
                                </CardBody>
                                <CardFooter className='justify-content-right text-right' style={{marginTop:'-2%'}}>
                                  <Button color="primaryBlue" style={{width:'100px'}}>register</Button>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default Register;
