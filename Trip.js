import React, {Component} from 'react';
import {Navigator, StatusBar, TouchableHighlight,TouchableOpacity, ListView,
   AppRegistry, StyleSheet, Image, Text, View, TextInput} from 'react-native';
import Realm from 'realm';
var rtrip;


class Trip extends Component {
  constructor(props) {
   super(props);
     rtrip = new Realm({
       schema: [
         {
           name: 'Trips',
           properties: {
             name: 'string',
             date: 'string',
             time: 'string',
             detail: 'string'
           }
         }
       ],
       schemaVersion: 5
     });
   let rtest = rtrip.objects('Trips');
   const ds = new ListView.DataSource({
     rowHasChanged: (r1, r2) => r1 !== r2},
   );
   this.state = {dataSource: ds.cloneWithRows(rtest),};
   }
  render() {
    return (

      <ListView style={styles.container}
        dataSource={this.state.dataSource}
        enableEmptySections={true}
        renderRow={(rowData) =>
        <View style={styles.row}>
         <Image
           style={{height:100, width:100}}
           source={require('./assets/logo.jpg')}
         />
          <View style={[styles.container, {padding:10}]}>
            <Text>
              {rowData.name}
            </Text>
            <Text numberOfLines={1}>
              DD/MM/YY : {rowData.date}
            </Text>
            <Text numberOfLines={1}>
              Time: {rowData.time}
            </Text>
          </View>
        </View>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop:65,
    flex: 1,
    backgroundColor: 'lightgray'
  },

  navigationBar:{
    backgroundColor: 'darkred',
    marginBottom: 5
  },
  navigationBarText:{
    color: 'white',
    padding: 20,
    fontSize: 25,
    textAlign: 'center',
  },
  titleText:{
    //fontSize: 15,
    paddingTop:5
  },
  row:{
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5
  },
  header:{
    fontSize:20,
    flexWrap: 'wrap'
  }
});

export default Trip;
