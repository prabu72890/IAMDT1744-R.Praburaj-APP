import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  const [getText, setText] = useState('');
  const [getList, setList] = useState([ ]);

  //*listing todo item
  const addItem = () => {
    setList((doneList)=>
    setList([...doneList, { key: Math.random().toString(), data: getText }])
    );
    
    //*remove enter*//
    setText('');
  };

   // remove all function
  const remItem= () => {
    setList((setText) => setList([]));
  };
  
  //*strike mark*//
  const onClick = (index) => {
    getList[index].class = 'line';
    setList((doneList) => setList([...getList]));
  };

  // todo list function
  const scrollView = (
    <ScrollView style={styles.scrollview}>

      {getList.reverse().map((item, index) => (

        <TouchableOpacity
          key={item.key}
          activeOpacity={0.6}
          onPress={() => onClick(index)}
          style={( styles[item.class] )}>
          <View style={styles.scrollviewItem}>
            <TouchableOpacity
              style={{
                width: 20,
                height: 20,
                borderRadius: 15,
                borderWidth: 3,
                borderColor: '#fff',
                margin: 10,
                // flexDirection:'row',
              }}></TouchableOpacity>

            <Text style={styles.scrollviewText}> {item.data} </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  // todo list place ux
  const emptyScrollView = (
    <View style={{ paddingTop: 30 }}>
      <Text style={{ fontStyle: 'italic', fontSize: 24, color: '#fff' }}>
        No ToDo Items! Hurray!
      </Text>
    </View>
  );

 // todo type and input function , remove all , add task button
  return (
    <LinearGradient colors={['#FA8072', '#764ba2']} style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <Text style={styles.title}>ToDo-List</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type here to add a TODO."
             placeholderTextColor={'#fff'}
            onChangeText={(text) => setText(text)}
            value={getText}
          />
        </View>
        <View
          style={{
            margin: 20,
            flexDirection: 'row',
          }}>
          <View
            style={{
              paddingRight: 32,
            }}>
            <Button
              title="   Remove all   "
              color="#FA8072"
              onPress={remItem}
            />
          </View>
          <View
            style={{
              paddingLeft: 32,
            }}>
            <Button
              title="   Add Task    "
              color="#764ba2"
              onPress={addItem}
              disabled={getText.length <= 0}></Button>
          </View>
        </View>
        {getList.length <= 0 ? emptyScrollView : scrollView}
      </View>
    </LinearGradient>
  );
  
}

// styles

const styles = StyleSheet.create({
  scrollviewText: {
    fontSize: 26,
    color: 'white',
  },
  scrollview: {
    paddingTop: 20,
    width: '100%',
  },
  scrollviewItem: {
    flexDirection: 'row',
    alignSelf: 'center',
    padding: 8,
    margin: 5,
    width: '90%',
    borderBottomWidth: 1,
    borderColor: '#fff',
  },
  title: {
    fontSize: 56,
    color: '#fff',
    fontFamily: 'roboto',
    fontWeight: 400,
    marginBottom: 16,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  inputContainer: {
    width: '70%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    marginTop: 30,
    paddingTop: 10,
    paddingRight: 15,
    paddingLeft: 15,
    fontSize: 24,
    color: 'white',
    fontWeight: '500',
    borderColor: '#fff',
    borderBottomWidth: 3,
    padding: 10,
  },
   line: {
    textDecorationLine: 'line-through',
    color:'#fff',
  },
});
