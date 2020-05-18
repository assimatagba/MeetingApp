import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, Button, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ReactChipsInput from 'react-native-chips';
import { Icon } from 'react-native-elements';
import firebase from '../firebase';

const { heigh, width } = Dimensions.get('window');


export function addReunionDb(sujet,lieu,participants,date){
    const dateTime = date.toGMTString();
    firebase.database().ref('/reunion').push({sujet,lieu,participants,dateTime});
  }

const AddReunions = ({ navigation }) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [sujet, setSujet] = useState('');
    const [lieu, setLieu] = useState('');
    const [chipsd, setChips] = useState([ ]);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        //console.log(currentDate);
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };
    return (
        <View style={styles.container}>
        <Text style={styles.appTitle}>Ajout d'une Reunion</Text>
        <View style={styles.card}>
            <TextInput 
              style={styles.input} 
              placeholder="Titre" 
              onChangeText={(text)=>{
                setSujet(text);
              }}
              value={sujet}
            />
            <TextInput 
              style={styles.input} 
              placeholder="Salle"
              onChangeText={(text)=>{
                setLieu(text);
              }}
              value={lieu}
            />
            <ReactChipsInput 
                label="Entrez les participants:" 
                onChangeChips={(chips) => {
                  setChips([...chipsd, ...chips]);
                  chips=[...chipsd];
                  console.log(chips);
                }}
                     
                //alertRequired={true} 
                chipStyle={{  
                    backgroundColor: '#00acc1', 
                }} 
                inputStyle={[styles.input,styles.chips]}


            />
            <View style={styles.dateTimeButton}>
                <Icon
                  reverse
                  raised
                  name='event'
                  type='material'
                  color='#377AC8'
                  onPress={showDatepicker} />
                  <Icon
                    reverse
                    raised
                    name='add-alarm'
                    type='material'
                    color='#377AC8'
                    onPress={showTimepicker}
                  />
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={0}
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
            
            <TouchableOpacity style = {styles.button} onPress={()=>{
                  addReunionDb(sujet,lieu,chipsd,date)
                  setDate(new Date());
                  setLieu('');
                  setSujet('');
                  setChips([]);
                  navigation.navigate("Liste des Reunions")
                }}>
                <Text style = {styles.buttonText}>Save</Text>
            </TouchableOpacity>
        </View>
        </View>
    );

}

export default AddReunions

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
    //justifyContent: 'center',
  },
  card:{
    flex: 1,
    alignItems: 'center',
  },
  appTitle: {
    color: 'black',
    fontSize: 36,
    marginTop: 60,
    marginBottom: 30,
    fontWeight: '300'
  },
  input: {
    width: width - 25,
    marginTop: 20,
    padding: 10,
    borderBottomColor: '#00acc1',
    borderWidth: 1,
    fontSize: 24,
    color: 'black',
  },
  chips:{
    height:60,
  },
  date: {
    width: width - 25,
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
  },
  about:{
    marginBottom : 20,
    height: 100,
  },
  button:{
    marginTop: 50,
    backgroundColor:'#377AC8',
    width: 100,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  piker:{
    backgroundColor:'#377AC8',
    //width: 90,
    height: 60,
    borderRadius: 90/2,
    alignItems: 'center',
    justifyContent: 'center',
    flex:1,
    margin:15,
  },
  dateTimeButton:{
    //margin: 20,
    width: width - 25,
    flexDirection: 'row',
    //justifyContent: 'center',
    //alignItems:'center',

  },
  buttonText:{
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  }
});
