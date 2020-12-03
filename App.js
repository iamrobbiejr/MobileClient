// import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Button,
  View,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';

import 'react-native-gesture-handler';
import LogIn from './app/auth/LogIn';
import SignUp from './app/auth/SignUp';
import Main from './app/Student/Main';
import Assignments from './app/Student/Assignments';
import TurnIn from './app/Student/TurnInAssignment';
import Resources from './app/Student/Resources';
import VideoRoom from './app/Student/VideoRoom';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import Library from './app/Student/Library';
import ExamPapers from './app/Student/ExamPapers';
import ShowResources from './app/Student/ShowResources';
import PDF_Viewer from './app/Student/PDF_Viewer';
import VideoPlayer from './app/Student/VideoPlayer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Meetings from './app/Student/Meetings';

function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Pawa Cyberschool';

  switch (routeName) {
    case 'Main':
      return 'Dashboard';
    case 'Assignments':
      return 'Classwork';
    case 'VideoRoom':
      return 'Video Room';
    case 'Resources':
      return 'Resources';
    case 'ShowResources':
      return 'ShowResources';
  }
}

function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LogIn}
          options={{
            title: ' Pawa Cyberschool E-Learning',
            headerStyle: {
              // backgroundColor: '#fff',
            },
            headerLeft: null,
            headerTintColor: '#12A3D5',
            headerTitleStyle: {
              fontWeight: 'normal',
              alignSelf: 'center',
            },
          }}
        />

        <Stack.Screen
          name="Register"
          component={SignUp}
          options={{
            title: 'Activate Account',
            headerStyle: {
              backgroundColor: '#12A3D5',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'normal',
            },
          }}
        />
        <Stack.Screen
          name="Main"
          component={Home}
          options={({route, navigation}) => ({
            headerTitle: 'PawaCyberSchool',
            headerRight: () => (
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    'Log out',
                    'Do you want to logout?',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => {
                          return null;
                        },
                      },
                      {
                        text: 'Confirm',
                        onPress: () => {
                          AsyncStorage.clear();
                          navigation.navigate('Login');
                        },
                      },
                    ],
                    {cancelable: false},
                  )
                }
                style={{
                  right:
                    Platform.OS === 'ios'
                      ? Dimensions.get('window').height < 667
                        ? '10%'
                        : '5%'
                      : '25%',
                  backgroundColor: 'transparent',
                  paddingLeft: 15,
                }}>
                <View
                  style={{
                    flex: 0,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start',
                  }}>
                  <MaterialCommunityIcons
                    name="logout"
                    size={22}
                    color="white"
                  />
                </View>
              </TouchableOpacity>
            ),

            headerLeft: null,
            headerStyle: {
              backgroundColor: '#12A3D5',
            },

            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'normal',
            },
          })}
        />
        <Stack.Screen
          name="Assignments"
          component={Assignments}
          options={{
            headerTitle: 'Classwork',
            headerStyle: {
              backgroundColor: '#12A3D5',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="TurnIn"
          component={TurnIn}
          options={{
            headerTitle: 'Assignment Submission',
            headerStyle: {
              backgroundColor: '#12A3D5',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Resources"
          component={Resources}
          options={({route, navigation}) => ({
            headerTitle: 'Resources',
            headerStyle: {
              backgroundColor: '#12A3D5',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        />
        <Stack.Screen
          name="ShowResources"
          component={ShowResources}
          options={({route, navigation}) => ({
            headerTitle: 'Resources',
            headerStyle: {
              backgroundColor: '#12A3D5',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        />
        <Stack.Screen
          name="Library"
          component={Library}
          options={{
            headerTitle: 'Library',
            headerStyle: {
              backgroundColor: '#12A3D5',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Exam Papers"
          component={ExamPapers}
          options={{
            headerTitle: 'Exam Papers',
            headerStyle: {
              backgroundColor: '#12A3D5',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="PDF_Viewer"
          component={PDF_Viewer}
          options={{
            headerTitle: 'Resourses',
            headerStyle: {
              backgroundColor: '#12A3D5',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="VideoPlayer"
          component={VideoPlayer}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LiveVideo"
          component={Meetings}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VideoRoom"
          component={VideoRoom}
          options={{
            headerTitle: 'Video Room',
            headerStyle: {
              backgroundColor: '#12A3D5',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Home() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'dashboard' : 'dashboard';
          } else if (route.name === 'Assignments') {
            iconName = focused ? 'library-books' : 'library-books';
          } else if (route.name === 'Resources') {
            iconName = focused ? 'storage' : 'storage';
          } else if (route.name === 'VideoRoom') {
            iconName = focused ? 'video-library' : 'video-library';
          }

          // You can return any component that you like here!
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#12A3D5',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Home" component={Main} />
      <Tab.Screen name="Assignments" component={Assignments} />
      <Tab.Screen name="Resources" component={Resources} />
      <Tab.Screen name="VideoRoom" component={VideoRoom} />
    </Tab.Navigator>
  );
}

export default App;
