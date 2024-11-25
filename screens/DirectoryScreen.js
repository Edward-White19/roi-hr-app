import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Avatar, Button, Card, Dialog, FAB, IconButton, Portal, Surface, Text } from 'react-native-paper';
import RoiHeader from '../components/RoiHeader';
import RoiBackdrop from '../components/RoiBackdrop';
import { View } from 'react-native-web';
import { deletePerson, fetchPeople } from '../utils/api';

const dummyData = [
  { id: 1, name: "Jenny Smith", department: "Human Resources", phone: "01 2345 6789" },
  { id: 2, name: "Jenny skdfshdgfjhsdgf Smith", department: "Human Resources", phone: "01 2345 6789" },
  { id: 3, name: "Jenny Smith", department: "Human Resources", phone: "01 2345 6789" },
  { id: 4, name: "Jenny Smith", department: "Human Resources", phone: "01 2345 6789" },
  { id: 5, name: "Jenny Smith", department: "Human Resources", phone: "01 2345 6789" },
  { id: 6, name: "Jenny Smith", department: "Human Resources", phone: "01 2345 6789" },
  { id: 7, name: "Jenny Smith", department: "Human Resources", phone: "01 2345 6789" },
  { id: 8, name: "Jenny Smith", department: "Human Resources", phone: "01 2345 6789" },
];

/**
 * Screen for viewing the Staff Contact Directory.
 * 
 * From here, users can select a staff member to view or edit,
 * or add a new staff member.
*/
export default function DirectoryScreen(props) {
  // #region Database Fetch
  const [people, setPeople] = useState([]);
  const [offline, setOffline] = useState(false);
  const [error, setError] = useState(null);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedName, setSelectedName] = useState(null);

  // Fetches the list of all people.
  const fetchData = async () => {
    try {
      const data = await fetchPeople();
      setPeople(data);
    } catch (err) {
      console.error(err);
      setOffline(true);
      setError("Unable to fetch data, offline mode");
    }
  };

  useEffect(() => { fetchData() }, []);

  // Delete a person.
  async function handleDelete() {
    if (selectedId !== null) {
      try {
        const success = await deletePerson(selectedId);
        if (success) {
          fetchData();
          hideDeleteDialog();
        } else {
          setError("Failed to delete. Please try again.");
        }
      } catch (err) {
        console.error("Error deleting:", err);
        setError("Failed to delete. Check your connection.");
        hideDeleteDialog();
      }
    }
  }

  function showDeleteDialog(id, name) {
    setSelectedId(id);
    setSelectedName(name);
    setDeleteDialogVisible(true);
  }

  function hideDeleteDialog() {
    setDeleteDialogVisible(false);
    setSelectedId(null);
  }
  // #endregion

  // #region Navigation
  /** Navigates to the Add Person screen. */
  function showAddPerson() {
    props.navigation.navigate('edit-one', { id: -1 });
  }

  /** Navigates to the Edit Person screen. */
  function showEditPerson(id) {
    props.navigation.navigate('edit-one', { id: id });
  }

  /** Navigates to the View Person screen. */
  function showViewPerson(id) {
    props.navigation.navigate('view-one', { id: id });
  }
  // #endregion

  return (
    <RoiBackdrop>
      {/* Header. */}
      <RoiHeader title='Staff Directory' />

      {/* Scrolling list view. */}
      <FlatList
        style={{ width: '100%' }}
        contentContainerStyle={styles.listMain}
        data={people}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
          <Card
            key={item.id}
            contentStyle={styles.surfaceProfile}
            onPress={() => showViewPerson(item.id)}
          >
            {/* Icon and button section. */}
            <View style={styles.viewProfileActions}>
              <IconButton
                icon='pencil'
                size={32}
                mode='contained-tonal'
                onPress={() => showEditPerson(item.id)}
              >
                View
              </IconButton>
              <IconButton
                icon='delete'
                size={32}
                mode='contained-tonal'
                onPress={() => {
                  showDeleteDialog(item.id, item.name);
                }}
              >
                View
              </IconButton>
            </View>

            {/* Text content section. */}
            <View style={styles.viewProfileContent}>
              <Text
                variant='headlineSmall'
                numberOfLines={1}
                ellipsizeMode='clip'
                style={styles.textProfileTitle}
              >
                {item.name}
              </Text>
              <Text
                variant='titleMedium'
                numberOfLines={1}
                ellipsizeMode='clip'
                style={{ width: '100%' }}
              >
                {item.Department.name}
              </Text>
              <Text
                variant='titleSmall'
                numberOfLines={1}
                ellipsizeMode='clip'
              >
                {item.phone}
              </Text>
            </View>
          </Card>
        }
      >
      </FlatList>

      {/* 'Add' button. */}
      <FAB
        style={styles.fabAdd}
        icon='plus'
        size='medium'
        mode='elevated'
        variant='tertiary'
        onPress={showAddPerson}
      />

      {/* Dialog for delete confirmation */}
      <Portal>
        <Dialog visible={deleteDialogVisible} onDismiss={hideDeleteDialog}>
          <Dialog.Title>Confirm Deletion</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to delete
              <Text style={{ fontWeight: "bold" }}>{' ' + selectedName}</Text>
              ?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDeleteDialog}>Cancel</Button>
            <Button onPress={handleDelete}>Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </RoiBackdrop>
  )
}

/** Stylesheet. */
const styles = StyleSheet.create({
  listMain: {
    width: '100%',
    paddingVertical: 40,
    gap: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignContent: 'center',
    flexWrap: 'wrap',
  },
  surfaceProfile: {
    paddingVertical: 15,
    columnGap: 20,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  viewProfileContent: {
    width: 240,
    marginLeft: 15,
    paddingVertical: 5,
    rowGap: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  viewProfileActions: {
    marginRight: 15,
    rowGap: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewProfileButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textProfileTitle: {
    fontWeight: 'bold',
  },
  fabAdd: {
    position: 'absolute',
    bottom: 15,
    right: 15,
  }
});