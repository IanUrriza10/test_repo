
import {Component} from 'react'
import jwt_decode from 'jwt-decode'
class GoogleAuth extends Component{
    constructor(props){
        super(props)
        this.state = {"user":null}
        this.handleCallbackResponse = this.handleCallbackResponse.bind(this)
    }
    handleCallbackResponse(response) {
        console.log(`Encoded JWT ID token: ${response.credential}`)
        var userObject = jwt_decode(response.credential)
        this.setState({"user":userObject})
    }
    handleSignOut(e){
        this.setState({user:null,signedIn:false})        
    }

    componentDidMount(){
        console.log(process.env.REACT_APP_CLIENT_ID)
        window.google.accounts.id.initialize({
            client_id: process.env.REACT_APP_CLIENT_ID,
            scope:"https://www.googleapis.com/auth/userinfo.email",
            state_cookie_domain: "localhost:3000/",
            callback: this.handleCallbackResponse
        })        
        window.google.accounts.oauth2.initTokenClient(
            {}
        )
        // window.google.accounts.id.prompt()
        window.google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {theme: "filled_blue", size:"large", type: "icon"}
        )
    }
    componentDidUpdate(){
        window.google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {theme: "filled_blue", size:"large", type: "icon"}
        )
    }
    render(){
        return(
            <div className="GoogleAuth">
                {this.state.user === null?
                    <div id="signInDiv"></div> :
                    <button className="ui red google button" onClick = { (e) =>this.handleSignOut(e)}>
                        <i className="google icon"></i>
                        SignOut
                    </button>
                }
                {/* {this.state.user &&
                    <div>
                        <img src={this.state.user.picture}></img>
                        <h3>{this.state.user.name}</h3>
                    </div>
                } */}
            </div>
        )
    }
}
export default GoogleAuth