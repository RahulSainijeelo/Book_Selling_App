import { createNativeStackNavigator } from "@react-navigation/native-stack"
import DetailsScreen from "../screens/HomeScreen/DetailsScreen";
import TabNavigator from "./TabNavigator";
export type TabParamList = {
    TabNavigator: undefined
    DetailsScreen: undefined
};

const Stack = createNativeStackNavigator<TabParamList>()
export default function AppNavigator() {
    return (
        <Stack.Navigator initialRouteName="TabNavigator" screenOptions={{
            headerStyle: { backgroundColor: '#6200ea' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
        }}>
            <Stack.Screen
                name="TabNavigator"
                component={TabNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen name='DetailsScreen' component={DetailsScreen} />
        </Stack.Navigator>
    )
}