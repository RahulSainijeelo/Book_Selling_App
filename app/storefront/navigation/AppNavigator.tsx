import { createNativeStackNavigator } from "@react-navigation/native-stack"
import DetailsScreen from "../screens/HomeScreen/DetailsScreen";
import TabNavigator from "./TabNavigator";
import SeeAllScreen from "../screens/HomeScreen/SeeAll";
import SearchScreen from "../screens/HomeScreen/SearchScreen";

export type TabParamList = {
    TabNavigator: undefined
    BookDetails: {itemId:any, title:any}
    "See All": undefined
    SearchScreen: undefined
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
            <Stack.Screen name='BookDetails' component={DetailsScreen} />
            <Stack.Screen name='See All' component={SeeAllScreen} />
            <Stack.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}