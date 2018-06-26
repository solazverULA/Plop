import React from 'react';
import {
  Row,
  Col,
  Button,
  Card,
  CardBlock,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import Loader from 'react-loader-spinner'
import ReactPhoneInput from "../../components/reactPhoneInput";
//import HomePage from '../NotiPromo';
//import NotificationPage from '../Notipoints/Notipoints'
import Api from "../../api/Api/Api";
import cookie from "react-cookies";
import Languaje from "../../api/translator/translator";
import FondoApp from "../../assets/img/fondoapp.jpg";
import LogoPlop from "../../assets/img/Logo_plop.png";


//const applicationServerPublicKey ="BFHGUoqTwUGrJ94P4bquY4BsL8aIpzaaXYqyQgaJwp7YcFr0QddCpMYE344NwPu-bEBeZo_drz5RSPKtf0-ykjw";

class ListenerWeb extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			open: false,
			position: 'right',
			noOverlay: false,
			buttonMjs:Languaje("ButtonRegistrate"),
			MsjBienvenida:Languaje("MsjBienvenida"),
			ListenerData:cookie.load('ListenerData'),
			Namelistener:"",
			Phonenumber:"",
			WebAvalaible:true,
			NotificationListener:[],
			modal:false,
			index:0,
			Longitud:"",
			Latitud:"",
			UserData:{},
			User:{},
			genre:"Female",
			addNew:false,
			usersListener:[],
			textSearch:"",
			DD:"DD",
			MM:"MM",
			YYYY:"YYYY",
			shareButton:[],
			getShareButton:[],
			userSelected:{},
		};
		document.body.style.backgroundImage = 'url('+FondoApp+')';
		console.log(FondoApp)
		document.body.style.backgroundColor ="rgba(41, 121, 175, 0.28)";
		if(this.state.ListenerData){
			
			this.setState({...this.state,...this.state.ListenerData, DD:"11", MM:"11", YYYY:"1999", Namelistener:"default", Phonenumber:"444444444444"})
			this.state.Namelistener = this.state.ListenerData.Namelistener
			this.state.DD = "11"
			this.state.MM = "11"
			this.state.YYYY = "1999"
			this.state.Phonenumber = this.state.ListenerData.Phonenumber
			Api._getNotificationListener(this.state.ListenerData.Id,(data)=>(this.setState({NotificationListener:data?data:[]})));
		}
		

		if (navigator.geolocation) {
		 	navigator.geolocation.getCurrentPosition((position)=>{
			this.setState({Latitud: String(position.coords.latitude),
				Longitud: String(position.coords.longitude) }) },
				()=>{},{maximumAge:60000, timeout: 4000});
		}

		 var userAgent = navigator.userAgent || navigator.vendor || window.opera;

			// Windows Phone must come first because its UA also contains "Android"

	
		if (/android/i.test(userAgent)) {
			this.state.devices = "android-browser"
		}else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
			this.state.devices = "iOS-browser";
			

		}else{
			this.state.devices = "browser";
		}
		

		Api._getUserForId(this.props.match.params.id, (Data)=>{
			this.setState({UserData:Data.Profile ? Data.Profile:{}, User:Data.User});
			document.title=this.state.UserData.Linktitle;
			if(Data.User.Roles_idrole===2){
				document.body.style.backgroundColor ="white";
			} else {
				document.body.style.backgroundColor ="white";
				if(!this.state.ListenerData){
					document.body.style.backgroundImage = FondoApp;
				}
			}
			if(Data.Namelanguage === "Spanish"){
				cookie.save('LenguajeAdmin', "Spanish", { path: '/' });
				this.setState({...this.state})
			} else {
				cookie.save('LenguajeAdmin', "English", { path: '/' });
				this.setState({...this.state})
			}
			document.body.style.backgroundPosition =  "center";
			document.body.style.backgroundRepeat = "no-repeat";
			document.body.style.backgroundSize = "cover";
		})



	}



	componentDidMount(){
		if(this.state.ListenerData){
			Api._getNotificationListener(this.state.ListenerData.Id ,(data)=>{
				this.setState({NotificationListener:(data?data:[])})
			})

			Api._getUserListener(this.state.ListenerData.Id ,(data)=>{
				this.setState({usersListener:data?data:[],shareButton:data?new Array(data.length):[]});
				if(data){
					let bandera=false;
					for (var i = data.length - 1; i >= 0; i--) {
						if(data[i].Id === this.props.match.params.id)
						bandera = true
					}
					this.setState({addNew:!bandera})
				
				}

			})

			
		}
	}


	

	RegisterListenerButtom = ()=>{
			
		if (this.state.Phonenumber.length <8) {
		this.setState({errPhonenumber:Languaje("ErrorPhoneNumber")});
		
		 	return;
		}
		if (this.state.Namelistener === "") {
			this.setState({errName:Languaje("ErrName")});
			
		 	return;
		}
		if (this.state.DD === "DD" || this.state.MM === "MM" || this.state.YYYY === "YYYY") {
			this.setState({errDate:Languaje("ErrDate")});
			
		 	return;
		}

		if (!this.state.checkbox) {
			this.setState({errPhonenumber:Languaje("ErrrCheckBox")});
			
		 	return;
		}
		this.writeUserData();
		
	}
		
	

	writeUserData( user) {
		if(!this.state.addNew){
			this.setState({sendingData:true})
			Api._RegisterListener({Namelistener:this.state.Namelistener,Os:this.state.devices, Phonenumber: this.state.Phonenumber.slice(0, 3) + " " + this.state.Phonenumber.slice(3) , Agreeterms:1, Latitud:this.state.Latitud, Longitud:this.state.Longitud,Genre:this.state.genre, Age:this.state.DD+"/"+this.state.MM+"/"+this.state.YYYY},
				this.props.match.params.id,this.props.match.params.idlistener, (data)=>{
				this.setState({sendingData:false})
				document.body.style.backgroundImage = "";
				document.body.style.backgroundColor ="white";
				Api._getUserListener(data.Id ,(data)=>{

					this.setState({usersListener:data?data:[]});

				})
				
				cookie.save('ListenerData', data, { path: '/' });
				this.setState({ListenerData:data, ShowError:true})
			});
		}else{
			this.setState({sendingData:true})
			Api._addListenerUser(this.props.match.params.id, this.state.ListenerData.Id, (data)=>{
				this.setState({addNew:false, sendingData:false})
				document.body.style.backgroundImage = "";
				document.body.style.backgroundColor ="white";
				Api._getUserListener(data.Id ,(data)=>{

					this.setState({usersListener:data?data:[]});

				})
			})
		}

	}


	

	
	
	toggle(index) {
		var a = document.createElement("a");
		a.target = "_blank";
		a.href = "https://notificatorapp.com/#/notification/" +this.state.NotificationListener[index].Notifications.Srcimage;
		a.click();
		this.setState({
			modal: !this.state.modal,
			index:index
		});
	}

	_onNotification(user){
		this.setState({openNotificationsUser:true,notificationsUser:this.state.NotificationListener.filter((data)=>(data.Notifications.Users_iduser===user.Id)), userSelected:user})

	}

