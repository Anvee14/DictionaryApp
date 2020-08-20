import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Header } from 'react-native-elements';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      isPressed:false,
      word:"loading...",
      lexicalCategory:'',
      example:[],
      definition:""
    };
  }
  getWord=(word)=>{
    var url = "https://whitehat-dictionary.glitch.me/?word="+word
    return fetch(url)
    .then((data)=>{
      return data.json()
    })
    .then((response)=>{
      var responseObject=JSON.parse(response);
      var word = responseObject.word
      var lexicalCategory = responseObject.results[0]
                            .lexicalEntries[0].lexicalCategory.text
      var definition = responseObject.results[0].lexicalEntries[0].entries[0].senses[0].definition[0]
        
      this.setState({
        "word": word.trim(),
        "lexicalCategory":lexicalCategory===undefined ? "":lexicalCategory.trim(),
        "definition":definition === undefined ? "": definition.trim()
    })
  })
      
  }
 
  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'#9c8210'}
          centerComponent={{
            text: 'Dictionary App',
          style: { color: '#fff', fontSize: 20 ,width:300},
          }}
         />
         <TextInput
          style={styles.inputBox}
          onChangeText={text => {
            this.setState({ 
              text: text
             });
          }}
          value={this.state.text}
        />
        <TouchableOpacity
        styles={styles.searchButton}
        onPress={()=>{
          this.setState({isPressed:true});
          this.getWord(this.state.text)
        
        }}>
           <Text style={styles.buttonText}>GO</Text>
        </TouchableOpacity>
        <View>
            <Text>
              Word:{" "}
              </Text>
              <Text>
              {this.state.word}
              </Text>
        </View>
        <View>
            <Text>
              type:{" "}
              </Text>
              <Text>
              {this.state.lexicalCategory}
              </Text>
        </View>

         </View>
       
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#09ff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    textAlign:'center'
  },
    goButton: {
      width: '50%',
      height: 55,
      alignSelf: 'center',
      padding: 10,
      margin: 10,
    },
  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  inputBox: {
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
  }
  
}
);
