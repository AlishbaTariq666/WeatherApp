// correct 

// import React, { useState } from 'react';
// import { TouchableOpacity, Image, View, StyleSheet } from 'react-native';
// import images from '../../images';
// import styles from './style';

// const CustomHeader = ({ navigation, onAddToFavorites }) => {
//   const [isFaviconPressed, setIsFaviconPressed] = useState(false);

//   const toggleFavicon = () => {
//     setIsFaviconPressed(!isFaviconPressed);

//     // Call the callback function to add the city to favorites
//     if (onAddToFavorites) {
//       onAddToFavorites();
//     }
//   };

//   const navigateToSettings = () => {
//     if (!isFaviconPressed) {
//       navigation.navigate('Settings');
//     }
//   };

//   return (
//     <View style={styles.headerContainer}>
//       <View>
//         <TouchableOpacity onPress={toggleFavicon}>
//           <Image
//             source={isFaviconPressed ? images.favIcon2 : images.favIcon}
//             style={styles.favouritesIcon}
//           />
//         </TouchableOpacity>
//       </View>

//       <View>
//         <TouchableOpacity onPress={navigateToSettings}>
//           <Image source={images.settings} style={styles.settingsIcon} />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default CustomHeader;


import React, { useState } from 'react';
import { TouchableOpacity, Image, View, StyleSheet } from 'react-native';
import images from '../../images';
import styles from './style';
import { connect } from 'react-redux';
import { addCityWeatherToFavorites, addToFavorites } from '../../redux/Actions';


const CustomHeader = ({ navigation, onAddToFavorites }) => {
  // State to manage the favorite icon
  const [isFaviconPressed, setIsFaviconPressed] = useState(false);

  // Function to toggle the favorite icon and trigger the callback to add to favorites
  const toggleFavicon = () => {
    setIsFaviconPressed(!isFaviconPressed);

    // Call the callback function to add the city to favorites
    if (onAddToFavorites) {
      onAddToFavorites();
    }
  };

  const navigateToSettings = () => {
    // Only navigate to the Settings screen if the favorite icon is not pressed
    if (!isFaviconPressed) {
      navigation.navigate('Settings');
    }
  };

  return (
    <View style={styles.headerContainer}>
      <View>
        <TouchableOpacity onPress={toggleFavicon}>
          <Image
            source={isFaviconPressed ? images.favIcon2 : images.favIcon}
            style={styles.favouritesIcon}
          />
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity onPress={navigateToSettings}>
          <Image source={images.settings} style={styles.settingsIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// export default CustomHeader;
const mapStateToProps = (state) => ({
  // Add your mapStateToProps here if needed
});

const mapDispatchToProps = {
  addToFavorites,
  addCityWeatherToFavorites,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomHeader);
