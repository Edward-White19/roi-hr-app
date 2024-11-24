import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Avatar, Button, Card, FAB, Surface, Text } from 'react-native-paper';
import RoiHeader from '../components/RoiHeader';
import RoiBackdrop from '../components/RoiBackdrop';
import { View } from 'react-native-web';

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
        data={dummyData}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
          <Surface key={item.id} style={styles.surfaceProfile}>
            {/* Icon and button section. */}
            <View style={styles.viewProfileActions}>
              <Avatar.Icon
                icon='folder'
                size={72}
              />
              <Button
                mode='contained'
                style={{ width: 72 }}
                labelStyle={{ margin: 0, padding: 5 }}
                onPress={() => showViewPerson(item.id)}
              >
                View
              </Button>
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
              >
                {item.department}
              </Text>
              <Text
                variant='titleSmall'
                numberOfLines={1}
                ellipsizeMode='clip'
              >
                {item.phone}
              </Text>
            </View>
          </Surface>
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
    width: 320,
    paddingVertical: 15,
    columnGap: 20,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  viewProfileContent: {
    maxWidth: 195,
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
    justifyContent: 'flex-start',
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
