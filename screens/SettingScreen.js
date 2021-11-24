import * as React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context'
import MyHeader from './MyHeader';
import {PencilIcon} from '@primer/octicons-react';
import firebase from 'firebase'
import db from '../config'

export default class Settings extends React.Component{
  constructor(){
    super();
    this.state = {
      username : '',
      address : '',
      contact : '',
      doc_id : ''
    }
  }
  componentDidMount(){
    this.getUserDetails()
  }
 
  updateDetails=()=>{
  db.collection('Users').doc(this.state.doc_id).update({
   
    phone : this.state.contact,
    address : this.state.address,
    username : this.state.username
  })
  alert("Profile Updated Successfully")
}
  getUserDetails=()=>{
  var email = firebase.auth().currentUser.email;
  db.collection('Users').where('email','==',email).onSnapshot(snapshot=>{
    snapshot.forEach(doc=>{
      var data = doc.data()
      this.setState({
       
        username : data.username,
        address : data.address,
        contact : data.phone,
        doc_id : doc.id

      })
    })
  })
}
  render(){
    return( <SafeAreaProvider style = {{flex:1}}> 
    <MyHeader title = "Settings" navigation ={this.props.navigation}/>
      <View style = {styles.container}>
      <TextInput 
     style = {styles.input}
     placeholder = 'Username'
     onChangeText ={text=>{this.setState({username:text})}} 
     value = {this.state.username}/>

     <TextInput 
     style = {styles.input}
     placeholder = 'Contact' 
     onChangeText ={text=>{this.setState({contact:text})}} 
     value = {this.state.contact}/>
     
     <TextInput 
     style = {styles.input}
     placeholder = 'Address' 
     onChangeText ={text=>{this.setState({address:text})}} 
     value = {this.state.address}/>
     <TouchableOpacity
     style = {styles.button}
     onPress = {
       ()=>{
         this.updateDetails()
       }
     }>
     <PencilIcon  size ="medium"color="#ffffff"/>
     </TouchableOpacity>

    </View></SafeAreaProvider>)
  }
}
const styles = StyleSheet.create({
  input : {
  border : 'solid',
  textAlign: 'center',
  borderColor : 'black',
  width : 200,
   height : 30,
   marginTop : 20  
   
}, 
container :{
  alignItems:'center'
},
buttonText : {
 color : 'white',
 fontWeight : 'bold',
 fontSize : 20
},
button : {
backgroundColor : 'skyblue',
border:'solid',
borderColor:'black',
borderRadius: 30,
width : 60,
height : 60,
marginTop : 20,
textAlign : 'center', 
alignItems:'center',
justifyContent:'center',

color : 'white'
},
})