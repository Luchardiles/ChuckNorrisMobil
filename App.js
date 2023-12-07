import React, { useState, useEffect } from 'react';
import { View, Text, Button, Picker  } from 'react-native';
import { TextInput } from 'react-native-paper';

const ChuckNorrisJoke = () => {
  const [joke, setJoke] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://api.chucknorris.io/jokes/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching Chuck Norris categories:', error);
    }
  };

  const fetchChuckNorrisJoke = async () => {
    try {
      let apiUrl = 'https://api.chucknorris.io/jokes/random';

      const response = await fetch(apiUrl);
      const data = await response.json();
      setJoke(data.value);

    } catch (error) {
      console.error('Error fetching Chuck Norris joke:', error);
    }
  };

  const fetchChuckNorrisJokewithCategory = async () => {
    try {
      let apiUrl = 'https://api.chucknorris.io/jokes/random';
      if (selectedCategory) {
        apiUrl += `?category=${selectedCategory}`;
      }
      
      const response = await fetch(apiUrl);
      const data = await response.json();
      setJoke(data.value);

    } catch (error) {
      console.error('Error fetching Chuck Norris joke:', error);
    }
  };

  const fetchChuckNorrisJokewithText = async () => {
    try {
      let apiUrl = 'https://api.chucknorris.io/jokes/random';
      if (selectedCategory) {
        apiUrl += `?category=${selectedCategory}`;
      }
      
      const response = await fetch(apiUrl);
      const data = await response.json();
      setJoke(data.value);

    } catch (error) {
      console.error('Error fetching Chuck Norris joke:', error);
    }
  };

  useEffect(() => {
    fetchChuckNorrisJoke();
    fetchCategories();
  }, [selectedCategory]); // Fetch joke and categories on component mount and when the selected category changes

  return (
    <View>
      <TextInput
        label="Enter search query"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <Button title="Get me a new one" onPress={fetchChuckNorrisJoke} />
      <Text>{joke}</Text>
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
      <Button title="Dame un chiste de la categoria seleccionada" onPress={fetchChuckNorrisJokewithCategory} />
    </View>
  );
};

export default ChuckNorrisJoke;