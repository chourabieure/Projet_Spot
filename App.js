import React, { useState, useEffect } from 'react';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat'
import AppLoading from 'expo-app-loading';
import { StyleSheet, Text, View, Image, Dimensions, Button } from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle, FadeIn } from 'react-native-reanimated';
import { SvgXml } from "react-native-svg"
import { SvgGradient, SvgPath, SvgButtons, SvgTop, SvgPhone, SvgBike, SvgRider, SvgLogo } from './src/SvgList.js'
import GestureRecognizer from 'react-native-swipe-gestures';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Network from 'expo-network';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { generatedMapStyle } from './src/generatedMap.js';
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapView from "react-native-map-clustering";
import * as Location from "expo-location";

function HomeScreen({ navigation }) {
	const [data, setData] = useState([]);
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const [initialCoord, setInitialCoord] = useState(null);

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied');
				return;
			}

			let location = await Location.getLastKnownPositionAsync({ accuracy: 6 });
			setLocation(location);
			setInitialCoord({
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
				latitudeDelta: .02,
				longitudeDelta: .02,
			})
			fetch("http://172.104.143.60:9000/api/arceau")
				.then((response) => response.json())
				.then((json) => {
					const filteredArray = json.filter((res) =>
						(parseFloat(res.geo_x) <= location.coords.latitude + 0.01) &&
						(parseFloat(res.geo_x) >= location.coords.latitude - 0.01) &&
						(parseFloat(res.geo_y) <= location.coords.longitude + 0.01) &&
						(parseFloat(res.geo_y) >= location.coords.longitude - 0.01)
					);
					setData(filteredArray)
					// setData(json.splice(0, 2))
				});
		})();
	}, []);

	let text = 'Waiting..';
	if (errorMsg) {
		text = errorMsg;
	} else if (location) {
		text = JSON.stringify(location);
	}


	if (!initialCoord) {
		return <AppLoading />;
	} else {
		return (
			<View style={styles.container, {
			}}>
				<MapView
					initialRegion={initialCoord}
					style={styles.map}
					provider={MapView.PROVIDER_GOOGLE}
					customMapStyle={generatedMapStyle}
					showsUserLocation={true}
					followsUserLocation={true}
					clusterColor={"#805CF6"}
				>
					{data.map((datas, index) => (
						<Marker
							key={datas._id}
							coordinate={{
								latitude: parseFloat(datas.geo_x),
								longitude: parseFloat(datas.geo_y),
							}}
							title={"nombre d'arceau: " + parseFloat(datas.nombre)}
						>
							<Image
								source={require("./assets/pin.png")}
								style={{ width: 32, height: 45 }}
							/>
						</Marker>

					))}
				</MapView>

			</View >
		)
	}



}


