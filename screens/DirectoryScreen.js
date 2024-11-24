import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Card, Text } from 'react-native-paper';
import RoiHeader from '../components/RoiHeader';
import RoiBackdrop from '../components/RoiBackdrop';
import { FlatList } from 'react-native';

const dummyData = [
  { id: 1, name: "Jenny Smith", department: "Human Resources", phone: "+61 123 456 789" },
  { id: 2, name: "Jenny Smith", department: "Human Resources", phone: "+61 123 456 789" },
  { id: 3, name: "Jenny Smith", department: "Human Resources", phone: "+61 123 456 789" },
  { id: 4, name: "Jenny Smith", department: "Human Resources", phone: "+61 123 456 789" },
];

/**
 * Screen for viewing the Staff Contact Directory.
 * 
 * From here, users can select a staff member to view or edit,
 * or add a new staff member.
*/
export default function DirectoryScreen(props) {
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
      <RoiHeader title='Staff Directory' />
      <FlatList
        style={{ width: '100%' }}
        contentContainerStyle={styles.listMain}
        data={dummyData}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
          <Card key={item.id} style={styles.cardProfile}>
            <Card.Title
              title={item.name}
              titleVariant='titleMedium'
              right={(props) => {
                <Avatar.Icon size={48} icon="folder" style={{ marginHorizontal: 10 }} />
              }}
            />
            <Card.Content>
              <Text variant='bodyLarge'>{item.department}</Text>
              <Text variant='bodyMedium'>{item.phone}</Text>
            </Card.Content>
          </Card>
        }
      >
      </FlatList>
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
  cardProfile: {
    width: 320,
    padding: 20,
    rowGap: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
