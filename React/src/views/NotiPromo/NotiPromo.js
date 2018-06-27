import React from 'react';
import {
	Row,
	Col,
	Card,
	CardBlock,
} from "reactstrap";

import Languaje from "../../api/translator/translator"
//import cookie from "react-cookies";
import Api from "../../api/Api/Api";
import SearchInput, { createFilter } from 'react-search-input'
import {Animated} from "react-animated-css";

class NotiPromo extends React.Component {

	constructor(props) {
		super(props);

		this.state = {active: false,
									textSearch: "",
									usersNoListener:[],
									openNotificationsUser: false,
									search: false};
		 

		Api._getNoUserListener(this.props.Listener.Id, (data)=>{
			this.setState({NewUsers:data})
		})

	}
	
	handlePlaces() {
		this.setState({
			active:false
		});
	}

	handleAll() {
		this.setState({
			active:true
		});
	}

	handleSearch() {
		this.setState({
			search: !this.state.search
		});
	}

	

	render() {
		return (
			<div style={{background:"white", height: '-webkit-fill-available'}}>

				<link href="https://fonts.googleapis.com/css?family=Rubik" rel="stylesheet" />
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css" />

				{ this.state.search ?
					<Row>
							{
								this.state.search
								?
								<Col onClick={()=>this.setState({search:false})}
									style={{
											backgroundColor: '#FFF',
										    paddingTop: 4,
										    paddingLeft: 32,
										    fontSize: 27,


										}}
									xs={2}>
									<Animated animationIn="fadeInRight" animationOut="bounceOutLeft" isVisible={true}>	
									<i className="fa fa-angle-left" style = {{color:"#3498db"}}  />
									</Animated>
								</Col>
								:null

							}

						<Col   style={{backgroundColor: '#FFFFFF', paddingLeft: "6%"}}
								xs={10}>
							<Animated animationIn="fadeInRight" animationOut="bounceOutLeft" isVisible={true}>
								<SearchInput className="search-input"  style={{baclgroundColor: '#FFFFFF'}} onChange={(text)=>this.setState({textSearch:text})} />
								<div style={{'paddingBottom':'5%', 'paddingTop':'5%'}}>
									<div style={{'width':'100%', 'height':'1px', 'backgroundColor':'#D0D0D0', marginTop: '-5%', marginBottom: '-5%'}} />
								</div>
							</Animated>
						</Col>
					</Row>
					
				: 

				<div style={{'paddingTop':'3%'}}>
					<img src= {require("../../assets/img/favicon.png")} style={{
						width: '18%',
						marginTop: '1%',
						marginLeft: '4%'}}/>
					<p className="font-rubik">notipoints</p>
					<img src={'img/search.png'} style={{
						width: '7%',
						marginTop: '-5%',
						marginLeft: '25%'}} onClick={this.handleSearch.bind(this)}/>
				</div>
			}
				<Row className="flex-center" style={{'paddingTop':'6%', 'paddingBottom':'8%'}} >

					<h7 className="slide-notipromo" style={{'paddingRight':'5%'}} onClick={this.handlePlaces.bind(this)}>
						{Languaje("Lugares")}
						{ this.state.active === true ?
							<div style={{'paddingBottom':'5%', 'paddingTop':'5%'}}>
								<div style={{'width':'100%', 'height':'2px', 'backgroundColor':'#FFFFFF'}} />
							</div>
						:
							<div style={{'paddingBottom':'5%', 'paddingTop':'5%'}}>
								<div style={{'width':'100%', 'height':'2px', 'backgroundColor':'#3B75B3'}} />
							</div>
						}

					</h7>
					<h7 className="slide-notipromo" style={{'paddingLeft':'5%'}} onClick={this.handleAll.bind(this)}>
						{Languaje("Todos")}
						{ this.state.active === false ?
							<div style={{'paddingBottom':'5%', 'paddingTop':'5%'}}>
								<div style={{'width':'100%', 'height':'2px', 'backgroundColor':'#FFFFFF'}} />
							</div>
						: <div style={{'paddingBottom':'5%', 'paddingTop':'5%'}}>
								<div style={{'width':'100%', 'height':'2px', 'backgroundColor':'#3B75B3'}}/>
							</div>
						}

					</h7>
				</Row>

				{
					!this.state.active
					?
					this.props.Users.map((user)=>(

						<Row style={{'marginLeft':'15%',}} onClick={()=>{this.props.SeeNotificationUser(user.Id)}}>
							<Row style={{'paddingRight':'5%'}}>
								<Col xs="12" style={{'paddingBottom':'5%'}}>
									<Card className='notification-card' style={{margin:0,minWidth:251}}>
										<CardBlock>
											<Row>
												<Col style={{ 'marginLeft':'-16%'}}>
													<img src={"https://drive.google.com/uc?export=view&id="+user.Created_at} style={{'width':'50px', 'height':'50px',borderRadius: 25}}/>
												</Col>
												<Col style={{ 'marginTop':'-4%', 'marginLeft':'-6%'}}>
													<Row>
														<img style={{transform: `rotate(${51.6}deg)`, 'width':'40px', 'height':'40px'}} src={'img/tickets.png'} />
													</Row>
													<Row style={{'color':'#5E5E5E'}}>
														<small>{user.Updated_at}</small>
													</Row>
												</Col>
												<Col className="flex-center">
													<Row style={{'color':'#88BC4F'}}>
														<h2>{user.Status}</h2>
														<div style={{'paddingTop':'14%'}}>
															<small>pts</small>
														</div>
													</Row>
												</Col>
											</Row>
										</CardBlock>
									</Card>
								</Col>

							</Row>
						</Row>

					))
					:
					<Row>
						{this.props.Users.filter(createFilter(this.state.textSearch, ["Email"])).map((user,i) => {
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


								 			<img
												onClick={()=>this._onNotification(user)}
												style={{width:113,verticalAlign: "middle"}}
												src={"https://drive.google.com/uc?export=view&id="+user.Created_at}
											/>



							 			</div>
							 			<div style={{textAlign: "center", width: "98%", paddingTop: "20px"}} >
							 				{user.Updated_at}
							 			</div>
							 		</div>
								</Col>
							)
						})}
					</Row>
				}
			</div>
		);
	}

}

export default NotiPromo;
