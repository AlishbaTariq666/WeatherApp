// {
//   /* <WeatherScreenCenter weatherData={weatherData} /> */
// }
// {
//   /*         
//         <View style={styles.container}>
//       <Text style={styles.title}>Weather Current Forecast Graph</Text>
//       <WeatherChart data={temperatureData} /> 
//     </View> */
// }

// // before original file

// import React, { useEffect, useState } from "react";
// import {View, Text, StyleSheet, Dimensions, ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
// import { connect } from "react-redux"; // Import connect
// import { fetchFavoriteCities } from "../../redux/Actions/actionType";
// import WeatherScreenTop from "../../components/WeatherScreenTop";
// import SunriseSunset from "../../components/SunriseSunset";
// import WeeklyWeather from "../../components/WeatherForecast/WeeklyWeather";
// import HourlyForecast from "../../components/WeatherForecast/HourlyForecast";
// import WeatherScreenBottom from "../../components/WeatherScreenBottom";
// import weatherStyles from "../../components/WeatherForecast/weatherStyles";
// import styles from "./style";

// const cityName = "Lahore";
// const API_KEY = "6c43887627efe6c7855b89894139756e";

// const Weather = ({ favoriteCities, fetchFavoriteCities }) => {
//   const [weatherData, setWeatherData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [selectedUnit, setSelectedUnit] = useState(true); // Initialize as Celsius

//   async function getWeatherData() {
//     setLoading(true);
//     const API = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`;
//     let res = await fetch(API);

//     if (res.status === 200) {
//       res = await res.json();
//       setWeatherData(res);
//     } else {
//       setWeatherData(null);
//     }
//     setLoading(false);
//   }

//   useEffect(() => {
//     getWeatherData();
//   }, []);

//   if (weatherData === null) {
//     return <ActivityIndicator size="large" />;
//   }

//   // Function to add a city to favorites
//   const addToFavorites = (cityName) => {
//     fetchFavoriteCities(cityName);
//   };

//   return (
//     <ScrollView>
//       <View style={styles.container}>
//         {/* <SearchBar /> */}
//         <WeatherScreenTop
//           weatherData={weatherData}
//           selectedUnit={selectedUnit}
//         />
//         <SunriseSunset weatherData={weatherData} />
//       </View>
//       <View style={weatherStyles.container}>
//         <Text style={weatherStyles.title}>Hourly Forecast for Lahore</Text>
//         <HourlyForecast data={weatherData.list} />
//       </View>
//       <View style={styles.weekcontainer}>
//         <Text style={styles.screenTitle}>Weekly Weather for Lahore</Text>
//         <WeeklyWeather weeklyData={weatherData} />
//       </View>
//       <View>
//         <WeatherScreenBottom weatherData={weatherData} />
//       </View>
//       {/* Display favorite cities */}
//       <View style={styles.favoriteCitiesContainer}>
//         <Text style={styles.favoriteCitiesTitle}>Favorite Cities</Text>
//         {favoriteCities.map((city) => (
//           <TouchableOpacity key={city} onPress={() => addToFavorites(city)}>
//             <Text>{city}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </ScrollView>
//   );
// };
// const mapStateToProps = (state) => ({
//   favoriteCities: state.favoriteCities,
// });

// const mapDispatchToProps = {
//   fetchFavoriteCities,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Weather);





// correct for any city data fetching

// Weather.js
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { fetchFavoriteCities } from '../../redux/Actions/actionType';
import { fetchWeatherData } from '../../helper/api';
import WeatherScreenTop from '../../components/WeatherScreenTop';
import SunriseSunset from '../../components/SunriseSunset';
import WeeklyWeather from '../../components/WeatherForecast/WeeklyWeather';
import HourlyForecast from '../../components/WeatherForecast/HourlyForecast';
import WeatherScreenBottom from '../../components/WeatherScreenBottom';
import weatherStyles from '../../components/WeatherForecast/weatherStyles';
import styles from './style';
import FavoriteCities from '../../components/Favourites';
import Settings from '../../components/Settings';
import CustomHeader from '../../components/CustomHeader';
import images from '../../images';

const Weather = ({ favoriteCities, fetchFavoriteCities, route, navigation }) => {
  const { cityName, temperature } = route.params;
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(true);

  async function getWeatherData() {
    setLoading(true);

    try {
      const data = await fetchWeatherData(cityName);
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
    }

    setLoading(false);
  }

  useEffect(() => {
    getWeatherData();
  }, [cityName]);

  if (loading || weatherData === null) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <ImageBackground
      source={images.backgroundd} 
      style={{ flex: 1 }} 
    >
      <ScrollView>
        <View style={styles.container}>
          <CustomHeader navigation={navigation} />

          {/* <CustomHeader navigation={navigation} cityName={cityName} temperature={temperature} /> */}
          <WeatherScreenTop weatherData={weatherData} selectedUnit={selectedUnit} />
        

          <SunriseSunset weatherData={weatherData} />
        </View>
        <View style={weatherStyles.container}>
          <Text style={weatherStyles.title}>Hourly Forecast for {cityName}</Text>
          <HourlyForecast data={weatherData.list} />
        </View>
        
        <View style={styles.weekcontainer}>
          <Text style={styles.screenTitle}>Weekly Weather for {cityName}</Text>
          <WeeklyWeather weeklyData={weatherData} />
        </View>
        <View>
          <WeatherScreenBottom weatherData={weatherData} />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const mapStateToProps = (state) => ({
  favoriteCities: state.favoriteCities,
});

const mapDispatchToProps = {
  fetchFavoriteCities,
};

export default connect(mapStateToProps, mapDispatchToProps)(Weather);
