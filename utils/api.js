/**
 * @file Utility file with connections to the database server API, providing CRUD operations.
*/

import AsyncStorage from "@react-native-async-storage/async-storage";

/** Base URL for the database server API. */
const API_BASE_URL = 'http://localhost:3000/api';

/** @returns Whether the API can connect to the database. */
async function isOnline() {
  try {
    const response = await fetch(`${API_BASE_URL}/departments`);
    return response.ok;
  } catch (error) {
    return false;
  }
}

/** @returns An array of all 'department' objects. */
export async function fetchDepartments(setOfflineStatus) {
  try {
    const online = await isOnline();
    setOfflineStatus(!online);

    if (online) {
      const response = await fetch(`${API_BASE_URL}/departments`);
      if (!response.ok) throw new Error("Failed to fetch Departments");
      const data = await response.json();
      await AsyncStorage.setItem("departments", JSON.stringify(data));
      return data;
    } else {
      const cachedData = await AsyncStorage.getItem("departments");
      if (cachedData) {
        return JSON.parse(cachedData);
      } else {
        throw new Error("No cached departments data available");
      }
    }
  } catch (error) {
    console.error("Error fetching departments:", error.message);
    return null;
  }
}

/** @returns An array of all 'person' objects. */
export async function fetchPeople(setOfflineStatus) {
  try {
    const online = await isOnline();
    setOfflineStatus(!online);

    if (online) {
      const response = await fetch(`${API_BASE_URL}/people`);
      if (!response.ok) throw new Error("Failed to fetch People");
      const data = await response.json();
      await AsyncStorage.setItem("people", JSON.stringify(data));
      return data;
    } else {
      const cachedData = await AsyncStorage.getItem("people");
      if (cachedData) {
        return JSON.parse(cachedData);
      } else {
        throw new Error("No cached people data available");
      }
    }
  } catch (error) {
    console.error("Error fetching people:", error.message);
    return null;
  }
}

/**
 * @param {Number} id ID of the person object to retrieve.
 * @returns A single 'person' object matching the given ID.
*/
export async function fetchPersonById(id, setOfflineStatus) {
  try {
    const online = await isOnline();
    setOfflineStatus(!online);

    if (online) {
      const response = await fetch(`${API_BASE_URL}/people/${id}`);
      if (!response.ok) throw new Error("Failed to fetch Person");
      const data = await response.json();
      await AsyncStorage.setItem(`person_${id}`, JSON.stringify(data));
      return data;
    } else {
      const cachedData = await AsyncStorage.getItem(`person_${id}`);
      if (cachedData) {
        return JSON.parse(cachedData);
      } else {
        throw new Error(`No cached data available for person with ID ${id}`);
      }
    }
  } catch (error) {
    console.error(`Error fetching person by ID ${id}:`, error.message);
    return null;
  }
}

/** @param {Object} personData Object with all fields for a new 'person' object. */
export async function addPerson(personData) {
  try {
    const response = await fetch(`${API_BASE_URL}/people`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(personData),
    });
    if (!response.ok) throw new Error("Failed to add Person");
    return await response.json();
  } catch (error) {
    console.error("Error adding person:", error.message);
    throw error;
  }
}

/**
 * @param {Number} id          ID of the 'person' object to retrieve.
 * @param {Object} updatedData Object with all fields for the updated 'person' object.
 */
export async function updatePerson(id, updatedData) {
  try {
    const response = await fetch(`${API_BASE_URL}/people/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) throw new Error("Failed to update Person");
    return await response.json();
  } catch (error) {
    console.error(`Error updating person with ID ${id}:`, error.message);
    throw error;
  }
}

/** @param {Number} id ID of the 'person' object to retrieve. */
export async function deletePerson(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/people/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete Person");
    return true;
  } catch (error) {
    console.error(`Error deleting person with ID ${id}:`, error.message);
    throw error;
  }
}
