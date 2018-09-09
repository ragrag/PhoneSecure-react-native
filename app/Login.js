import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { Button, Card, CardItem, Input, Spinner } from './common';
import Toast from 'react-native-simple-toast';
const strings = require('./config/strings');

const instance = axios.create();
instance.defaults.timeout = 2500;
class LoginForm extends Component {

  constructor() {
    super(); 
    this.state = {
      username: '',
      password: '',
      loading:false
    };
  }

  componentWillMount(){

    AsyncStorage.getItem('login_token').then( (token)=>{

console.log(token);
    });
  }


  _onLoginPressed() {
       this.setState({loading:true});
    //ToastAndroid.show('A pikachu appeared nearby !', ToastAndroid.SHORT);

    instance.post(strings.url+'/api/login',{
        username:this.state.username,
        password:this.state.password
    }).then( (res)=>{
           this.setState({loading:false});

        console.log(res.data);
        if(res.data.success)
        {
            AsyncStorage.setItem('login_token',res.data.token).then(()=>{
                Toast.show('Logged in');
                this.props.navigation.navigate('Home');
                
            }).catch((err)=>{
               
                Toast.show("Error logging in");

            });
        
            
        }
        else 
            Toast.show(res.data.message);

    }).catch( (err)=>{
        this.setState({loading:false});
        
        console.log(err);
    });
    

    //this.setState({loading:true});

    //const { username, password } = this.state;
    //this.props.loginUser({ username, password });
    
  }

  _renderButton() {
    if (this.state.loading) {
      return <Spinner/>;
    }
    return (
      <Button onPress={this._onLoginPressed.bind(this)}>Login</Button>
    );
  }

  render(){
    return (
      <Card>

        <CardItem>
          <Input
            label='Email'
            placeholder='Enter your email'
            secureTextEntry={false}
            onChangeText={(username) => this.setState({ username  }) }
          />
        </CardItem>

        <CardItem>
          <Input
            label='Password'
            placeholder='Enter your Password'
            secureTextEntry
            onChangeText={(password) => this.setState({ password }) }
          />
        </CardItem>

        <CardItem>
            { this._renderButton() }
        </CardItem>

      </Card>
    );
  }

}




export default LoginForm;