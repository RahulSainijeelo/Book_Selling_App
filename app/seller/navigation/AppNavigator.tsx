import { createNativeStackNavigator } from "@react-navigation/native-stack"
import DetailsScreen from "../screens/HomeScreen/DetailsScreen";
import BookDetailsScreen from "../screens/Products/BookDetails";
import TabNavigator from "./TabNavigator";
export type TabParamList = {
    TabNavigator: undefined
    "Order Details": { 
      itemId: any, 
      title: any
    }
    "Book Details":any
}
const Stack = createNativeStackNavigator<TabParamList>()
export default function AppNavigator() {
    return (
        <Stack.Navigator initialRouteName="TabNavigator" screenOptions={{
            headerTitleStyle: { fontWeight: 'bold' },
        }}>
            <Stack.Screen
                name="TabNavigator"
                component={TabNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen name='Order Details' component={DetailsScreen} />
            <Stack.Screen name='Book Details' component={BookDetailsScreen} />
        </Stack.Navigator>
    )
}