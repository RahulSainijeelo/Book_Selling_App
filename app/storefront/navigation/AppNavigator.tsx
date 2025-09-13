import { createNativeStackNavigator } from "@react-navigation/native-stack"
import DetailsScreen from "../screens/HomeScreen/DetailsScreen";
import TabNavigator from "./TabNavigator";
import SeeAllScreen from "../screens/HomeScreen/SeeAll";
import SearchScreen from "../screens/HomeScreen/SearchScreen";
import EditProfileScreen from "../screens/SettingsScreen/EditProfileScreen"
import YourOrdersScreen from "../screens/SettingsScreen/YourOrders";
import OrderDetailsScreen from "../screens/SettingsScreen/YourOrders/OrderDetails";
import FavoritesScreen from "../screens/SettingsScreen/FavoritesScreen";
export type TabParamList = {
    TabNavigator: undefined
    "Book Details": any
    "See All": any
    SearchScreen: undefined
    "Edit Profile":any
    "Your Orders":any
    "Order Details":any
    "Favorites":any
};

const Stack = createNativeStackNavigator<TabParamList>()
export default function AppNavigator() {
    return (
        <Stack.Navigator initialRouteName="TabNavigator">
            <Stack.Screen
                name="TabNavigator"
                component={TabNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen name='Book Details' component={DetailsScreen} />
            <Stack.Screen name='See All' component={SeeAllScreen} />
            <Stack.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={{ headerShown: false }}
            />
             <Stack.Screen
                name="Edit Profile"
                component={EditProfileScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Your Orders"
                component={YourOrdersScreen}
            />
            <Stack.Screen
                name="Order Details"
                component={OrderDetailsScreen}
            />
            <Stack.Screen
                name="Favorites"
                component={FavoritesScreen}
            />
        </Stack.Navigator>
    )
}