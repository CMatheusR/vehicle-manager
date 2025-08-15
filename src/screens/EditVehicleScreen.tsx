import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { View, TextInput, Alert, Text, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Vehicle, getVehicle, updateVehicle } from '../services/api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Edit'>;

interface FieldProps {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  keyboardType?: 'default' | 'numeric';
  value: string;
  onChangeText: (t: string) => void;
  onBlur: () => void;
  placeholder?: string;
}

const Field = React.memo(({ label, icon, keyboardType, value, onChangeText, onBlur, placeholder }: FieldProps) => {
  const hasError = value.trim().length === 0;
  return (
    <View style={[styles.field, hasError && styles.fieldError]}>
      <Ionicons name={icon} size={20} color={hasError ? '#e53e3e' : '#718096'} style={styles.fieldIcon} />
      <View style={styles.fieldContent}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          placeholder={placeholder}
          placeholderTextColor="#a0aec0"
          keyboardType={keyboardType}
          style={styles.input}
          returnKeyType="next"
        />
      </View>
    </View>
  );
});

export default function EditVehicleScreen({ route, navigation }: Props) {
  const { id } = route.params;
  const [form, setForm] = useState<Vehicle | null>(null);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVehicle(id).then(r => setForm(r.data)).finally(() => setLoading(false));
  }, [id]);

  const isValid = useMemo(() => {
    if (!form) return false;
    return Boolean(
      form.placa && form.marca && form.modelo && form.cor &&
      String(form.ano).length === 4 && Number(form.ano) >= 1900 && Number(form.ano) <= new Date().getFullYear() + 1
    );
  }, [form]);

  const setField = useCallback((key: keyof Vehicle, value: string | number) => {
    setForm(prev => prev ? ({ ...prev, [key]: value } as Vehicle) : prev);
  }, []);

  const onSave = useCallback(async () => {
    if (!form || !isValid) {
      return Alert.alert('Erro', 'Verifique os campos obrigatórios.');
    }
    await updateVehicle(id, {
      ...form,
      placa: form.placa.trim().toUpperCase(),
      marca: form.marca.trim(),
      modelo: form.modelo.trim(),
      cor: form.cor.trim(),
      ano: Number(form.ano),
    });
    navigation.goBack();
  }, [form, isValid, id, navigation]);

  const handleBlur = useCallback((fieldName: string) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
  }, []);

  if (loading || !form) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#667eea" />
        <Text style={styles.loadingText}>Carregando veículo...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Editar Veículo</Text>
          <Text style={styles.subtitle}>Atualize os dados abaixo e salve</Text>

          <Field
            label="Placa"
            icon="pricetag"
            value={form.placa}
            onChangeText={(t) => setField('placa', t.toUpperCase())}
            onBlur={() => handleBlur('Placa')}
            placeholder="ABC1D23"
          />

          <Field
            label="Marca"
            icon="business"
            value={form.marca}
            onChangeText={(t) => setField('marca', t)}
            onBlur={() => handleBlur('Marca')}
            placeholder="Ex: Honda"
          />

          <Field
            label="Modelo"
            icon="car-sport"
            value={form.modelo}
            onChangeText={(t) => setField('modelo', t)}
            onBlur={() => handleBlur('Modelo')}
            placeholder="Ex: Civic"
          />

          <View style={styles.fieldGroupRow}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Field
                label="Ano"
                icon="calendar"
                keyboardType="numeric"
                value={String(form.ano)}
                onChangeText={(t) => setField('ano', Number(t.replace(/[^0-9]/g, '')))}
                onBlur={() => handleBlur('Ano')}
                placeholder="2024"
              />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Field
                label="Cor"
                icon="color-palette"
                value={form.cor}
                onChangeText={(t) => setField('cor', t)}
                onBlur={() => handleBlur('Cor')}
                placeholder="Ex: Prata"
              />
            </View>
          </View>

        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            onPress={onSave}
            disabled={!isValid}
            style={[styles.saveButton, !isValid && styles.saveButtonDisabled]}
          >
            <Ionicons name="save" size={20} color="#fff" />
            <Text style={styles.saveButtonText}>Salvar alterações</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    backgroundColor: '#f7fafc',
  },
  scroll: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2d3748',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
    marginBottom: 32,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 24,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  fieldError: {
    borderColor: '#e53e3e',
    shadowColor: '#e53e3e',
    shadowOpacity: 0.1,
  },
  fieldIcon: {
    marginRight: 12,
    width: 28,
    textAlign: 'center',
  },
  fieldContent: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 12,
    color: '#718096',
    marginBottom: 6,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    fontSize: 16,
    color: '#2d3748',
    fontWeight: '600',
  },
  fieldGroupRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  footer: {
    padding: 20,
    backgroundColor: '#f7fafc',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#667eea',
    paddingVertical: 18,
    borderRadius: 16,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    gap: 8,
  },
  saveButtonDisabled: {
    backgroundColor: '#a3b1f5',
    shadowOpacity: 0.1,
    elevation: 2,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 8,
  },
});