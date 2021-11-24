import * as React from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native'
import firebase from 'firebase';
import db from '../config'
import {ListItem, Icon} from 'react-native-elements';
import MyHeader from './MyHeader';
import {SafeAreaProvider} from 'react-native-safe-area-context'
export default class MyNotificationScreen extends React.Component
{
  constructor(props){
    super(props)
    this.state={
      userid : firebase.auth().currentUser.email,
      allNotifications:[],

    }
    this.notificationRef = null;
  }
  getNotifications=()=>{
    this.notificationRef = 
    db
    .collection('all_notifications')
    .where('notificationStatus','==','unread')
    .where('targetedUserId','==',this.state.userid)
    .onSnapshot(
      snapshot=>{
        var allNotifications = [];
        snapshot.docs.map(doc=>
        {
          var notification = doc.data()
          notification["doc_id"] = doc.id
          allNotifications.push(notification)
        }
        )
        this.setState({allNotifications:[...allNotifications]})
      }
    )
  }
  componentDidMount(){
    this.getNotifications()
  }
  componentWillUnmount(){
    this.notificationRef()
  }
  keyExtractor=(item,index)=>index.toString()
  renderItem=({item,index})=>(
    <ListItem
    key={item}
    leftElement={<Icon name='book' type = 'font-awesome' color = '#696969'/>}
    title={item.bookName}
    titleStyle={{
      color:'#000000',
      fontWeight:'bold'
    }}
    subtitle={item.message}
    bottomDivider
  />
  )
  render(){
    return(
      <SafeAreaProvider>
      <View style={styles.container}>
      <View style={{flex:0.1}}>
      <MyHeader title = {'Notifications'} navigation = {this.props.navigation}/>
      </View>
      <View syle={{flex:0.9}}>
  {this.state.allNotifications.length===0?(<View style = {{flex:1, justifyContent:'center', alignItems:'center'}}> <Text
  style={{
    fontSize:25
  }}
  > You Have No Notifications
  </Text>
  </View>):(<FlatList
  keyExtractor = {this.keyExtractor}
  data = {this.state.allNotifications}
  renderItem = {this.renderItem}
  />)}
      </View>
      </View>
      </SafeAreaProvider>
    )
  }
}
const styles = StyleSheet.create(
  {
  container:{
    flex:1
  }
  }
)