import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, TouchableHighlight } from 'react-native';
import firebase from '../firebase';
import { Icon } from 'react-native-elements';
import _ from 'lodash';


export default function ListReunions({navigation}){
    const [liste, setListe] = useState();
    function getReunion(){
        firebase.database().ref('/reunion').on('value', function(snapshot) {
            const listOfR = _.map(snapshot.val(), (val, key) =>{
                return {
                    ...val,
                    key:key
                }
            })
            setListe(listOfR)   
        });
    }

    function deleteReunion(key){
        firebase.database().ref(`/reunion/${key}`).remove();
    }
    return(
        <View style={styles.container}>
            <View style={styles.cardFlat}>
                <FlatList
                    data={liste}
                    keyExtractor={(item)=>item.key}
                    renderItem={({item}) =>{
                        return(
                            <View style={styles.card}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent: 'space-between'}}>
                                        <Text style={[styles.textCard, {fontSize:24, fontWeight:'bold'}]}>{item.sujet}</Text>
                                        <Text style={[styles.textCard,{fontWeight:'bold'}]}>{item.dateTime}</Text>
                                    </View>
                                    <View style={{flex:1, flexDirection:'row', justifyContent: 'space-between'}}>
                                        <View>
                                            <Text style={[styles.textCard, {fontSize:20}]}>{item.lieu}</Text>
                                            <Text style={styles.textCard}>{item.participants}</Text>
                                        </View>
                                        <View>
                                            <Icon name='close'
                                                //reverse
                                                //raised
                                                color='black'
                                                type='material'
                                                size={20}
                                                onPress={()=>{deleteReunion(item.key)}}
                                            />
                                        </View>
                                    </View>
                                
                            </View>
                        )
                    }}
                />
       
            </View>
            <TouchableOpacity onPress={getReunion} style={styles.refresh}><Text style={{color:'white'}}>Click to refresh your list</Text></TouchableOpacity>
            <Icon
                reverse
                raised
                name='add'
                type='material'
                color='#377AC8'
                //iconStyle={{width:100}}
                size={40}
                containerStyle={styles.addButton}
                onPress={()=>{navigation.navigate("Ajouter une Reunion")}}
            /> 
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'white',
      //justifyContent: 'center',
      padding:10,
    },
    card:{
        flex:1, 
        elevation:8,
        borderRadius:10,
        backgroundColor:'#377AC8',
        padding:15,
        marginBottom:20,
        width: '100%',
    },
    cardFlat:{
        flex:1,
        width:'100%'
    },
    textCard:{
        color:'white',
    },
    refresh:{
        marginTop: 20,
        backgroundColor:'#377AC8',
        width: 250,
        height: 50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 80 
    },
    addButton:{
        position: 'absolute',
        bottom:2,
        right:20,
        width:50,
        height:50,
        backgroundColor:'white',
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center'
    }

});