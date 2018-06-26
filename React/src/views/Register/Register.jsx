import React from 'react';
import {
    Card, CardHeader, Button, CardBody, CardFooter, Label, CardTitle, Row, Col, Input,  InputGroup, FormGroup
} from 'reactstrap';
// react plugin used to create charts
//import { Line, Bar } from 'react-chartjs-2';
// function that returns a color based on an interval of numbers

import {
    PanelHeader, Radio
} from '../../components';

import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import Cookies from 'react-cookies';
import Api from '../../api/Api/Api'

/*import Background from '../../assets/img/bg12.jpg'

let bgStyle = {
  backgroundImage: "url(" + Background + ")",
  backgroundSize: 'cover',
  overflow: 'hidden',
};
*/

class Register extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
                  passwordMatch: false,
                  Gender:"",
                  Namecountry:"",
                  Namecities:"",
                  bgClass:"",
                  Roles_idrole:1
                 };

  }

  componentDidMount() {
    this.setState({ bgClass: 'login-register-bg' });
  }

  registerUser() {
    Api._registerUser(this.state, null, (data)=>{
      if(data.Status === "success"){
        window.location.href="/Dashboard"
        Cookies.save('userId', data.User, { path: '/' })
      }
      console.log(data)
    })
  }

  genderMale(changeEvent) {
    this.setState({
      Gender:"M"
    });
  }

  genderFemale(changeEvent) {
    this.setState({
      Gender:"F"
    });
  }

  confirmPassword(event){
    if (event.target.value !== this.state.Password) {
      this.setState( {passwordMatch: true} )
    } else {
      this.setState( {passwordMatch: false} )
    }
  }

    render(){
        return (
            <div>
                <PanelHeader
                    size="sm"
                />
              <div className={'content ' + this.state.bgClass}>
                    <Row className="justify-content-center">
                        <Col xs="12" md="5" className="justify-content-center">
                            <Card className="card-chart max-width" style={{opacity:'0.9'}}>
                                <CardHeader style={{paddingTop:'7%'}}>
                                    <CardTitle>Register</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <div xs={10} md={2} lg={2} style={{paddingTop:'2%'}}>
                                      <FormGroup>
                                        <div>
                                          Name
                                        </div>
                                        <InputGroup>
                                          <Input onChange={(event)=>this.setState({Nameprofile:event.target.value})} type="text" id="register_name" name="Name" required={true}/>
                                        </InputGroup>
                                      </FormGroup>
                                      <FormGroup>
                                        <div>
                                          E-mail
                                        </div>
                                        <InputGroup>
                                          <Input onChange={(event)=>this.setState({Email:event.target.value})} type="email" id="register_email" name="Email" required={true}/>
                                        </InputGroup>
                                      </FormGroup>
                                      <FormGroup>
                                        <div>
                                          Password
                                        </div>
                                        <InputGroup>
                                          <Input onChange={(event)=>this.setState({Password:event.target.value})} type="password" id="register_password" name="Password" required={true}/>
                                        </InputGroup>
                                      </FormGroup>
                                      <FormGroup>
                                        <div>
                                          Confirm password
                                        </div>
                                        <InputGroup>
                                          <Input onChange={(event)=>this.confirmPassword(event)} type="password" id="register_confirm_password" name="Password" required={true}/>
                                        </InputGroup>
                                      </FormGroup>
                                      { this.state.passwordMatch === true ?
                                        <p>Passwords does not match.</p>
                                      : null }
                                      <FormGroup>
                                        <div>
                                          ID number
                                        </div>
                                        <InputGroup>
                                          <Input onChange={(event)=>this.setState({iduser:event.target.value})} type="number" id="register_id_number" name="id" required={true}/>
                                        </InputGroup>
                                      </FormGroup>
                                      <Row>
                                        <Col className="justify-content-center text-center">
                                          <Radio
                                              label="Male"
                                              inputProps={{name:"radio",value:"M",onChange:(event)=>this.setState({Gender:event.target.value})}}
                                          />
                                        </Col>
                                        <Col className="justify-content-center text-center">
                                          <Radio
                                              label="Female"
                                              inputProps={{name:"radio",value:"F",onChange:(event)=>this.setState({Gender:event.target.value})}}
                                          />
                                        </Col>
                                      </Row>
                                      <FormGroup>
                                        <div>
                                          Country
                                        </div>
                                        <InputGroup className="max-width">
                                          <CountryDropdown
                                            value={this.state.Namecountry}
                                            onChange={(val)=>this.setState({Namecountry:val})}
                                          />
                                        </InputGroup>
                                      </FormGroup>
                                      <Row>
                                        <Col>
                                          <FormGroup style={{paddingTop:'5%'}}>
                                            <div>
                                              City
                                            </div>
                                            <InputGroup>
                                              <RegionDropdown
                                                country={this.state.Namecountry}
                                                value={this.state.Namecities}
                                                onChange={(val) => this.setState({Namecities:val})}
                                              />
                                            </InputGroup>
                                          </FormGroup>
                                        </Col>
                                        <Col>
                                          <FormGroup>
                                            <div>
                                              ZIP code
                                            </div>
                                            <InputGroup>
                                              <Input onChange={(event)=>this.setState({Zip_code:event.target.value})} type="number" id="zip_code" name="zip" required={true}/>
                                            </InputGroup>
                                          </FormGroup>
                                        </Col>
                                      </Row>
                                    </div>
                                </CardBody>
                                <CardFooter className='justify-content-right text-right' style={{marginTop:'-2%'}}>
                                  <Button onClick={this.registerUser.bind(this)} color="primaryBlue" style={{width:'100px'}}>register</Button>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                    <div className='justify-content-right text-right' style={{paddingRight:'2%', marginBottom:'-2%'}}>
                      <a href='https://www.freepik.com/free-photo/enjoying-instagram-and-facebook-at-the-same-time_1209691.htm'>Designed by Freepik</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
