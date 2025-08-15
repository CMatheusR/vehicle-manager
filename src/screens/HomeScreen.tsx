import React, { useState } from 'react';
import { View, FlatList, TextInput, TouchableOpacity, Text, StyleSheet, StatusBar, Animated } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { getVehicles, Vehicle, deleteVehicle } from '../services/api';
import VehicleItem from '../components/VehicleItem';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filter, setFilter] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));

  const load = async () => {
    const { data } = await getVehicles();
    setVehicles(data);
  };

  useFocusEffect(
    React.useCallback(() => {
      load();
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }, [])
  );

  const filtered = vehicles.filter(v => {
    if (!filter.trim()) return true;
    
    const searchTerms = filter.toLowerCase().trim().split(/\s+/);
    
    return searchTerms.every(term => {
      return (
        (v.marca && v.marca.toLowerCase().includes(term)) ||
        (v.modelo && v.modelo.toLowerCase().includes(term)) ||
        (v.ano && v.ano.toString().includes(term)) ||
        (v.cor && v.cor.toLowerCase().includes(term)) ||
        (v.placa && v.placa.toLowerCase().includes(term))
      );
    });
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <View style={styles.headerContent}>
          <View style={styles.titleContainer}>
            <View style={styles.iconContainer}>
              <Ionicons name="car-sport" size={32} color="#fff" />
            </View>
            <View>
              <Text style={styles.title}>Meus Veículos</Text>
              <Text style={styles.subtitle}>{filtered.length} veículo{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}</Text>
            </View>
          </View>
        </View>
      </Animated.View>

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.searchContainer}>
          <View style={styles.searchIconContainer}>
            <Ionicons name="search" size={20} color="#667eea" />
          </View>
          <TextInput
            placeholder="Buscar: Ford 2025, Civic branco, ABC1234..."
            value={filter}
            onChangeText={setFilter}
            style={styles.searchInput}
            placeholderTextColor="#a0aec0"
          />
          {filter.length > 0 && (
            <TouchableOpacity onPress={() => setFilter('')} style={styles.clearButton}>
              <Ionicons name="close-circle" size={20} color="#a0aec0" />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('Add')}
          activeOpacity={0.8}
        >
          <View style={styles.addButtonGradient}>
            <Ionicons name="add" size={24} color="#fff" />
            <Text style={styles.addButtonText}>Novo Veículo</Text>
          </View>
        </TouchableOpacity>

        <FlatList
          data={filtered}
          keyExtractor={item => String(item.id)}
          renderItem={({ item, index }) => (
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [{
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  })
                }]
              }}
            >
              <VehicleItem
                vehicle={item}
                onPress={() => navigation.navigate('Detail', { id: item.id! })}
                onDelete={async () => { await deleteVehicle(item.id!); load(); }}
                onEdit={() => navigation.navigate('Edit', { id: item.id! })}
              />
            </Animated.View>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <Animated.View style={[styles.emptyContainer, { opacity: fadeAnim }]}>
              <View style={styles.emptyIconContainer}>
                <Ionicons name="car-outline" size={64} color="#cbd5e0" />
              </View>
              <Text style={styles.emptyText}>
                {filter.length > 0 ? 'Nenhum veículo encontrado' : 'Nenhum veículo cadastrado'}
              </Text>
              <Text style={styles.emptySubtext}>
                {filter.length > 0 ? 'Tente ajustar sua busca' : 'Adicione seu primeiro veículo'}
              </Text>
            </Animated.View>
          }
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7fafc',
  },
  header: {
    backgroundColor: '#667eea',
    paddingTop: 60,
    paddingBottom: 30,
    shadowColor: '#667eea',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerContent: {
    paddingHorizontal: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  searchIconContainer: {
    backgroundColor: '#f7fafc',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#2d3748',
    fontWeight: '500',
  },
  clearButton: {
    padding: 4,
  },
  addButton: {
    marginBottom: 20,
    borderRadius: 16,
    shadowColor: '#667eea',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  addButtonGradient: {
    backgroundColor: '#667eea',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
  listContainer: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyIconContainer: {
    backgroundColor: '#f7fafc',
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#a0aec0',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 16,
    color: '#cbd5e0',
    textAlign: 'center',
    lineHeight: 24,
  },
});