function FirstTimeScreen({ navigation }) { //*************************************************************** */
	let cpt = 0

	// ANIMATED STYLE FOR BUTTONS
	const offsetButtons = useSharedValue(0);
	offsetButtons.value = 1.47;
	const animatedStylesButtons = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: withSpring(offsetButtons.value * 255, {
						damping: 20,
						stiffness: 70
					}),
				},
			],
		};
	});
	// ANIMATED STYLE FOR GRADIENT
	const offsetGradient = useSharedValue(0);
	offsetGradient.value = 1.5;
	const animatedStylesGradient = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: withSpring(offsetGradient.value * 255, {
						damping: 20,
						stiffness: 40
					}),
				},
			],
		};
	});
	// ANIMATED STYLE FOR PATH
	const offsetPath = useSharedValue(0);
	offsetPath.value = 1.90;
	const animatedStylesPath = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: withSpring(offsetPath.value * 255, {
						damping: 20,
						stiffness: 60,
					}),
				},
			],
		};
	});
	// ANIMATED STYLE FOR TOP
	const offsetTop = useSharedValue(0);
	offsetTop.value = 1.6;
	const animatedStylesTop = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: withSpring(offsetTop.value * 255, {
						damping: 20,
						stiffness: 60,
					}),
				},
			],
		};
	});
	// ANIMATED STYLE FOR PHONE
	const offsetPhone = useSharedValue(0);
	offsetPhone.value = 0;
	const animatedStylesPhone = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: withSpring(offsetPhone.value * 255, {
						damping: 20,
						stiffness: 60,
					}),
				},
			],
		};
	});
	// ANIMATED STYLE FOR BIKE
	const offsetBike = useSharedValue(0);
	offsetBike.value = 3;
	const animatedStylesBike = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: withSpring(offsetBike.value * 255, {
						damping: 20,
						stiffness: 60,
					}),
				},
			],
		};
	});
	// ANIMATED STYLE FOR RIDER
	const offsetRider = useSharedValue(0);
	offsetRider.value = 6;
	const animatedStylesRider = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: withSpring(offsetRider.value * 255, {
						damping: 20,
						stiffness: 60,
					}),
				},
			],
		};
	});
	// ANIMATED STYLE FOR TEXT1
	const offsetTextUn = useSharedValue(0);
	offsetTextUn.value = 0;
	const animatedStylesTextUn = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: withSpring(offsetTextUn.value * 255, {
						damping: 20,
						stiffness: 30,
					}),
				},
			],
		};
	});
	// ANIMATED STYLE FOR TEXT2
	const offsetTextDeux = useSharedValue(3);
	offsetTextDeux.value = 3;
	const animatedStylesTextDeux = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: withSpring(offsetTextDeux.value * 255, {
						damping: 20,
						stiffness: 30,
					}),
				},
			],
		};
	});
	// ANIMATED STYLE FOR TEXT3
	const offsetTextTrois = useSharedValue(6);
	offsetTextTrois.value = 6;
	const animatedStylesTextTrois = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: withSpring(offsetTextTrois.value * 255, {
						damping: 20,
						stiffness: 30,
					}),
				},
			],
		};
	});
	const onSwipeLeft = (gestureState) => {
		if (cpt < 2) {
			offsetGradient.value -= 1.5
			offsetButtons.value -= 1.47
			offsetPath.value -= 1.4
			offsetTop.value -= 1.47
			offsetPhone.value -= 3
			offsetBike.value -= 3
			offsetRider.value -= 3
			offsetTextUn.value -= 3
			offsetTextDeux.value -= 3
			offsetTextTrois.value -= 3
			cpt++
		} else {
			navigation.navigate('Home')
		}
	}
	const onSwipeRight = (gestureState) => {

		if (cpt > 0) {
			offsetGradient.value += 1.5
			offsetButtons.value += 1.47
			offsetPath.value += 1.40
			offsetTop.value += 1.47
			offsetPhone.value += 3
			offsetBike.value += 3
			offsetRider.value += 3
			offsetTextUn.value += 3
			offsetTextDeux.value += 3
			offsetTextTrois.value += 3
			cpt--
		}
	}

	return (
		<GestureRecognizer
			style={styles.container}
			onSwipeLeft={(state) => onSwipeLeft(state)}
			onSwipeRight={(state) => onSwipeRight(state)}
		>
			<Animated.View style={[animatedStylesGradient, {
				position: 'absolute',
				top: '25%'
			}]} >
				<SvgXml xml={SvgGradient}></SvgXml>
			</Animated.View>

			<Animated.View style={[animatedStylesButtons, {
				position: 'absolute',
				top: '20%'
			}]} >
				<SvgXml xml={SvgButtons}></SvgXml>
			</Animated.View>
			<Animated.View style={[animatedStylesPath, {
				position: 'absolute',
				top: '37%'
			}]} >
				<SvgXml xml={SvgPath}></SvgXml>
			</Animated.View>
			<Animated.View style={[animatedStylesTop, {
				position: 'absolute',
				top: '9%'
			}]} >
				<SvgXml xml={SvgTop}></SvgXml>
			</Animated.View>

			<Animated.View style={[animatedStylesPhone, {
				position: 'absolute',
				top: '44%'
			}]} >
				<SvgXml xml={SvgPhone}></SvgXml>
			</Animated.View>

			<Animated.View style={[animatedStylesBike, {
				position: 'absolute',
				top: '45%'
			}]} >
				<SvgXml xml={SvgBike}></SvgXml>
			</Animated.View>

			<Animated.View style={[animatedStylesRider, {
				position: 'absolute',
				top: '35%'
			}]} >
				<SvgXml xml={SvgRider}></SvgXml>
			</Animated.View>

			<Animated.View style={[animatedStylesTextUn, {
				position: 'absolute',
				bottom: '20%',
				flex: 1,
				alignItems: 'center'
			}]} >
				<Text style={{
					fontSize: 20,
					fontFamily: 'Montserrat_700Bold'
				}}>Bienvenue sur Spot</Text>
				<Text style={{
					fontSize: 20,
					fontFamily: 'Montserrat_700Bold'
				}}>Swippez pour continuer</Text>
			</Animated.View>

			<Animated.View style={[animatedStylesTextDeux, {
				position: 'absolute',
				bottom: '20%',
				flex: 1,
				alignItems: 'center'
			}]} >
				<Text style={{
					fontSize: 20,
					fontFamily: 'Montserrat_700Bold'
				}}>Les arceaux de la ville</Text>
				<Text style={{
					fontSize: 20,
					fontFamily: 'Montserrat_700Bold'
				}}>à portée de main</Text>
			</Animated.View>

			<Animated.View style={[animatedStylesTextTrois, {
				position: 'absolute',
				bottom: '20%',
				flex: 1,
				alignItems: 'center'
			}]} >
				<Text style={{
					fontSize: 20,
					fontFamily: 'Montserrat_700Bold'
				}}>Soyez prudent sur la route</Text>
			</Animated.View>
		</GestureRecognizer>
	);
}

