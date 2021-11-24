import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet
} from 'react-native';
import firebase from 'firebase';
import db from '../config.js';
import MyHeader from './MyHeader'; 
import {SafeAreaProvider} from 'react-native-safe-area-context';
export default class BookRequestScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      userID: firebase.auth().currentUser.email,
      bookName: '', 
      reasonToRequest: '', 
    }
  }
  addRequest = (book, reason) => {
    var reasonToRequest = reason;
    var userId = this.state.userID;
    var randomRequestId = Math.random().toString(36).substring(7);
    var bookName = book;
    db.collection('requested_books').add({
      bookName: bookName,
      userId: userId,
      reason: reasonToRequest,
      requestId: randomRequestId,
    });
    
  }
  render() {
    return (
      <SafeAreaProvider>
<MyHeader title ='Request Book' navigation = {this.props.navigation}/>
      <View>

        <KeyboardAvoidingView style ={styles.inputContainer}>
          <TextInput
          style={styles.input} 
            placeholder="Enter Book Name" 
            onChangeText={(text) => {
              this.setState({ bookName: text });
            }}
            value={this.state.bookName}
          />
          <TextInput
            style={[styles.input,{height:100}]}
            placeholder="Enter Reason"
            multiline={true} 
            maxLines={10}
            onChangeText={(text) => {
              this.setState({ reasonToRequest: text });
            }}
            value={this.state.reasonToRequest}
          />
          <TouchableOpacity
          style= {styles.button}
            onPress={() => {
              this.addRequest(this.state.bookName, this.state.reasonToRequest);
            }}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
      </SafeAreaProvider>
    );
  } 
}
const styles = StyleSheet.create({
heading:{
  
  fontSize: 30
} ,
headingContainer:{
  textAlign : 'center'
},
input : { 
  border : 'solid',
  textAlign: 'center',
  borderColor : 'black',
  width : 200,
   height : 30,
   marginTop : 20
  
}, 
inputContainer:{
  alignItems:'center',
  justifyContent:'center'
},
button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
      marginTop : 20,
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})
