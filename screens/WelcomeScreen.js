import * as React from 'react';
import {
  View,
  TextInput,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import LottieView from 'react-native-web-lottie';
import SantaAnimation from '../components/SantaClaus.js' 
import MyHeader from './MyHeader'
import {SafeAreaProvider} from 'react-native-safe-area-context';
import db from '../config.js';
import firebase from 'firebase'; 
var loading = null;
export default class Welcome extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      email: '',
      phone: '',
      address: '',
      displayLoading : '',
      confirmPassword: '',
      modalVisible: false,
    };
  }
   componentWillUnmount(){
    loading=null;
  }
  showLoading=()=>{
    this.setState({displayLoading:true}) 
    return(<LottieView 
    source={require('../assets/890-loading-animation.json')}
    style={{width:'50%'}}
    autoPlay loop/>);
  }
  login = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(()=>{
      alert("Successfully Login");
      this.props.navigation.navigate('Home');
    })
     .catch((error)=>{
          var errorCode  = error.code;
          var errorMsg =  error.message;
          this.setState({displayLoading:false})
          alert(errorMsg);
        })
  }
  signup = () => {
    if (this.state.password != this.state.confirmPassword) {
      return Alert.alert('Password does not match');
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          db.collection('Users').add({
            username: this.state.username,
            email: this.state.email,
            address: this.state.address,
            phone: this.state.phone,
          });
          return Alert.alert('User Added Successfully', '', [
            {
              text: 'OK',
              onPress: () => {
                this.setState({ modalVisible: false });
              },
            },
          ]);
        })
        .catch((error)=>{
          var errorCode  = error.code;
          var errorMsg =  error.message;
          return Alert.alert(errorMsg);
        })
    }
  }
  showModal = () => {
    return (
      <Modal
      style = {{backgroundColor :"pink"}}
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}>
        <ScrollView>
          <KeyboardAvoidingView style ={styles.modalInputs} behavior = "position" enabled >
            <Text style = {styles.heading}>Registration</Text>
            <TextInput
            style = {styles.input}
              placeholder="Username"
              onChangeText={(text) => {
                this.setState({ username: text });
              }}
            />
            <TextInput
             style = {styles.input}
              placeholder="Email"
              keyboardType='email-address'
              onChangeText={(text) => {
                this.setState({ email: text });
              }}
            />

            <TextInput
             style = {styles.input}
              placeholder="Address"
              onChangeText={(text) => {
                this.setState({ address: text });
              }}
            />
            <TextInput
             style = {styles.input}
              placeholder="Contact Number"
              onChangeText={(text) => {
                this.setState({ phone: text });
              }}
            /> 
            <TextInput
             style = {styles.input}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({ password: text });
              }}
            />
            <TextInput
             style = {styles.input}
              placeholder="Confirm Password"
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({ confirmPassword: text });
              }}
            />
            <TouchableOpacity 
            style = {styles.signUp}
              onPress={() => {
                this.signup();
              }}>
              <Text style ={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style = {[styles.signUp,{backgroundColor:'red'}]}
              onPress={() => {
                this.setState({ modalVisible: false });
              }}>
              <Text style ={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </Modal>
    );
  }
  render() {
    if(this.state.displayLoading==false){
      loading = null;
    }
    return (
      <SafeAreaProvider>
      
      <View style ={{backgroundColor :'#d3d3d3', marginTop : 50}}>
        <View>{this.showModal()}</View>
        <View style = {{alignItems:'center'}}>
        <SantaAnimation/></View>
        <View style  = {styles.main}>
         <TextInput
        style = {styles.input}
          placeholder="Email"
          keyboardType = 'email-address'
          onChangeText={(text) => {
            this.setState({ email: text });
          }}
        />
        <TextInput
          placeholder="Password"
          style = {styles.input}
          secureTextEntry={true}
          onChangeText={(text) => {
            this.setState({ password: text });
          }}
        />
        <TouchableOpacity
        
          onPress={() => {
         loading = this.showLoading()
            this.login(this.state.email, this.state.password);
          }}
          style={styles.logIn}>
          <Text style = {styles.buttonText}>Login</Text>
        </TouchableOpacity>
        {loading}
        <TouchableOpacity
          style={styles.signUp}
          onPress={() => {
            this.setState({ modalVisible: true });
          }}>
          <Text style  = {styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        </View>
       
      </View>
      </SafeAreaProvider>
    );
  }
}
const styles  = StyleSheet.create({
input : {
  border : 'solid',
  textAlign: 'center',
  borderColor : 'black',
  width : 200,
   height : 30,
   marginTop : 20  
   
}, 
main : {
  alignItems : 'center'
},
signUp: {
backgroundColor : 'skyblue',
border:'solid',
borderRadius: 30,
width : 150,
height : 40,
marginTop : 20,
textAlign : 'center',
justifyContent : 'center',
color : 'white'


},
buttonText : {
 color : 'white',
 fontWeight : 'bold',
 fontSize : 20
}
,
logIn : { 
backgroundColor : 'skyblue',
border:'solid',
borderRadius: 30,
width : 150,
height : 40,
marginTop : 20,
textAlign : 'center',
justifyContent : 'center',
color : 'white'
},
modalInputs : {
 alignItems : 'center'
},
heading : {
 fontSize : 40,
 color : 'magenta',
 
}
});