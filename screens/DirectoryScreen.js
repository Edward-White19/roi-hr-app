import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { Button, Card, Dialog, FAB, IconButton, Portal } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { deletePerson, fetchPeople } from '../utils/api';
import RoiHeader from '../components/RoiHeader';
import RoiBackdrop from '../components/RoiBackdrop';
import Text, { fonts } from '../components/Text';
import OfflineBanner from '../components/OfflineBanner';

/**
 * Screen for viewing the Staff Contact Directory.
 * 
 * From here, users can select a staff member to view or edit,
 * or add a new staff member.
*/
export default function DirectoryScreen(props) {
  /* Whether the screen is currently focused. */
  const isFocused = useIsFocused();

  // #region State
  // List of employees.
  const [people, setPeople] = useState([]);

  // Whether offline mode is active.
  const [offline, setOffline] = useState(false);

  // Current error.
  const [error, setError] = useState(null);

  // Whether the "delete" dialog is visible.
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);

  // ID of the employee to delete.
  const [selectedId, setSelectedId] = useState(null);

  // Name of the employee to delete.
  const [selectedName, setSelectedName] = useState(null);
  // #endregion

  // #region Database Fetch
  // Fetches the list of all people.
  const fetchData = async () => {
    try {
      const data = await fetchPeople(setOffline);
      setPeople(data);
    } catch (err) {
      console.error(err);
      setOffline(true);
      setError("Unable to fetch data, offline mode");
    }
  };

  useEffect(() => { fetchData() }, [isFocused]);
  // #endregion

  // #region Database Delete
  /** Attempts to delete the selected person. */
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
        console.error("Error deleting: ", err);
        setError("Failed to delete. Check your connection.");
        hideDeleteDialog();
      }
    }
  }

  /** Show the deletion confirmation dialog. */
  function showDeleteDialog(id, name) {
    setSelectedId(id);
    setSelectedName(name);
    setDeleteDialogVisible(true);
  }

  /** Hide the deletion confirmation dialog. */
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
      {/* Offline Banner */}
      {offline && (<OfflineBanner visible={offline} />)}

      {/* Header. */}
      <RoiHeader title='Staff Directory' />

      {/* Scrolling list view. */}
      <FlatList
        style={{ width: '100%' }}
        contentContainerStyle={styles.listMain}
        data={people}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
          // Profile card.
          <Card
            key={item.id}
            contentStyle={styles.surfaceProfile}
            onPress={() => showViewPerson(item.id)}
          >
            {/* Profile buttons section. */}
            <View style={styles.viewProfileActions}>
              <IconButton
                icon='pencil'
                size={24}
                mode='contained-tonal'
                onPress={() => showEditPerson(item.id)}
                disabled={offline}
              >
                View
              </IconButton>
              <IconButton
                icon='delete'
                size={24}
                mode='contained-tonal'
                onPress={() => showDeleteDialog(item.id, item.name)}
                disabled={offline}
              >
                View
              </IconButton>
            </View>

            {/* Profile text content section. */}
            <View style={styles.viewProfileContent}>
              <Text
                variant='headlineSmall'
                numberOfLines={1}
                ellipsizeMode='clip'
                fontWeight='bold'
              >
                {item.name}
              </Text>
              <Text
                variant='titleMedium'
                numberOfLines={1}
                ellipsizeMode='clip'
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
        variant='secondary'
        onPress={() => showAddPerson()}
        disabled={offline}
      />

      {/* Deletion confirmation dialog. */}
      <Portal>
        <Dialog visible={deleteDialogVisible} onDismiss={hideDeleteDialog}>
          <Dialog.Title style={fonts.trebuchetMS}>Confirm Deletion</Dialog.Title>
          <Dialog.Content>
            <Text>
              Are you sure you want to delete
              <Text fontWeight='bold'>{' ' + selectedName}</Text>
              ?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDeleteDialog} labelStyle={fonts.trebuchetMS}>Cancel</Button>
            <Button onPress={handleDelete} labelStyle={fonts.trebuchetMS}>Delete</Button>
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
    alignItems: 'center',
  },
  viewProfileContent: {
    width: 240,
    marginLeft: 15,
    paddingVertical: 5,
    rowGap: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  viewProfileActions: {
    marginRight: 15,
    rowGap: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fabAdd: {
    position: 'absolute',
    bottom: 15,
    right: 15,
  }
});