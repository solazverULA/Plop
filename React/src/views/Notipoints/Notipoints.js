import React from 'react';
import {
  Row,
  Col,
  Button,
  Card,
  CardBlock,
  FormGroup,  
  Modal,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import Languaje from "../../../LanguajeApi/LanguajeApi"
import cookie from "react-cookies";
import Api from "../../../Api/Api";
import {Animated} from "react-animated-css";
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

class Notipoints extends React.Component {
	constructor(props){
		super(props);

		this.state={
			usersListener:[],
			UserData:{},
			shareButton:new Array(this.props.Notifications.length),
			showMore:4,


		}
		console.log(props)

	}

	componentDidMount(){
		/*Api._getUserListener(this.state.listenerData.Id ,(data)=>{
				this.setState({usersListener:data?data:[]});
		})
		Api._getUserForId(this.props.match.params.id, (Data)=>{
			this.setState({UserData:Data.Profile, User:Data.User});
		})*/
	}
	componentWillReceiveProps(props){
		console.log("nuevos props",props)
		this.setState({shareButton:new Array(this.props.Notifications.length)})
	}

	render() {
		

		return (
			<div style= {{background:"white",    height: '-webkit-fill-available'}} >
				<div>
					<img src= {require("../../../Assets/Images/logo.png")} style={{
						width: '18%', 
						marginTop: '1%',
						marginLeft: '4%'}} className="imageReceptor"/>
					<p className="fontRubik" >notipoints</p>
					<Button className="boton-volver" onClick={this.props.back}  >
									<i style={{ paddingRight: '12%',
						 			fontSize: '17pt',
						 			fontWeight: 'bold', 
						 			width: 16}} className="fa fa-angle-left" />
									{Languaje("Volver")}</Button>
				</div>
				<Animated animationIn="zoomInDown" animationOut="bounce" isVisible={true}>
					<div className="boton-volver" style= {{
						width:'80%', 
						position: 'relative', 
						zIndex: 2,
						marginLeft: '10%'}} >
						<img src= {"https://drive.google.com/uc?export=view&id="+ this.props.User.Created_at} style={{width: '12%', marginTop: '4%',  marginLeft: '-6%', borderRadius: 18}} className="imageReceptor"/>
						<div style= {{    display: 'inline'}} >
							<img src= {require("../../../Assets/Images/tickets.png")} style={{width: '20%', marginTop: '1%',  marginLeft: '4%'}} className="imageReceptor"/>
							<div style= {{display: 'inline', color: "#88BC4F",paddingLeft: "30%"}} >
								<p style= {{display: 'inline',fontSize: '25pt'}}>{this.props.User.Status}</p>
								<p style= {{display: 'inline'}} >pts</p>
							</div>
							<p style= {{ fontSize: '11pt', marginTop: -21, marginLeft: 41, paddingButtom: 8}} >{this.props.User.Updated_at}</p>
						</div>
					</div>
					<div className="boton-volver" style= {{width:'75%',position: 'relative', zIndex: 1,marginLeft: '12%', marginTop: '-5%'}}>
						<table>
						{
							
							this.props.Notifications.map((data, i)=>(
									i<this.state.showMore ?
									<tr>
										<td className= "td-np"><i  style={{color:"#88BC4F", fontSize:'9pt'}} className="fa fa-circle fa-lg"/></td>
										<td className= "td-np" style= {{fontWeight: 'bold'}}>{data.Notifications.Title.substr(0,15)}
											<p style= {{fontSize: '10pt', fontWeight: 'lighter', minWidth:"12.3em"}} >{data.Notifications.Body.substr(0,25) + "..."}</p></td>
										<td className= "td-np"><i onClick={()=>Api._sendNotificationListener(data.Notifications.Id, this.props.Listener.Id, ()=>{})} style={{color:"#3B75B3", paddingLeft:'9%'}} className="fa fa-eye" /></td>
										<td className= "td-np" >
												<i style={{color:"#3B75B3"}} className="fa fa-share-alt"
																						onClick={()=>{this.state.shareButton[i]=true; this.setState({shareButton:this.state.shareButton})}} 
																						
																					/> 
										</td>
											<Modal className="boton-volver" style={{width:'80%', margin: '10%', marginTop: '30%'}} isOpen={this.state.shareButton[i]} toggle={()=>{this.state.shareButton[i]=false; this.setState({shareButton:this.state.shareButton})}} >
												
												<ModalHeader  >
													<table>
														<tr>
															<td>{Languaje("Compartir")}</td>
														</tr>
													</table>
												</ModalHeader>
												<table style={{margin:'10%'}} >
													<tr>
														
														<td onClick={()=>{this.state.shareButton[i]=false; this.setState({shareButton:this.state.shareButton})} } >
															<FacebookShareButton children={<FacebookIcon size={32} round={true} />} quote={""} url={"https://notificatorapp.com/Admin/#/notification/"+data.Notifications.Id+"/listener/"+this.props.Listener.Id}  
															/>
														</td>
														<td>Facebook</td>
																															</tr>
													<tr>
														<td onClick={()=>{this.state.shareButton[i]=false; this.setState({shareButton:this.state.shareButton})}}>
															<WhatsappShareButton children={<WhatsappIcon size={32} round={true} />} title={""} url={"https://notificatorapp.com/Admin/#/notification/"+data.Notifications.Id+"/listener/"+this.props.Listener.Id}  
															/>
														</td>
														<td>Whatsapp</td>
													</tr>
													<tr>
														<td onClick={()=>{this.state.shareButton[i]=false; this.setState({shareButton:this.state.shareButton})}}>
															<TwitterShareButton children={<TwitterIcon size={32} round={true} />} title={""} url={"https://notificatorapp.com/Admin/#/notification/"+data.Notifications.Id+"/listener/"+this.props.Listener.Id}  
															/>
														</td>
														<td>Twitter</td>
													</tr>	
													<tr>
														<td onClick={()=>{this.state.shareButton[i]=false; this.setState({shareButton:this.state.shareButton})}}>
															<EmailShareButton children={<EmailIcon size={32} round={true} />} subject={""} body={"https://notificatorapp.com/Admin/#/notification/"+data.Notifications.Id+"/listener/"+this.props.Listener.Id}  
															/>
														</td>
														<td>Email</td>
													</tr>

												</table>
												<ModalFooter  >
													<Button className="boton-volver" style={{marginRight: '38%'}} onClick={()=>{this.state.shareButton[i]=false; this.setState({shareButton:this.state.shareButton})}}>{Languaje("Cerrar")}</Button>
												</ModalFooter>
											</Modal>
																		
									</tr>
								:null
									
								
							))
							
						}
						</table>	
					</div>
					
					{	this.state.showMore == 4 ?
						<Button className="boton-volver" onClick={()=>this.setState({showMore:this.state.showMore+4})} style= {{
										width:'68%',
										position: 'relative',
										zIndex: 0,
										marginLeft: '15%',
										marginTop: '-2%', 
										fontSize:'11pt'}}>
									{Languaje("VerMas")}</Button>
						:
						(
							this.state.showMore < this.props.Notifications.length ?
							<div>
								<Button className="boton-volver" onClick={()=>this.setState({showMore:this.state.showMore-4})} style= {{
										width:'68%',
										position: 'relative',
										zIndex: 0,
										marginLeft: '15%',
										marginTop: '-2%', 
										fontSize:'11pt'}}>
									{Languaje("verMenos")}</Button>
								<Button className="boton-volver" onClick={()=>this.setState({showMore:this.state.showMore+4})} style= {{
										width:'68%',
										position: 'relative',
										zIndex: 0,
										marginLeft: '15%',
										marginTop: '-2%', 
										fontSize:'11pt'}}>
									{Languaje("VerMas")}</Button>
								
							</div>
							:
							<Button className="boton-volver" onClick={()=>this.setState({showMore:this.state.showMore-4})} style= {{
										width:'68%',
										position: 'relative',
										zIndex: 0,
										marginLeft: '15%',
										marginTop: '-2%', 
										fontSize:'11pt'}}>
									{Languaje("verMenos")}</Button>
						)
						
					}
					

				</Animated>
			</div>


		)
	}



	}

		export default Notipoints;