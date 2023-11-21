import { Component } from "react";

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null; //both set to null so the subclasses can override them later on
    this.bgColor = null;
  }

  getStyle = () => {
    return {
      color: this.color,
      backgroundColor: this.bgColor,
      borderWidth: "2px",
      borderStyle: "solid",
      fontWeight: "bolder",
      borderRadius: "7px",
      borderColor: this.color,
      textAlign: "center",
      fontSize: "12px",
      margin: "10px 0",
      padding: "10px"
    };
  }

  render() {
    return (
      <div className="Alert">
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

class InfoAlert extends Alert { //class of InfoAlert, a subclass of Alert, which is a subclass of the React Component
  constructor(props) {
    super(props);
    this.color = 'rgb(0,0,255)';
    this.bgColor = 'rgb(220,220,255)';
  }
}

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'rgb(255, 0, 0)';
    this.bgColor = 'rgb(255, 102, 102)'
  }
}

class WarningAlert extends Alert {
    constructor(props) {
      super(props);
      this.color = 'rgb(139, 128, 0)';
      this.bgColor = 'rgb(255, 255, 204)'
    }
}

export { InfoAlert, ErrorAlert, WarningAlert };