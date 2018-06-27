import React from 'react';
import {
    Card, CardHeader, CardBody, Row, Col, FormGroup, Input, Button, Label
} from 'reactstrap';

import { PanelHeader, FormInputs, CardAuthor, CardSocials } from '../../components';

import userBackground from '../../assets/img/bg5.jpg';
import userAvatar from '../../assets/img/mike.jpg';
import Cookies from 'react-cookies';
import Api from '../../api/Api/Api'
import Languaje from '../../api/translator/translator'

class User extends React.Component{

    constructor(props) {
    super(props);

    this.state = {
                  userId:Cookies.load('userId'),
                  user:{Cities:{},Countries:{},User:{}, People:{}},
                  Mensaje:""
                 };

                 this.file = null;
                 Api._getUserForId(this.state.userId.Id, (data)=>{
                    this.setState({user:data})
                 })
    }

    _Save() {
        Api._updateUser(this.state.user, this.state.userId.Id, this.state.file,(data)=>{
            if(data.Status == "success"){
               this.setState({Mensaje:"Usuario actualizado con éxito"})
            }
        })
    }

    render(){
        return (
            <div>
                <PanelHeader size="sm"/>
                <div className="content">
                    <Row>
                        <Col md={8} xs={12}>
                            <Card>
                                <CardHeader>
                                    <h5 className="title">{Languaje("EditarUsuario")}</h5>
                                </CardHeader>
                                <CardBody>
                                    <form>
                                        <FormInputs
                                            ncols = {["col-md-3 pr-1" , "col-md-5 px-1" , "col-md-4 pl-1"]}
                                            proprieties = {[
                                                {
                                                    label : Languaje("CreateName"),
                                                    inputProps : {
                                                        type : "text",
                                                        disabled: false,
                                                        defaultValue: this.state.user.People.Nameprofile,
                                                        value: this.state.user.People.Nameprofile,
                                                        onChange:(val)=>this.setState({user:{...this.state.user, People:{...this.state.user.People, Nameprofile:val.target.value}}})
                                                    }
                                                },
                                                {
                                                    label : Languaje("CreateEmail"),
                                                    inputProps : {
                                                        type : "text",
                                                        value: this.state.user.User.Email,
                                                        defaultValue: this.state.user.User.Email,
                                                        onChange:(val)=>this.setState({user:{...this.state.user, User:{...this.state.user.User, Email:val.target.value}}})
                                                    }
                                                },
                                                {
                                                    label : Languaje("CreatePassword"),
                                                    inputProps : {
                                                        type : "text",
                                                        defaultValue:this.state.user.Password,
                                                        value:this.state.user.Password,
                                                        placeholder: "Contraseña",
                                                        onChange:(val)=>this.setState({user:{...this.state.user, User:{...this.state.user.User, Password:val.target.value}}})
                                                    }
                                                }
                                            ]}
                                        />
                                        <FormGroup>
                                            <label> {Languaje("CreateGenero") }</label>
                                            <Input type="select" name="Gender" id="exampleSelect"
                                            onChange={(val)=>this.setState({user:{...this.state.user, People:{...this.state.user.People, Gender:val.target.value}}})}
                                            >
                                                <option>{Languaje("SexoFemenino")}</option>
                                                <option>{Languaje("SexoMasculino")}</option>
                                            </Input>
                                        </FormGroup>
                                        <FormInputs
                                            ncols = {["col-md-4 pr-1" , "col-md-4 px-1" , "col-md-4 pl-1"]}
                                            proprieties = {[
                                                {
                                                    label : Languaje("CreateCiudad"),
                                                    inputProps : {
                                                        type : "text",
                                                        defaultValue: "Bucharest",
                                                        value:this.state.user.Cities.Namecities,
                                                        placeholder: "City",
                                                        onChange:(val)=>this.setState({user:{...this.state.user, Cities:{...this.state.user.Cities, Namecities:val.target.value}}})
                                                    }
                                                },
                                                {
                                                    label : Languaje("CreatePais"),
                                                    inputProps : {
                                                        type : "text",
                                                        defaultValue: "Venezuela",
                                                        value:this.state.user.Countries.Namecountry,
                                                        placeholder: Languaje("CreatePais"),
                                                        onChange:(val)=>this.setState({user:{...this.state.user, Countries:{...this.state.user.Countries, Namecountry:val.target.value}}})

                                                    }
                                                },
                                                {
                                                    label : "Postal Code",
                                                    inputProps : {
                                                        type : "text",
                                                        value:this.state.user.Cities.Zipcode,
                                                        placeholder: "ZIP Code",
                                                        onChange:(val)=>this.setState({user:{...this.state.user, Cities:{...this.state.user.Cities, Zipcode:val.target.value}}})
                                                    }
                                                }
                                            ]}
                                        />
                                        <Button onClick={this._Save.bind(this)}>
                                            {Languaje("BotonGuardar")}
                                        </Button>
                                    </form>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md={4}  xs={12}>
                            <Card className="card-user">
                                <div className="image">
                                    <img src={userBackground} alt="..."/>
                                </div>
                                <CardBody>
                                    <CardAuthor
                                        avatar={this.state.file ? URL.createObjectURL(this.state.file) : "https://drive.google.com/uc?export=view&id="+this.state.user.People.Srcimage}
                                        avatarAlt="..."
                                        title={this.state.user.People.Nameprofile}
                                        //description="michael23"
                                    />
                                    <p className="description text-center">
                                        "{Languaje("Hola")} {this.state.user.People.Nameprofile} <br/>
                                        {Languaje("Lugar")} <br/>
                                        {Languaje("Editar")}"
                                    </p>
                                </CardBody>
                                <hr />
                                <Card>
                                    <Label for="file-upload" className="custom-file-upload" onClick={()=>{document.getElementById("file-upload").click()}}
                                    style={{'borderRadius':'15px', 'backgroundColor':'#888', 'color':{value:'white', important:'true'}}}
                                    >
                                        <i className="fa fa-cloud-upload"></i> {"Editar imagen"}
                                    </Label>
                                    <Input id="file-upload"  onChange={(event)=>{(event)=>{this.setState({file: event.target.files[0]})}}} type="file"/>
                                </Card>
                                <p> {this.state.Mensaje}</p>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default User;
