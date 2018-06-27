import React, {Component} from "react";
class Notificator extends Component {
	constructor(props) {
	  super(props);
	}

  render() {
    return (
      <div className="app flex-row align-items-center notification-img" style={{'minHeight':'100%'}}>
				<img src= {"https://drive.google.com/uc?export=view&id="+ this.props.match.params.id} width="100%" />
      </div>
    );
  }
}

export default Notificator;
