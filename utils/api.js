/**
 * @file Utility file with connections to the database server API, providing CRUD operations.
*/

/** Base URL for the database server API. */
const API_BASE_URL = 'http://localhost:3000/api';

/** @returns An array of all 'department' objects. */
export async function fetchDepartments() {
  try {
    const response = await fetch(`${API_BASE_URL}/departments`);
    if (!response.ok) throw new Error('Failed to fetch Departments');
    return await response.json();
  } catch (error) {
    throw error;
  }
}

/** @returns An array of all 'person' objects. */
export async function fetchPeople() {
  try {
    const response = await fetch(`${API_BASE_URL}/people`);
    if (!response.ok) throw new Error('Failed to fetch People');
    return await response.json();
  } catch (error) {
    throw error;
  }
}

/**
 * @param {Number} id ID of the person object to retrieve.
 * @returns A single 'person' object matching the given ID.
*/
export async function fetchPersonById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/people/${id}`);
    if (!response.ok) throw new Error('Failed to fetch Person');
    return await response.json();
  } catch (error) {
    throw error;
  }
}

/** @param {Object} personData Object with all fields for a new 'person' object. */
export async function addPerson(personData) {
  try {
    const response = await fetch(`${API_BASE_URL}/people`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(personData),
    });
    if (!response.ok) throw new Error('Failed to add Person');
    return await response.json();
  } catch (error) {
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
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) throw new Error('Failed to update Person');
    return await response.json();
  } catch (error) {
    throw error;
  }
}

/** @param {Number} id ID of the 'person' object to retrieve. */
export async function deletePerson(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/people/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete Person');
    return true;
  } catch (error) {
    throw error;
  }
}
