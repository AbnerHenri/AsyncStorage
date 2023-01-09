import React, { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, Modal } from 'react-native';



const App = () => {

  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [country, setCountry] = useState('')

  const [data, setData] = useState([])

  const [dataModal, setDataModal] = useState(false)
  const [msgModal, setMsgModal] = useState(false)

  async function SaveItems() {
    if(name != ''){
      await AsyncStorage.setItem('@name', name)
      await AsyncStorage.setItem('@age', age)
      await AsyncStorage.setItem('@country', country)

      const n = await AsyncStorage.getItem('@name')
      const a = await AsyncStorage.getItem('@age')
      const c = await AsyncStorage.getItem('@country')

      setData({
        name : n,
        age : a,
        country : c
      })

      setName('')
      setAge('')
      setCountry('')
    }
  }

  return (
    <SafeAreaView style={Styles.Page}>

      <Text style={Styles.Title}>Digite seus dados</Text>

      <TextInput 
        style={Styles.Input} 
        placeholder='Digite o seu nome'
        value={name}
        onChangeText={(e)=> setName(e)}
      />

      <TextInput
        style={Styles.Input}
        placeholder='Digite sua idade'
        value={age}
        onChangeText={(e) => setAge(e)}
      />

      <TextInput
        style={Styles.Input}
        placeholder='Digite seu pais de origem'
        value={country}
        onChangeText={(e) => setCountry(e)}
      />

      <TouchableOpacity style={Styles.Button} onPress={()=> SaveItems()}>
        <Text style={Styles.TextButton}>Alterar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=> setDataModal(true)}>
        <Text style={Styles.TextModal}>Ver dados</Text>
      </TouchableOpacity>

    <Modal 
      visible={dataModal} 
      transparent={false} 
      animationType={'slide'} 
      onRequestClose={()=> setDataModal(false)}
    >
      <View style={Styles.Box}>
          <Text>{JSON.stringify(data)}</Text>
      </View>
    </Modal>

{/*
    <Modal
      visible={msgModal}
      transparent={false}
      animationType={'fade'}
      onRequestClose={()=> setMsgModal(false)}
    >

    </Modal> */}

    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  Page : {
    flex : 1,

    flexDirection : 'column',
    alignItems : 'center'
  },

  Input : {
    width : '90%',
    padding : 15,
    marginTop : 15,

    backgroundColor: '#D3D3D3',
    borderRadius : 15
  },

  Button : {
    alignItems : 'center',
    justifyContent : 'center',
    backgroundColor: '#1E90FF',
    borderRadius : 15,

    width : '90%',
    padding : 15,
    margin : 15,
  },

  TextButton : {
    color : 'white'
  },

  NameArea : {
    width : '90%',
    margin : 35,
  },

  Title : {
    fontSize : 20,
    margin : 10,
    marginTop : 15
  },

  TextModal : {
    color: '#1E90FF',
    fontSize : 18,
    marginTop : 120
  },

  Box : {
    color : 'black'
  }
});

export default App;
