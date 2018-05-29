import React from 'react';
import {
    Card, CardHeader, CardBody, CardFooter, CardTitle, Button, Row, Col, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Table, Input,  InputGroup, FormGroup
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

import Api from '../../api/Api/Api'

class Login extends React.Component{

  loginUser() {
    Api._loginUser(this.state, (data)=>{
      if(data.Status === "success"){
        window.location.href="/Dashboard"
      }
      console.log(data)
    })
  }

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
                                    <CardTitle>Login</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <div xs={10} md={2} lg={2} style={{paddingTop:'2%'}}>
                                      <FormGroup>
                                        <div>
                                          E-mail
                                        </div>
                                        <InputGroup>
                                          <Input onChange={(event)=>this.setState({Email:event.target.value})} type="email" id="login_email" name="Email" required={true}/>
                                        </InputGroup>
                                      </FormGroup>
                                      <FormGroup>
                                        <div>
                                          Password
                                        </div>
                                        <InputGroup>
                                          <Input onChange={(event)=>this.setState({Password:event.target.value})} type="password" id="login_password" name="Password" required={true}/>
                                        </InputGroup>
                                      </FormGroup>
                                    </div>
                                </CardBody>
                                <CardFooter className='justify-content-right text-right' style={{marginTop:'-2%'}}>
                                  <Button onClick={this.loginUser.bind(this)} color="primaryBlue" style={{width:'100px'}}>login</Button>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default Login;