/*
<Switch
																				checked={this.state.genre!=="Female"}
																				onChange={()=>{this.state.genre=this.state.genre==="Female"?"Male":"Female"}}
																				onColor="#2693e6"
																				onHandleColor="#2693e6"
																				handleDiameter={30}
																				uncheckedIcon={false}
																				checkedIcon={false}
																				boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
																				activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
																				height={20}
																				width={48}
																				className="react-switch"
																				id="material-switch"
																			/>
*/

	render() {
		return (
			<div>
				{
			 		(!this.state.ListenerData || this.state.addNew )
					?(
						<div>
							<div className="animated fadeIn">
								<Row className="justify-content-center text-center">
									{
										this.state.User.Roles_idrole!==2
										?<Col xs="12">
											<img src= {this.state.UserData.Srcicon ? "https://drive.google.com/uc?export=view&id="+ this.state.UserData.Srcicon : LogoPlop} style={{}} className="imageReceptor"/>
										</Col>
										:null
									}

									<Card className="cardFormReceptor">
										<CardBlock className="card-body">
											<Row className="justify-content-center text-center noOpacity">
												{
													this.state.User.Roles_idrole!==2
													?<Col xs="12" className="titleReceptor">
														{ this.state.UserData.Nameprofile ?this.state.UserData.Nameprofile.toUpperCase(): null}
													</Col>
													:<Col xs="12">
														<Row style={{marginBottom:"7%"}}>
															<Col xs="3">
																<img src= {this.state.UserData.Srcicon ? "https://drive.google.com/uc?export=view&id="+ this.state.UserData.Srcicon : LogoPlop} style={{height:50, width:50}} className="imageReceptor"/>
															</Col>
															<Col xs="9" style={{marginTop:"6%",textAlign:"left"}} className="titleReceptor">
																{ this.state.UserData.Nameprofile ?this.state.UserData.Nameprofile.toUpperCase(): null}
															</Col>
														</Row>
													</Col>
												}

												{
													!this.state.addNew
													?<Col xs="12">
														<FormGroup>
															<Row style={{marginBottom:'8%'}}>
																
																<Col xs="4">
																</Col>
																<Col xs="4">

																	<Label className="switch switch-sm switch-text switch-info float-right mb-0">
														                <Input  type="checkbox" className="switch-input" onChange={()=>{ this.setState({genre:this.state.genre==="Female"?"Male":"Female"})}}/>
														                <span style={{fontSize:12 ,padding: 5, color:this.state.genre==="Female"?"white":"#2979AF"}} className="switch-label" data-on={Languaje("SexoFemenino")} data-off={Languaje("SexoMasculino")}>{this.state.genre==="Female" ? Languaje("SexoFemenino") : Languaje("SexoMasculino")}</span>
														                <span className="switch-handle"></span>
														            </Label>		

																</Col>
																<Col xs="4">
																</Col>

																	
															</Row>
															<Row style={{marginLeft:"0.2%"}}>
																 <div className="subTitleReceptor">{Languaje("CreateFechaNacimiento")}</div>
															</Row>
															<Row style={{marginBottom:'8%'}}>
																<Col xs="4">
																	 <Input type="select" className="imputReceptor" id="Name" name="name" placeholder={"DD"} onChange={(event)=>this.setState({DD:event.target.value})}>
																			<option value="DD">{"DD"}</option>
																			<option value="1">{String(1)}</option>
																			<option value="2">{String(2)}</option>
																			<option value="3">{String(3)}</option>
																			<option value="4">{String(4)}</option>
																			<option value="5">{String(5)}</option>
																			<option value="6">{String(6)}</option>
																			<option value="7">{String(7)}</option>
																			<option value="8">{String(8)}</option>
																			<option value="9">{String(9)}</option>
																			<option value="10">{String(10)}</option>
																			<option value="11">{String(11)}</option>
																			<option value="12">{String(12)}</option>
																			<option value="13">{String(13)}</option>
																			<option value="14">{String(14)}</option>
																			<option value="15">{String(15)}</option>
																			<option value="16">{String(16)}</option>
																			<option value="17">{String(17)}</option>
																			<option value="18">{String(18)}</option>
																			<option value="19">{String(19)}</option>
																			<option value="20">{String(20)}</option>
																			<option value="21">{String(21)}</option>
																			<option value="22">{String(22)}</option>
																			<option value="23">{String(23)}</option>
																			<option value="24">{String(24)}</option>
																			<option value="25">{String(25)}</option>
																			<option value="26">{String(26)}</option>
																			<option value="27">{String(27)}</option>
																			<option value="28">{String(28)}</option>
																			{this.state.MM !== "2" ? <option value="29">{String(29)}</option>:null}
																			{this.state.MM !== "2" ? <option value="30">{String(30)}</option>:null}
																			{this.state.MM !== "9" && this.state.MM !== "4" && this.state.MM !== "6" && this.state.MM !== "11" && this.state.MM !== "2"?<option value="31">{String(31)}</option>:null}
																	</Input>
																</Col>
																<Col xs="4">

																	<Input type="select" className="imputReceptor" id="Name" name="name" placeholder={"MM"} onChange={(event)=>this.setState({MM:event.target.value})}>
																			<option value="MM">{"MM"}</option>
																			<option value="1">{Languaje("Enero")}</option>
																			<option value="2">{Languaje("Febrero")}</option>
																			<option value="3">{Languaje("Marzo")}</option>
																			<option value="4">{Languaje("Abril")}</option>
																			<option value="5">{Languaje("Mayo")}</option>
																			<option value="6">{Languaje("Junio")}</option>
																			<option value="7">{Languaje("Julio")}</option>
																			<option value="8">{Languaje("Agosto")}</option>
																			<option value="9">{Languaje("Septiembre")}</option>
																			<option value="10">{Languaje("Octubre")}</option>
																			<option value="11">{Languaje("Noviembre")}</option>
																			<option value="12">{Languaje("Diciembre")}</option>
																	</Input>
																</Col>
																<Col xs="4">
																	 <Input type="select" className="imputReceptor" id="Name" name="name" placeholder={"YYYY"} onChange={(event)=>this.setState({YYYY:event.target.value})}>
																			<option value="YYYY">{"YYYY"}</option>
																			<option value="2018">{String(2018)}</option>
																			<option value="2017">{String(2017)}</option>
																			<option value="2016">{String(2016)}</option>
																			<option value="2015">{String(2015)}</option>
																			<option value="2014">{String(2014)}</option>
																			<option value="2013">{String(2013)}</option>
																			<option value="2012">{String(2012)}</option>
																			<option value="2011">{String(2011)}</option>
																			<option value="2010">{String(2010)}</option>
																			<option value="2009">{String(2009)}</option>
																			<option value="2008">{String(2008)}</option>
																			<option value="2007">{String(2007)}</option>
																			<option value="2006">{String(2006)}</option>
																			<option value="2005">{String(2005)}</option>
																			<option value="2004">{String(2004)}</option>
																			<option value="2003">{String(2003)}</option>
																			<option value="2002">{String(2002)}</option>
																			<option value="2001">{String(2001)}</option>
																			<option value="2000">{String(2000)}</option>
																			<option value="1999">{String(1999)}</option>
																			<option value="1998">{String(1998)}</option>
																			<option value="1997">{String(1997)}</option>
																			<option value="1996">{String(1996)}</option>
																			<option value="1995">{String(1995)}</option>
																			<option value="1994">{String(1994)}</option>
																			<option value="1993">{String(1993)}</option>
																			<option value="1992">{String(1992)}</option>
																			<option value="1991">{String(1991)}</option>
																			<option value="1990">{String(1990)}</option>
																			<option value="1989">{String(1989)}</option>
																			<option value="1988">{String(1988)}</option>
																			<option value="1987">{String(1987)}</option>
																			<option value="1986">{String(1986)}</option>
																			<option value="1985">{String(1985)}</option>
																			<option value="1984">{String(1984)}</option>
																			<option value="1983">{String(1983)}</option>
																			<option value="1982">{String(1982)}</option>
																			<option value="1981">{String(1981)}</option>
																			<option value="1980">{String(1980)}</option>
																			<option value="1979">{String(1979)}</option>
																			<option value="1978">{String(1978)}</option>
																			<option value="1977">{String(1977)}</option>
																			<option value="1976">{String(1976)}</option>
																			<option value="1975">{String(1975)}</option>
																			<option value="1974">{String(1974)}</option>
																			<option value="1973">{String(1973)}</option>
																			<option value="1972">{String(1972)}</option>
																			<option value="1971">{String(1971)}</option>
																			<option value="1970">{String(1970)}</option>
																			<option value="1969">{String(1969)}</option>
																			<option value="1968">{String(1968)}</option>
																			<option value="1967">{String(1967)}</option>
																			<option value="1966">{String(1966)}</option>
																			<option value="1965">{String(1965)}</option>
																			<option value="1964">{String(1964)}</option>
																			<option value="1963">{String(1963)}</option>
																			<option value="1962">{String(1962)}</option>
																			<option value="1961">{String(1961)}</option>
																			<option value="1960">{String(1960)}</option>
																			<option value="1959">{String(1959)}</option>
																			<option value="1958">{String(1958)}</option>
																			<option value="1957">{String(1957)}</option>
																			<option value="1956">{String(1956)}</option>
																			<option value="1955">{String(1955)}</option>
																			<option value="1954">{String(1954)}</option>
																			<option value="1953">{String(1953)}</option>
																			<option value="1952">{String(1952)}</option>
																			<option value="1951">{String(1951)}</option>
																			<option value="1950">{String(1950)}</option>
																			<option value="1949">{String(1949)}</option>
																			<option value="1948">{String(1948)}</option>
																			<option value="1947">{String(1947)}</option>
																			<option value="1946">{String(1946)}</option>
																			<option value="1945">{String(1945)}</option>
																			<option value="1944">{String(1944)}</option>
																			<option value="1943">{String(1943)}</option>
																			<option value="1942">{String(1942)}</option>
																			<option value="1941">{String(1941)}</option>
																			<option value="1940">{String(1940)}</option>
																			<option value="1939">{String(1939)}</option>
																			<option value="1938">{String(1938)}</option>
																			<option value="1937">{String(1937)}</option>
																			<option value="1936">{String(1936)}</option>
																			<option value="1935">{String(1935)}</option>
																			<option value="1934">{String(1934)}</option>
																			<option value="1933">{String(1933)}</option>
																			<option value="1932">{String(1932)}</option>
																			<option value="1931">{String(1931)}</option>
																			<option value="1930">{String(1930)}</option>
																	</Input>
																</Col>
															</Row>
																<div className="errores">{this.state.errDate}</div>
														</FormGroup>
														 <FormGroup style={{marginBottom:'8%'}}>
																 <div className="subTitleReceptor">{Languaje("CreateName")}</div>
																 <Input className="imputReceptor" type="text" id="Name" name="name" placeholder={Languaje("TuNombre")} onChange={(event)=>this.setState({Namelistener:event.target.value})}/>
																 	<div className="errores">{this.state.errName}</div>
														 </FormGroup>
														 <FormGroup style={{marginBottom:'8%'}}>
																<div className="subTitleReceptor" >{Languaje("Telefono")}</div>
																<ReactPhoneInput  className="imputReceptor input-group-addon" placeholder={"1235443258"} defaultCountry={'co'} onChange={(text)=>this.setState({Phonenumber:text})}/>
																<div className="errores">{this.state.errPhonenumber}</div>

														 </FormGroup>
													</Col>
													:null
												}
												<Col xs="12" className="text-center">
													<input onChange={(data)=>{this.setState({checkbox:!this.state.checkbox})}}  className="form-check-input" type="checkbox" id="defaultCheck1"/>
													<Label onClick={()=>window.location="https://notificatorapp.com/terms"} className="css-label"> {Languaje("AceptaTerminos")}</Label>
												</Col>
												<Col xs="12" className="text-center">
													<FormGroup className="form-actions">
															{
																this.state.sendingData
																	?
																	 <Loader
																         type="Oval"
																         color="#3498DB"
																         height="50"
																         width="50"
																      />
																    :
																    <Button
																    	onClick={this.RegisterListenerButtom.bind(this)}
																		style={{borderWidth:1,borderStyle:"solid",borderColor:(this.state.Phonenumber.length<8 || this.state.DD === "DD" || this.state.MM === "MM" || this.state.YYYY === "YYYY" || this.state.Namelistener === "" || !this.state.checkbox) ? "grey" :"green",
																			color:(this.state.Phonenumber.length<8 || this.state.DD === "DD" || this.state.MM === "MM" || this.state.YYYY === "YYYY" || this.state.Namelistener === "" || !this.state.checkbox) ? "grey" :"green",}}
																		type="submit" size="md" color="primary" className=" buttonReceptor js-push-btn mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
																			{this.state.buttonMjs}
																	</Button>

															}
															</FormGroup>
												</Col>
											</Row>
										</CardBlock>
									</Card>
								</Row>
								{
									this.state.User.Roles_idrole===2
									?<Row className="justify-content-center text-center">
										<Col xs="12">
											<div style={{fontSize:15, color:"#2979AF", fontWeight:"bold"}} >{Languaje("EnviaNotificaciones")}</div>

											
										</Col>

									</Row>
									:null
								}
							</div>
						</div>
						
					)

					:<div>
						<div>
							<div>{this.state.ErrorAvailable}</div>
							<div><a href='/notificator/app-debug.apk' download='Notificator'>{Languaje("MsjAqui")}.</a></div>
						</div>
					</div>
				}
			</div>
		);
	}

}

