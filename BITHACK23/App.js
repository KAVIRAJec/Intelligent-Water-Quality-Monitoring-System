import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LineChart } from 'react-native-chart-kit'; // Import the LineChart component

const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Image
            source={require('./assets/logo.gif')} // Replace with your logo image path
            style={styles.logo}
          />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        <>
          <Text style={styles.title}>Water Quality Monitoring System</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Detail', { item: 'Water' })}
            >
              <Text style={styles.buttonText}>Water</Text>
            </TouchableOpacity>
            <TouchableOpacity
             style={styles.button}
             onPress={() => navigation.navigate('Detail', { item: 'Milk' })}
             >
              <Text style={styles.buttonText}>Milk</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Detail', { item: 'Honey' })}
            >
              <Text style={styles.buttonText}>Honey</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Detail', { item: 'Oil' })}
            >
              <Text style={styles.buttonText}>Oil</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const DetailScreen = ({ route, navigation }) => {
  const { item } = route.params;
  let parameterValue = '';
  let note = '';

  switch (item) {
    case 'Water':
      parameterValue = 'pH: 7.5\nTurbidity: 10 NTU\nTemperature: 25°C\nTDS: 200 ppm';
      note = 'The Normal range of Water contains\n pH: 7.5\n Turbidity: 10 NTU\n Temperature: 25°C\n TDS: 200 ppm';
      break;
    case 'Milk':0
      parameterValue = 'pH: 6.5\nTurbidity: 9 NTU\nTemperature: 24°C\nTDS: 190 ppm';
      note = 'The Normal range of Milk contains\n pH: 7.5\n Turbidity: 10 NTU\n Temperature: 25°C\n TDS: 200 ppm';
      break;
    case 'Honey':
      parameterValue = 'pH: 5.5\nTurbidity: 8 NTU\nTemperature: 23°C\nTDS: 180 ppm';
      note = 'The Normal range of Honey contains\n pH: 7.5\n Turbidity: 10 NTU\n Temperature: 25°C\n TDS: 200 ppm';
      break;
    case 'Oil':
      parameterValue = 'pH: 4.5\nTurbidity: 7 NTU\nTemperature: 22°C\nTDS: 170 ppm';
      note = 'The Normal range of Oil contains\n pH: 7.5\n Turbidity: 10 NTU\n Temperature: 25°C\n TDS: 200 ppm';
      break;
    default:
      parameterValue = 'No data available';
      note = 'The Normal range of NaN contains\n pH: NaN\n Turbidity: NaN\n Temperature: NaN\n TDS: NaN';
  }

  return (
    <View style={styles.detailContainer}>
      <View style={styles.detailBox}>
        <Text style={styles.detailText}>{parameterValue}</Text>
      </View>
      <View style={styles.notecontainer}>
      <Text style={styles.note}>Note:</Text>
      <Text style={styles.notetext}>{note}</Text>
      </View>
      <TouchableOpacity
        style={styles.viewGraphButton}
        onPress={() => navigation.navigate('Graph', { item })}
      >
        <Text style={styles.viewGraphButtonText}>View Graph</Text>
      </TouchableOpacity>
    </View>
  );
};

const GraphScreen = ({ route }) => {
  const { item } = route.params;

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [10, 20, 15, 25, 30, 22],
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#F4F4F4',
    backgroundGradientFrom: '#F4F4F4',
    backgroundGradientTo: '#F4F4F4',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <View style={styles.graphContainer}>
      <Text style={styles.graphText}>Graph for {item}</Text>
        <LineChart
          data={chartData}
          width={300}
          height={200}
          chartConfig={chartConfig}
        />
      </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="Graph" component={GraphScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 250,
    backgroundColor: 'black',
    borderRadius: 220,
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 22,
    color: '#555',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    flex: 0.48,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  detailContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailBox: {
    backgroundColor: '#007AFF',
    padding: 20,
    borderRadius: 10,
  },
  detailText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  notecontainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  note: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,

  },
  notetext: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  viewGraphButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  viewGraphButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // Styles for GraphScreen
  graphContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  graphText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chartContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default App;
