import React, {Component} from 'react';
import {View, TouchableOpacity, Text, FlatList, StyleSheet} from 'react-native'
import {ListItem} from 'react-native-elements';
import db from '../config.js'
import LottieView from 'react-native-web-lottie';
import MyHeader from './MyHeader'
import {SafeAreaProvider} from 'react-native-safe-area-context';
export default class BookDonateScreen extends React.Component{
  constructor(){
    super();
    this.state = {
      requestedBooks : false,
      requestedBooksList : []
    }
    this.requestRef = null;
    
  } 
 /* sortTheArray=(array)=>{
for(var a =0;a<array.length;a++){
for(var i =0;a<array.length;i++){
if(i!=a && array[a]==array[i]){
   array.splice(i)
}
} 
return array;
} 
  }*/
  getRequestedBooksList=()=>{
 
    this.requestRef = db.collection('requested_books') 
    .onSnapshot((snapshot)=>{
   snapshot.forEach(doc=>{
        var reqLi = this.state.requestedBooksList
  this.setState({requestedBooksList:[...reqLi,doc.data()]})
  

 
   })
   })

  }
  keyExtractor = (item, index) => index.toString() 
  renderItem =({item,index})=>{
 return ( 
      <ListItem
        
        title={item.bookName}
        subtitle={item.reason}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        rightElement={
            <TouchableOpacity style={styles.button}>
              <Text style={{color:'#ffff'}}>View</Text>
            </TouchableOpacity>
          }
        bottomDivider
      />
    )
  }
  componentDidMount(){
  
    this.getRequestedBooksList();

  }
  
  componentWillUnmount(){

    this.requestRef();

        console.log("Before Unmount: "+this.state.requestedBooksList)
  }

  render(){
     

    return(<SafeAreaProvider>
    <MyHeader title = 'Donate Book' navigation = {this.props.navigation}/> 
       <View style={{flex:1}}> 
       
        <View style={{flex:1}}>
          {
        this.state.requestedBooksList.length===0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List Of All Requested Books
               </Text>
               <LottieView 
    source={require('../assets/890-loading-animation.json')}
    style={{width:'50%'}}
    autoPlay loop/>
              </View>
            )
            :( 
              <FlatList
                keyExtractor = {this.keyExtractor}
                data={this.state.requestedBooksList}
                renderItem={
                  ({item,index})=>
                  (<View style = 
                  {
                    {
                      border:'solid',
                      margin:10
                      }
                    }>
                   <Text style=
                   {
                     {
                      color: 'black', 
                      fontWeight: 'bold' 
                     }
                     }> {item.bookName}</Text> 
                   <Text> {item.reason}</Text>
           <TouchableOpacity style={styles.button}
           onPress={()=>{
             console.log('Hello')
             this.props.navigation.navigate('BookReceive',{details:item}); 

           }}>
              <Text style={{color:'#ffff'}}>View</Text>
            </TouchableOpacity>
                   </View> )
                   }
              />
            )
          }
        </View>
      </View>
      </SafeAreaProvider> )
  }
}
const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    marginBottom: 20,
    marginLeft:'60%',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})