export default ListenerWeb;

//codigo viejo de notificaciones
/*
<Row style={{margin:0}}>
								{this.state.usersListener.filter(createFilter(this.state.textSearch, ["Updated_at"])).map((user,i) => {
									return (
										<Col
											style={{
													minHeight:200,
													maxHeight:200,
													paddingright:11,
													paddingLeft:11
											}}
											xs="6"
										>
									 		<div
									 			style={{
													boxShadow:"0 4px 8px 0 rgba(0,0,0,0.2)",
													borderRadius:38,
													background:" linear-gradient(white, rgb(184, 181, 181))",
													height: 181
									 			}}
									 		>
									 			<div
									 				style={{width:113, height:113, marginLeft:24, marginTop:"24",paddingTop:14}}
									 			>
									 				<table style= {{height:"100%"}}>
									 				<tr  >
									 				<td style= {{verticalAlign: "middle"}}>
										 			<img
														onClick={()=>this._onNotification(user)}
														style={{width:113,verticalAlign: "middle"}}
														src={"https://drive.google.com/uc?export=view&id="+user.Created_at}
													/>

													<FacebookShareButton children={<FacebookIcon size={32} round={true} />} quote={this.state.UserData.linktext} url={"https://notificatorapp.com/#/"+this.state.UserData.Id+"/Listener"}


													/>



													</td>

													</tr>
													</table>
													<div>
													{!this.state.shareButton[i]
																	?
																	<div>

																		<img
																			onClick={()=>{this.state.shareButton[i]=true;this.setState({shareButton:this.state.shareButton}) }}
																			src= {require("../../../Assets/Images/share_grey.png")} style={{height:60, marginTop:0}} style={{width:32}}

																		/>
																		<div style={{ display: "inline",paddingLeft: 12}} >{this.state.getShareButton[i].Numberofshare.toString()+" veces"}</div>


																	</div>

																	: <table onClick={()=>{this.state.shareButton[i]=false;this.setState({shareButton:this.state.shareButton})}} >
																	<tr>

																		<td onClick={()=>{Api._shareListener(this.state.ListenerData.Id,user.Id, ()=>{});this.state.getShareButton[i].Numberofshare+=1; this.setState({getShareButton: (this.state.getShareButton)})} }>
																			<FacebookShareButton children={<FacebookIcon size={32} round={true} />} quote={this.state.UserData.Linktext} url={"https://notificatorapp.com/Admin/#/"+this.state.getShareButton[i].Users_iduser+"/Listener"}
																			/>
																		</td>
																		<td onClick={()=>{Api._shareListener(this.state.ListenerData.Id,user.Id, ()=>{}) ;this.state.getShareButton[i].Numberofshare+=1; this.setState({getShareButton: (this.state.getShareButton)})} }>
																			<WhatsappShareButton children={<WhatsappIcon size={32} round={true} />} title={this.state.UserData.Linktext} url={"https://notificatorapp.com/Admin/#/"+this.state.getShareButton[i].Users_iduser+"/Listener"}
																			/>
																		</td>
																		<td onClick={()=>{Api._shareListener(this.state.ListenerData.Id,user.Id, ()=>{}) ;this.state.getShareButton[i].Numberofshare+=1; this.setState({getShareButton: (this.state.getShareButton)})} }>
																			<TwitterShareButton children={<TwitterIcon size={32} round={true} />} title={this.state.UserData.Linktext} url={"https://notificatorapp.com/Admin/#/"+this.state.getShareButton[i].Users_iduser+"/Listener"}
																			/>
																		</td>

																		<td onClick={()=>{Api._shareListener(this.state.ListenerData.Id,user.Id, ()=>{}) ;this.state.getShareButton[i].Numberofshare+=1; this.setState({getShareButton: (this.state.getShareButton)})} }>
																			<EmailShareButton children={<EmailIcon size={32} round={true} />} subject={this.state.UserData.Linktext} body={"https://notificatorapp.com/Admin/#/"+this.state.getShareButton[i].Users_iduser+"/Listener"}
																			/>
																		</td>
																	</tr>

																	</table>

																	 }





													</div>
												</div>

									 		</div>
										</Col>
									)
								})}
							</Row>

 */

