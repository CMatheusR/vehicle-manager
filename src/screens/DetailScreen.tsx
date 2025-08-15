import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { getVehicle, Vehicle, deleteVehicle } from '../services/api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function DetailScreen({ route, navigation }: Props) {
  const { id } = route.params;
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const loadVehicle = async () => {
    setLoading(true);
    try {
      const response = await getVehicle(id);
      setVehicle(response.data);
    } catch (error) {
      setVehicle(null);
    } finally {
      setLoading(false);
    }
  };

  // Carregar dados iniciais
  useEffect(() => {
    loadVehicle();
  }, [id]);

  // Recarregar sempre que a tela receber foco (após edição)
  useFocusEffect(
    React.useCallback(() => {
      loadVehicle();
    }, [id])
  );

  const handleDelete = async () => {
    if (!vehicle) return;
    
    try {
      await deleteVehicle(vehicle.id!);
      setShowDeleteModal(false);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível excluir o veículo.');
    }
  };

  const confirmDelete = () => {
    setShowDeleteModal(true);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#667eea" />
        <Text style={styles.loadingText}>Carregando veículo...</Text>
      </View>
    );
  }

  if (!vehicle) {
    return (
      <View style={styles.loadingContainer}>
        <Ionicons name="alert-circle" size={48} color="#e53e3e" />
        <Text style={styles.loadingText}>Veículo não encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <View style={styles.iconCircle}>
              <Ionicons name="car-sport" size={24} color="#fff" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{vehicle.marca} {vehicle.modelo}</Text>
              <Text style={styles.subtitle}>{vehicle.ano}</Text>
            </View>
          </View>
          <View style={styles.plateBadge}>
            <Text style={styles.plateText}>{vehicle.placa}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.detailRow}>
          <Ionicons name="business" size={18} color="#718096" style={styles.detailIcon} />
          <Text style={styles.detailLabel}>Marca</Text>
          <Text style={styles.detailValue}>{vehicle.marca}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="car-sport" size={18} color="#718096" style={styles.detailIcon} />
          <Text style={styles.detailLabel}>Modelo</Text>
          <Text style={styles.detailValue}>{vehicle.modelo}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="calendar" size={18} color="#718096" style={styles.detailIcon} />
          <Text style={styles.detailLabel}>Ano</Text>
          <Text style={styles.detailValue}>{vehicle.ano}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="color-palette" size={18} color="#718096" style={styles.detailIcon} />
          <Text style={styles.detailLabel}>Cor</Text>
          <Text style={styles.detailValue}>
            {vehicle.cor?.toString().length ? vehicle.cor : '-'}
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('Edit', { id })}
        >
          <Ionicons name="create" size={20} color="#fff" />
          <Text style={styles.editButtonText}>Editar veículo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={confirmDelete}
        >
          <Ionicons name="trash" size={20} color="#fff" />
          <Text style={styles.deleteButtonText}>Excluir veículo</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de Confirmação de Exclusão */}
      <Modal
        visible={showDeleteModal}
        transparent={true}
        animationType="fade"
        onRequestClose={cancelDelete}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <View style={styles.modalIconContainer}>
                <Ionicons name="warning" size={32} color="#e53e3e" />
              </View>
              <Text style={styles.modalTitle}>Confirmar Exclusão</Text>
              <Text style={styles.modalSubtitle}>
                Tem certeza que deseja excluir este veículo?
              </Text>
            </View>

            <View style={styles.vehicleInfo}>
              <Text style={styles.vehicleTitle}>{vehicle.marca} {vehicle.modelo}</Text>
              <Text style={styles.vehiclePlate}>{vehicle.placa}</Text>
              <Text style={styles.vehicleDetails}>
                {vehicle.ano} • {vehicle.cor}
              </Text>
            </View>

            <View style={styles.modalWarning}>
              <Ionicons name="alert-circle" size={16} color="#e53e3e" />
              <Text style={styles.modalWarningText}>
                Esta ação não pode ser desfeita.
              </Text>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity onPress={cancelDelete} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDelete} style={styles.confirmDeleteButton}>
                <Ionicons name="trash" size={16} color="#fff" />
                <Text style={styles.confirmDeleteButtonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7fafc',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 12,
    borderWidth: 1,
    borderColor: '#edf2f7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 12,
  },
  iconCircle: {
    backgroundColor: '#667eea',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    shadowColor: '#667eea',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2d3748',
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
    marginTop: 4,
    fontWeight: '600',
  },
  plateBadge: {
    backgroundColor: '#667eea',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    shadowColor: '#667eea',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  plateText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 2,
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  divider: {
    height: 2,
    backgroundColor: '#e2e8f0',
    marginVertical: 16,
    borderRadius: 1,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f7fafc',
    borderRadius: 12,
  },
  detailIcon: {
    marginRight: 12,
    width: 24,
    textAlign: 'center',
  },
  detailLabel: {
    width: 80,
    color: '#718096',
    fontWeight: '700',
    fontSize: 14,
    marginRight: 12,
  },
  detailValue: {
    flex: 1,
    color: '#2d3748',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonContainer: {
    marginTop: 24,
    gap: 16,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#667eea',
    borderRadius: 16,
    paddingVertical: 18,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 8,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e53e3e',
    borderRadius: 16,
    paddingVertical: 18,
    shadowColor: '#e53e3e',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7fafc',
  },
  loadingText: {
    marginTop: 12,
    color: '#718096',
    fontWeight: '600',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  modalIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fef2f2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 20,
  },
  vehicleInfo: {
    backgroundColor: '#f7fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  vehicleTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: 4,
  },
  vehiclePlate: {
    fontSize: 18,
    fontWeight: '800',
    color: '#667eea',
    marginBottom: 4,
    letterSpacing: 2,
    fontFamily: 'monospace',
    textAlign: 'center',
  },
  vehicleDetails: {
    fontSize: 14,
    color: '#718096',
    fontWeight: '500',
  },
  modalWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  modalWarningText: {
    fontSize: 13,
    color: '#e53e3e',
    fontWeight: '600',
    marginLeft: 8,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f7fafc',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4a5568',
  },
  confirmDeleteButton: {
    flex: 1,
    backgroundColor: '#e53e3e',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  confirmDeleteButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});