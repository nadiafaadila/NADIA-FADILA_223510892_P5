// App.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { 
  Provider as PaperProvider, 
  Button, 
  Card, 
  Text, 
  DefaultTheme, 
  Appbar, 
  Snackbar, 
  FAB, 
  Dialog, 
  Portal, 
  TextInput 
} from 'react-native-paper';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#E91E63', 
    accent: '#FFC1E3', 
    background: '#FCE4EC', 
    surface: '#F8BBD0',
    text: '#880E4F',
    notification: '#FF4081',
  },
};

const HomeScreen = ({ navigation }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  return (
    <View style={styles.container}>
      {/* Appbar Header */}
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content title="Home" />
        <Appbar.Action 
          icon="magnify" 
          onPress={() => setSearchVisible(true)} 
        />
      </Appbar.Header>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.card}>
          <Card.Title title="Welcome to Our App!" />
          <Card.Content>
            <Text style={styles.text}>
              Explore the app using the button below to discover more features and insights about our offerings.
            </Text>
          </Card.Content>
          <Card.Actions>
            <TouchableOpacity>
              <Button 
                mode="contained" 
                style={styles.button}
                onPress={() => navigation.navigate('Details')}
              >
                Explore Details
              </Button>
            </TouchableOpacity>
          </Card.Actions>
        </Card>
      </ScrollView>

      {/* Search Dialog */}
      <Portal>
        <Dialog visible={searchVisible} onDismiss={() => setSearchVisible(false)}>
          <Dialog.Title>Search</Dialog.Title>
          <Dialog.Content>
            <TextInput 
              label="Search anything..." 
              value={searchText} 
              onChangeText={(text) => setSearchText(text)} 
              left={<TextInput.Icon name="magnify" />}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setSearchVisible(false)}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const DetailsScreen = ({ navigation }) => {
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Appbar Header */}
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Details" />
      </Appbar.Header>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.card}>
          <Card.Title title="Details & Insights" />
          <Card.Content>
            <Text style={styles.text}>
              Learn more about the amazing features we offer. Use the floating action button below for quick actions!
            </Text>
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Floating Action Button */}
      <FAB
        icon="plus"
        label="Add Item"
        onPress={() => setSnackbarVisible(true)}
        style={styles.fab}
      />

      {/* Snackbar */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: 'Close',
          onPress: () => setSnackbarVisible(false),
        }}
        duration={3000}
      >
        Item added successfully!
      </Snackbar>
    </View>
  );
};

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Search Screen</Text>
    </View>
  );
};

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings Screen</Text>
    </View>
  );
};

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Search') {
            iconName = 'search';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeTabNavigator} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  appbar: {
    backgroundColor: theme.colors.primary,
  },
  content: {
    padding: 16,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    marginBottom: 16,
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: 12,
    elevation: 5, 
  },
  text: {
    color: theme.colors.text,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  button: {
    marginTop: 16,
    backgroundColor: theme.colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: theme.colors.primary,
  },
});
