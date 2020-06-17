import AsyncStorage from '@react-native-community/async-storage';

/**
 * Fonction storeData :
 * Fonction de stockage de données
 *
 * @param key Clé de stockage
 * @param value Valeur à stocker
 */
export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {}
};

/**
 * Fonction getData :
 * Fonction de récupération d'une donnée stockée
 *
 * @param key Clé de stockage
 */
export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {}
};

export const removeItem = key => {
  AsyncStorage.removeItem(key);
};
