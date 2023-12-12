import React, { useState, useEffect } from 'react';
import { View, Text, Button, Picker  } from 'react-native';
import { TextInput } from 'react-native-paper';
import {Stack,router} from 'expo-router'
import {COLORS,icons,images,SIZES} from '../ChuckNorrisMobil/constants';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChuckNorrisJoke = () => {
  const [joke, setJoke] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const baseURL = 'https://api.chucknorris.io/jokes';

  // Fetch categories from Chuck Norris API
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${baseURL}/categories`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching Chuck Norris categories:', error);
    }
  };

  // Fetch random joke from Chuck Norris API
  const fetchChuckNorrisJoke = async () => {
    try {
      const response = await fetch(`${baseURL}/random`);
      const data = await response.json();
      setJoke(data.value);

    } catch (error) {
      console.error('Error fetching Chuck Norris joke:', error);
    }
  };

  // Fetch random joke with category from Chuck Norris API
  const fetchChuckNorrisJokewithCategory = async () => {
    try {      
      const response = await fetch(`${baseURL}/random?category=${selectedCategory}`);
      const data = await response.json();
      setJoke(data.value);
    } catch (error) {
      console.error('Error fetching Chuck Norris joke:', error);
    }
  };

  // Search joke with text from Chuck Norris API
  const fetchChuckNorrisJokewithText = async () => {
    try {
      const response = await fetch(`${baseURL}/search?query=${searchQuery}`);
      const data = await response.json();
      
      if (data.result.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.result.length);
        setJoke(data.result[randomIndex].value);
      } else {
        setJoke(joke);
      }

    } catch (error) {
      console.error('Error fetching Chuck Norris joke:', error);
    }
  };

  useEffect(() => {
    fetchChuckNorrisJoke();
    fetchCategories();
  }, [selectedCategory]); // Fetch joke and categories on component mount and when the selected category changes

  return (
    <SafeAreaView style={{flex:1,backgroundColor:COLORS.brown}}>
      <TextInput
        label="Enter search query"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <SafeAreaView style={{flex:1,backgroundColor:COLORS.goldenrod, margin:'auto',position:relative}}>
      <Button title="Buscar chiste" onPress={fetchChuckNorrisJokewithText} />
      <Text>{joke}</Text>
      </SafeAreaView>
      <SafeAreaView style={{flex:1,backgroundColor:COLORS.goldenrod, margin:'auto',position:relative}}>
      <Button title="Dame un chiste aleatorio" onPress={fetchChuckNorrisJoke} />
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
      >
        <Picker.Item label="Selecciona un categoria" value="" />
        {categories.map((category) => (
          <Picker.Item key={category} label={category} value={category} />
        ))}
      </Picker>
      </SafeAreaView>
      <SafeAreaView style={{flex:1,backgroundColor:COLORS.goldenrod,margin:'auto',position:relative}}>
      <Button title="Dame un chiste de la categoria seleccionada" onPress={fetchChuckNorrisJokewithCategory} />
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default ChuckNorrisJoke;