//codigo de notificaciones
/*
<Row style={{margin:0}}>
								{this.state.notificationsUser.filter(createFilter(this.state.textSearch, ["Notifications.Title", "Notifications.Body"])).map((data,i) => {
									return (
										<div key={i} onClick={()=>{
											let url = (data.Notifications.Type === 2 || data.Notifications.Type === 3 || data.Notifications.Type === 6) ? data.Notifications.Action : "https://notificatorapp.com/Admin/#/notification/"+ data.Notifications.Srcimage;
										    if (data.Notifications.Type === 7)
										      url = "https://docs.google.com/document/d/"+data.Notifications.Srcimageexpandible+"/edit"
										    if (data.Notifications.Type === 8)
										      url = "https://notificatorapp.com/Admin/#/information/"+ data.Notifications.Id
											if(!url.includes("https://") && !url.includes("http://")){
												url= "http://" + url;
											}
											 window.location = url;
										}}>
				                          <hr className="mx-3 my-0"/>
				                          <div className="callout callout-success m-0 py-3">
				                            <div><strong>{data.Notifications.Title}</strong></div>
				                            <small className="text-muted"><i className="icon-location-pin"></i>&nbsp;{data.Notifications.Body}</small>
				                          </div>
				                       </div>
									)
								})}
							</Row>
 */
