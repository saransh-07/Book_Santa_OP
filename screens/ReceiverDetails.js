import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Card, Header, Icon} from 'react-native-elements';
import firebase from 'firebase'
import db from '../config'
export default class ReceiverDetails extends React.Component
{
  constructor(props){
    super(props);
    this.state={
      username:'',
userid:firebase.auth().currentUser.email,
receiverId:this.props.navigation.getParam("details")["userId"],
requestId:this.props.navigation.getParam("details")["requestId"],
bookName:this.props.navigation.getParam("details")["bookName"],
reason:this.props.navigation.getParam("details")["reason"],
receiverName:'',
recieverContact:'', 
recieverAddress:'',
receiverDocumentId:'',
receiverRequestDocumentID:''
    }
  }
  addNotifications=()=>{
    var msg = this.state.username+": has shown interest in donating the book.";
    db
    .collection('all_notifications')
    .add({
      targetedUserID:this.state.receiverId,
      donorId:this.state.userid,
      requestId:this.state.requestId,
      bookName:this.state.bookName,
      date:firebase.firestore.FieldValue.serverTimestamp(),
      notificationStatus:'Unread',
      message:msg,
      doc_id:''
    
    })
  }

 componentDidMount(){
    this.getRecieverDetails()

  }
  getRecieverDetails=()=>{
db
.collection('Users')
.where('email','==',this.state.userid)
.onSnapshot(snapshot=>{
  snapshot.forEach(doc=>{
    this.setState({
      username:doc.data().username
    })
  })
})

    db.collection('Users')
    .where('email','==',this.state.receiverId)
    .onSnapshot(snapshot=>{
      snapshot.forEach(doc=>{
        this.setState({
        recieverName:doc.data().username,
        recieverContact:doc.data().phone,
        recieverAddress:doc.data().address,
        receiverDocumentId:doc.id
        })
      })
    })
    db.collection('requested_books')
    .where('requestId','==',this.state.requestId)
    .onSnapshot(snapshot=>{
      snapshot.forEach(doc=>{
this.setState({receiverRequestDocumentID:doc.id})
      })
    })
  }
  updateBookStatus=()=>{ 
    db.collection('all_donations').add(
      { 
        book_name : this.state.bookName,
      request_id : this.state.requestId, 
      requested_by : this.state.receiverName, 
      donor_id : this.state.userid, 
      request_status : "Donor Interested" ,
      doc_id:''
      })
       }
  render(){
   return(
        <View style={styles.container}>
          <View style={{flex:0.1}}>
            <Header
              leftComponent ={<Icon name='arrow-left' type='feather' color='#696969'  onPress={() => this.props.navigation.goBack()}/>}
              centerComponent={{ text:"Donate Books", style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
              backgroundColor = "#eaf8fe"
            />
          </View>
          <View style={{flex:0.3}}>
            <Card
                title={"Book Information"}
                titleStyle= {{fontSize : 20}}
              >
              <Card >
                <Text style={{fontWeight:'bold'}}>Name : {this.state.bookName}</Text>
              </Card>
              <Card>
                <Text style={{fontWeight:'bold'}}>Reason : {this.state.reason_for_requesting}</Text>
              </Card>
            </Card>
          </View>
          <View style={{flex:0.3}}>
            <Card
              title={"Reciever Information"}
              titleStyle= {{fontSize : 20}}
              >
              <Card>
                <Text style={{fontWeight:'bold'}}>Name: {this.state.recieverName}</Text>
              </Card>
              <Card>
                <Text style={{fontWeight:'bold'}}>Contact: {this.state.recieverContact}</Text>
              </Card>
              <Card>
                <Text style={{fontWeight:'bold'}}>Address: {this.state.recieverAddress}</Text>
              </Card>
            </Card>
          </View>
          <View style={styles.buttonContainer}>
            {
              this.state.recieverId !== this.state.userid
              ?(
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>{
                      this.updateBookStatus()
                      this.addNotification()
                      this.props.navigation.navigate('MyDonation')
                    }}>
                  <Text>I want to Donate</Text>
                </TouchableOpacity>
              )
              : null
            }
          </View>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  buttonContainer : {
    flex:0.3,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:200,
    height:50,
    justifyContent:'center',
    alignItems : 'center',
    borderRadius: 10,
    backgroundColor: 'orange',
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     },
    elevation : 16
  }
})