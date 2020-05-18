import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AddReunions from './AddReunions';
export default  Home = ({ navigation }) => {
  //const [modalVisible, setModalVisible] = useState(false);
  return (
      <View style={styles.container}>
          <Text style={styles.txt_acceuil}>Welcome to our MeetingApp !</Text>
          <LinearGradient style={styles.btn_get_started} colors={['#377AC8', '#377AC8']}>
            <TouchableOpacity 
                onPress = {()=> navigation.navigate("Liste des Reunions")}>
                    <Text style={styles.txt_get_started}>List of Meetings</Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient style={styles.btn_get_started} colors={['#377AC8', '#377AC8']}>
            <TouchableOpacity 
                onPress = {()=> navigation.navigate("Ajouter une Reunion")}>
                    <Text style={styles.txt_get_started}>Add a Meeting</Text>
            </TouchableOpacity>
          </LinearGradient>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F8FF',
    flex:1
  },
  btn_get_started:{
    marginTop: 50,
    width : 150,
    height : 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,

  },
  txt_get_started:{
    color: 'white',
    fontSize: 20,
  },
  txt_acceuil:{
    color: 'black',
    fontSize : 20,
    textAlign: 'justify',
  },

});
