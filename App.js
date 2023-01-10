import React, { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, Keyboard } from 'react-native';



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

      Keyboard.dismiss()

      setData([{
        name : n,
        age : a,
        country : c
      }])

      setName('')
      setAge('')
      setCountry('')

      setMsgModal(true)
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
        keyboardType={'numeric'}
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
      transparent={true} 
      animationType={'fade'} 
      onRequestClose={()=> setDataModal(false)}
    >
      <View style={Styles.Modal}>
          {data.map((e)=> 
            <View style={Styles.Box}>

              <Text style={Styles.Title}>Dados Salvos</Text>

              <Text>
                <Text style={Styles.Key}>Nome : </Text> 
                {e.name}
              </Text>

              <Text>
                <Text style={Styles.Key}>Idade : </Text>
                {e.age}
              </Text>

              <Text>
                <Text style={Styles.Key}>País : </Text> 
                {e.country}
              </Text>

              <TouchableOpacity style={Styles.Button} onPress={()=> setDataModal(false)}>
                <Text style={Styles.TextButton}>Fechar</Text>
              </TouchableOpacity>
            </View>
          )}
      </View>
    </Modal>


    <Modal
      visible={msgModal}
      transparent={true}
      animationType={'fade'}
      onRequestClose={()=> setMsgModal(false)}
    >
      <View style={Styles.Modal}>
          <View style={Styles.Box}>
            <Text style={Styles.Title}>Dados salvos com sucesso</Text>

            <TouchableOpacity style={Styles.Button} onPress={() => setMsgModal(false)}>
              <Text style={Styles.TextButton}>Fechar</Text>
            </TouchableOpacity>
          </View>
      </View>
    </Modal>

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
    width : '85%',
    padding : 12,
    marginTop : 10,

    backgroundColor: '#D3D3D3',
    borderRadius : 15
  },

  Button : {
    alignItems : 'center',
    justifyContent : 'center',
    backgroundColor: '#1E90FF',
    borderRadius : 15,

    width : '85%',
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
    margin : 5,
    marginTop : 15
  },

  TextModal : {
    color: '#1E90FF',
    fontSize : 18,
    marginTop : 120
  },

  Modal : {
    backgroundColor : 'rgba(0, 0, 0, 0.3)',
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
  },

  Box : {
    width : '90%',
    paddingTop : 10,

    justifyContent : 'center',
    alignItems : 'center',

    backgroundColor : '#fff',
    borderRadius : 15,
  },

  Key : {
    fontWeight : 'bold',
    fontSize : 17,
  }
});

export default App;
