import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Dimensions, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Vehicle } from '../services/api';

interface Props {
  vehicle: Vehicle;
  onPress: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

const { width } = Dimensions.get('window');

export default function VehicleItem({ vehicle, onPress, onDelete, onEdit }: Props) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeletePress = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setShowDeleteModal(false);
    onDelete();
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <View style={styles.card}>
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.titleContainer}>
                <View style={styles.iconContainer}>
                  <Ionicons name="car-sport" size={24} color="#fff" />
                </View>
                <View>
                  <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                    {vehicle.marca} {vehicle.modelo}
                  </Text>
                  <Text style={styles.subtitle} numberOfLines={1} ellipsizeMode="tail">
                    {vehicle.ano}
                  </Text>
                </View>
              </View>
              <View style={styles.plateContainer}>
                <Text style={styles.plate}>{vehicle.placa}</Text>
              </View>
            </View>
            
            <View style={styles.details}>
              <View style={styles.detailItem}>
                <Ionicons name="color-palette" size={16} color="#667eea" style={styles.icon} />
                <Text style={styles.detailText}>{vehicle.cor}</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.actions}>
            <TouchableOpacity onPress={onEdit} style={styles.editButton}>
              <Ionicons name="create" size={16} color="#667eea" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDeletePress} style={styles.deleteButton}>
              <Ionicons name="trash" size={16} color="#e53e3e" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>

      {/* Modal de Confirmação de Exclusão */}
      <Modal
        visible={showDeleteModal}
        transparent={true}
        animationType="fade"
        onRequestClose={cancelDelete}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIcon}>
              <Ionicons name="warning" size={48} color="#e53e3e" />
            </View>
            <Text style={styles.modalTitle}>Confirmar Exclusão</Text>
            <Text style={styles.modalMessage}>
              Tem certeza que deseja excluir este veículo?
            </Text>

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

            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={cancelDelete} style={[styles.modalButton, styles.cancelButton]}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmDelete} style={[styles.modalButton, styles.confirmButton]}>
                <Text style={styles.confirmButtonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#667eea',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    minWidth: 0,
  },
  content: {
    flex: 1,
    minWidth: 0, // Importante para flex funcionar corretamente
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    minWidth: 0, // Importante para flex funcionar corretamente
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
    minWidth: 0, // Importante para flex funcionar corretamente
  },
  iconContainer: {
    backgroundColor: '#667eea',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 18,
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: 2,
    flex: 1,
    minWidth: 0, // Importante para flex funcionar corretamente
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#718096',
    flex: 1,
    minWidth: 0, // Importante para flex funcionar corretamente
  },
  plateContainer: {
    backgroundColor: '#667eea',
    paddingHorizontal: 14,
    paddingVertical: 8,
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
    flexShrink: 0,
    minWidth: 90,
  },
  plate: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 2,
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  details: {
    marginTop: 4,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  detailText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4a5568',
    textTransform: 'capitalize',
  },
  actions: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 12,
    gap: 8,
    flexShrink: 0,
    minWidth: 40, // Largura mínima para os botões
  },
  editButton: {
    backgroundColor: '#f7fafc',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#667eea',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  deleteButton: {
    backgroundColor: '#fef2f2',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fecaca',
    shadowColor: '#e53e3e',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 320,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 20,
  },
  modalIcon: {
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2d3748',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalMessage: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cancelButton: {
    backgroundColor: '#f7fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  confirmButton: {
    backgroundColor: '#e53e3e',
  },
  cancelButtonText: {
    color: '#718096',
    fontSize: 16,
    fontWeight: '700',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
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
});