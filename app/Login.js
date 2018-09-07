import React, { Component } from 'react';
import { Text, StyleSheet , ToastAndroid, View} from 'react-native';
import axios from 'axios';
import { Button, Card, CardItem, Input, Spinner } from './common';
import Toast from 'react-native-simple-toast';

class LoginForm extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      loading:false
    };
  }


 

  _onLoginPressed() {

    
       this.setState({loading:true});
    //ToastAndroid.show('A pikachu appeared nearby !', ToastAndroid.SHORT);
    axios.post('http://41.232.67.202:3000/api/login',{
        username:this.state.username,
        password:this.state.password
    }).then( (res)=>{
           this.setState({loading:false});
        //console.log(res.data);
        if(res.data.success)
        Toast.show('Success.');
        else 
        Toast.show('Fail');

    }).catch( (err)=>{
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