function SecondTimeScreen({ navigation }) {//*************************************************************** */

	const offset = useSharedValue(-1);
	offset.value = -1;
	const animatedStyles = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: withSpring(offset.value * 255, {
						damping: 10,
						stiffness: 50,
					}),
				},
			],
		};
	});

	const offsetLogo = useSharedValue(-.215);
	offsetLogo.value = -.215;
	const animatedStylesLogo = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: withSpring(offsetLogo.value * 255, {
						damping: 10,
						stiffness: 50,
					}),
				},
			],
		};
	});
	setTimeout(() => {
		offsetLogo.value = -2
	}, 1000)
	setTimeout(() => {
		offset.value = 0
	}, 1500)
	setTimeout(() => {
		offset.value = 1
	}, 3000)
	setTimeout(() => {
		navigation.navigate('Home')
	}, 3500)




	return (
		<View style={{
			flex: 1,
			backgroundColor: '#F7F5FF',
			alignItems: 'center',
			justifyContent: 'center',
		}}>

			<Animated.View style={[animatedStylesLogo, {
				position: 'absolute',
				top: 270
			}]}
			>
				<Image source={require('./assets/Logo.png')} style={{
					width: 215,
					height: 110
				}}></Image>
			</Animated.View>


			<Animated.View style={
				[animatedStyles, {
				}]} >
				<LottieView source={require('./src/animation.json')} autoPlay loop
					style={{
						width: 200
					}}
				/>
			</Animated.View>
		</View >
	);
}


export default function App() {//*************************************************************** */
	// LOADING FONT -----------------
	let [fontsLoaded] = useFonts({
		Montserrat_400Regular,
		Montserrat_700Bold
	});
	// ------------------------------

	const [ip_adress, setIp_adress] = useState([])
	const [booleanAffichage, setBooleanAffichage] = useState([])


	function FetchData() {
		Network.getIpAddressAsync()
			.then((response1) => {
				setIp_adress(response1)
				fetch('http://172.104.143.60:9000/api/user/' + response1)
					.then((response) => {
						if (response.status == 200) {
							setBooleanAffichage(true)
						} else {
							setBooleanAffichage(false)
							axios.post('http://172.104.143.60:9000/api/user/', {
								ip_adress: response1
							}).then((response) => console.log("posted"))
						}
					})
			})

	}

	useEffect(() => {
		FetchData()
	}, [])

	const Stack = createNativeStackNavigator();

	// Check if font are loaded before displaying components
	if (!fontsLoaded && !booleanAffichage) {
		return <AppLoading />;
	} else {
		if (booleanAffichage === false) {
			return (
				<NavigationContainer>
					<Stack.Navigator initialRouteName="FirstScreen" >
						<Stack.Screen name="FirstScreen" component={FirstTimeScreen} options={{ header: null, headerShown: false, }} />
						<Stack.Screen name="SecondScreen" component={SecondTimeScreen} options={{ header: null, headerShown: false, }} />
						<Stack.Screen name="Home" component={HomeScreen} options={{ header: null, headerShown: false, }} />
					</Stack.Navigator>
				</NavigationContainer>
			)
		} else if (booleanAffichage === true) {
			return (
				<NavigationContainer>
					<Stack.Navigator initialRouteName="SecondScreen" >
						<Stack.Screen name="FirstScreen" component={FirstTimeScreen} options={{ header: null, headerShown: false, }} />
						<Stack.Screen name="SecondScreen" component={SecondTimeScreen} options={{ header: null, headerShown: false, }} />
						<Stack.Screen name="Home" component={HomeScreen} options={{ header: null, headerShown: false, }} />
					</Stack.Navigator>
				</NavigationContainer>
			);
		} else {
			return <AppLoading />;
		}

	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F7F5FF',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	map: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height + 100,
	}
});