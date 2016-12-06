import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TextInput,
  TouchableOpacity,
  Picker
} from 'react-native';
import Realm from 'realm';
var realm;
class AddTrip extends Component {
  constructor(props) {
    super(props);
    realm = new Realm({
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
    this.state = {
      searchKey: '',
      sort: null,
      TripName: '',
      TripDate: '',
      TripTime: '',
      TripDetail:''
    }
    this.clearDB = this.clearDB.bind(this);
    this.addDB = this.addDB.bind(this);
  }

  addDB(){
    realm.write(() => {
      realm.create('Trips', {name: this.state.TripName, date: this.state.TripDate, time: this.state.TripTime, detail: this.state.TripDetail});
      this.forceUpdate();
    });
  }

  clearDB(){
    realm.write(() => {
      realm.delete(realm.objects('Trips'));
      this.forceUpdate();
    });
  }

  render() {
    let trip = realm.objects('Trips');
    return (
      <View style={styles.container}>
        <Text style={styles.Texts}>Trip Name:</Text>
      <TextInput style={styles.textInput} keyboardType = 'default'
        onChangeText={(text) => this.setState({TripName: text})}
        value={this.state.TripsName}/>
        <Text style={styles.Texts}>Trip Date:</Text>
      <TextInput style={styles.textInput} keyboardType = 'default'
          onChangeText={(text) => this.setState({TripDate: text})}
          value={this.state.TripDate}/>
          <Text style={styles.Texts}>Trip Time:</Text>
      <TextInput style={styles.textInput} keyboardType = 'default'
          onChangeText={(text) => this.setState({TripTime: text})}
          value={this.state.TripTime}/>
      <TouchableOpacity style={styles.button} onPress={this.addDB}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.clearDB}>
          <Text style={styles.buttonText}>Clear!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 75,
    padding: 10,
    backgroundColor: 'lightgray'
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5
  },
  pickerInput:{
    width:200,
    height:50,
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontSize: 20
  },
  button:{
    margin: 5,
    backgroundColor: 'purple',
    padding: 12,
    borderRadius: 6
  },
  buttonText:{
    color: 'white',
    fontSize: 20
  },
  Texts:{
    color: 'black',
    fontSize: 15,
    alignItems: 'flex-start'
  },
  detailtext:{
    height: 80,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5
  }
});
export default AddTrip;
