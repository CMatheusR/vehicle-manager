# 🚗 Vehicle Manager

Um aplicativo móvel moderno para gerenciamento de veículos, desenvolvido com React Native e Expo. Permite cadastrar, editar, visualizar e excluir veículos com uma interface elegante e intuitiva.

## ✨ Características

- **Interface Moderna**: Design limpo e responsivo otimizado para mobile
- **CRUD Completo**: Criar, visualizar, editar e excluir veículos
- **Busca Inteligente**: Filtro avançado por múltiplos critérios (marca, modelo, ano, cor, placa) com busca por espaços
- **Validação de Dados**: Campos obrigatórios e validação de formato
- **Modal de Confirmação**: Exclusão segura com confirmação
- **Navegação Fluida**: Transições suaves entre telas
- **Responsivo**: Funciona em diferentes tamanhos de tela
- **Dados Persistentes**: API REST com JSON Server
- **Animações Suaves**: Transições e efeitos visuais modernos
- **Design System**: Paleta de cores consistente e tipografia moderna
- **Sombras e Elevação**: Efeitos visuais profundos e elegantes
- **Ícones Integrados**: Biblioteca Ionicons para interface intuitiva

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma de desenvolvimento e build
- **TypeScript** - Tipagem estática para JavaScript
- **React Navigation** - Navegação entre telas
- **Expo Vector Icons** - Ícones da biblioteca Ionicons
- **Animated API** - Animações nativas e suaves

### Backend
- **JSON Server** - API REST simulada
- **Axios** - Cliente HTTP para requisições

### Estilização
- **StyleSheet** - Estilos nativos do React Native
- **Flexbox** - Layout responsivo
- **Shadow Properties** - Efeitos de sombra e elevação
- **Color Palette** - Paleta de cores consistente (#667eea, #f7fafc, etc.)

## 📱 Telas do Aplicativo

### 1. Home Screen
- Lista de veículos cadastrados com animações
- Barra de busca avançada com múltiplos critérios (marca, modelo, ano, cor, placa)
- Busca inteligente por espaços (ex: "Ford 2025", "Civic branco")
- Botão para adicionar novo veículo com gradiente
- Cards elegantes com sombras e efeitos
- Botões de edição e exclusão direta
- Estado vazio com ícone e mensagens informativas

### 2. Add Vehicle Screen
- Formulário para cadastro de veículos
- Campos: Placa, Marca, Modelo, Ano, Cor
- Validação em tempo real com feedback visual
- Interface moderna com ícones e labels
- Botão de salvar com gradiente e sombra

### 3. Edit Vehicle Screen
- Formulário pré-preenchido com dados do veículo
- Mesma validação da tela de adição
- Atualização automática após edição
- Design consistente com a tela de adição

### 4. Detail Screen
- Visualização completa dos dados do veículo
- Layout elegante com informações organizadas
- Botões para editar ou excluir com gradientes
- Placa destacada com design especial

## 🎨 Design System

### Cores Principais
- **Primária**: `#667eea` (Azul/Índigo)
- **Background**: `#f7fafc` (Cinza claro)
- **Texto**: `#2d3748` (Cinza escuro)
- **Texto Secundário**: `#718096` (Cinza médio)
- **Erro**: `#e53e3e` (Vermelho)
- **Sucesso**: `#38a169` (Verde)

### Tipografia
- **Títulos**: 28px, Weight 800
- **Subtítulos**: 16px, Weight 600
- **Texto**: 16px, Weight 600
- **Labels**: 12px, Weight 700 (uppercase)

### Componentes
- **Cards**: Border radius 20px, sombras suaves
- **Botões**: Border radius 16px, gradientes
- **Inputs**: Border radius 16px, ícones integrados
- **Modais**: Border radius 24px, sombras profundas

## 🚀 Como Executar o Projeto

### Pré-requisitos

- **Node.js** (versão 16 ou superior)
- **npm** ou **yarn**
- **Expo CLI** (instalado globalmente)
- **Expo Go** (app para testar no dispositivo móvel)

### Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd vehicle-manager
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Inicie o servidor JSON (Backend)**
```bash
npm run start:server
# ou
yarn start:server
```

4. **Em outro terminal, inicie o aplicativo**
```bash
npm start
# ou
yarn start
```

### Configuração do Ambiente

1. **Instalar Expo CLI globalmente**
```bash
npm install -g @expo/cli
```

2. **Configurar o servidor**
- O servidor JSON roda na porta `3001`
- Os dados são salvos em `server/db.json`
- A API está disponível em `http://localhost:3001`

3. **Configuração do Git**
- O arquivo `.gitignore` está configurado para ignorar arquivos desnecessários
- O `server/db.json` está incluído no repositório com dados de exemplo
- Arquivos de build, cache e dependências são ignorados automaticamente

4. **Testar no dispositivo**
- Instale o app **Expo Go** no seu smartphone
- Escaneie o QR Code que aparece no terminal
- Ou use um emulador Android/iOS

## 📋 Scripts Disponíveis

```json
{
  "start": "expo start",
  "android": "expo start --android",
  "ios": "expo start --ios",
  "web": "expo start --web",
  "start:server": "json-server --watch server/db.json --port 3001"
}
```

## 🗂️ Estrutura do Projeto

```
vehicle-manager/
├── src/
│   ├── components/
│   │   └── VehicleItem.tsx          # Componente do card de veículo
│   ├── navigation/
│   │   └── index.tsx                # Configuração de navegação
│   ├── screens/
│   │   ├── HomeScreen.tsx           # Tela principal
│   │   ├── AddVehicleScreen.tsx     # Tela de adicionar
│   │   ├── EditVehicleScreen.tsx    # Tela de editar
│   │   └── DetailScreen.tsx         # Tela de detalhes
│   └── services/
│       └── api.ts                   # Configuração da API
├── server/
│   └── db.json                      # Banco de dados JSON (com dados de exemplo)
├── assets/                          # Imagens e ícones
├── App.js                           # Componente principal
├── package.json                     # Dependências
├── .gitignore                       # Arquivos ignorados pelo Git
└── README.md                        # Este arquivo
```

## 🔧 Configuração da API

O projeto usa JSON Server como backend simulado. Para configurar:

1. **Instalar JSON Server**
```bash
npm install -g json-server
```

2. **Iniciar o servidor**
```bash
json-server --watch server/db.json --port 3001
```

3. **Endpoints disponíveis**
- `GET /vehicles` - Listar todos os veículos
- `GET /vehicles/:id` - Buscar veículo por ID
- `POST /vehicles` - Criar novo veículo
- `PUT /vehicles/:id` - Atualizar veículo
- `DELETE /vehicles/:id` - Excluir veículo

## 📊 Modelo de Dados

```typescript
interface Vehicle {
  id?: number;
  placa: string;      // Placa do veículo
  marca: string;      // Marca (ex: Honda, Toyota)
  modelo: string;     // Modelo (ex: Civic, Corolla)
  ano: number;        // Ano de fabricação
  cor: string;        // Cor do veículo
}
```

## 🎨 Funcionalidades Principais

### Gerenciamento de Veículos
- ✅ Cadastrar novo veículo
- ✅ Visualizar lista de veículos
- ✅ Editar dados do veículo
- ✅ Excluir veículo com confirmação
- ✅ Busca avançada por múltiplos critérios (marca, modelo, ano, cor, placa)
- ✅ Busca inteligente por espaços (ex: "Ford 2025", "Civic branco")

### Interface do Usuário
- ✅ Design moderno e responsivo
- ✅ Animações suaves e transições
- ✅ Modal de confirmação elegante
- ✅ Validação visual de formulários
- ✅ Estados de loading e erro
- ✅ Layout adaptável para diferentes telas
- ✅ Sombras e efeitos de elevação
- ✅ Paleta de cores consistente
- ✅ Tipografia moderna e legível

### Experiência do Usuário
- ✅ Navegação intuitiva
- ✅ Feedback visual para ações
- ✅ Atualização automática de dados
- ✅ Tratamento de erros
- ✅ Interface em português
- ✅ Animações de entrada e saída
- ✅ Estados vazios informativos

## 🔍 Como Usar

### Sistema de Busca Avançada

O aplicativo possui um sistema de busca inteligente que permite filtrar veículos por múltiplos critérios:

**Como funciona:**
- Digite termos separados por espaço
- Cada termo é buscado independentemente em todos os campos
- Apenas veículos que atendem a TODOS os critérios são exibidos

**Exemplos de busca:**
- `Ford 2025` → Veículos Ford do ano 2025
- `Civic branco` → Veículos Civic da cor branca
- `ABC1234` → Veículo com placa específica
- `Toyota Corolla` → Veículos Toyota Corolla
- `2024 azul` → Veículos de 2024 da cor azul

**Campos pesquisáveis:**
- ✅ Marca (ex: Ford, Honda, Toyota)
- ✅ Modelo (ex: Civic, Corolla, Focus)
- ✅ Ano (ex: 2020, 2021, 2022)
- ✅ Cor (ex: branco, azul, vermelho)
- ✅ Placa (ex: ABC1234, XYZ5678)

1. **Adicionar Veículo**
   - Toque no botão "+ Novo Veículo"
   - Preencha todos os campos obrigatórios
   - Toque em "Salvar"

2. **Visualizar Veículos**
   - A lista aparece na tela principal
   - Use a barra de busca para filtrar por múltiplos critérios
   - Exemplos: "Ford 2025", "Civic branco", "ABC1234"
   - Cada termo separado por espaço é buscado independentemente
   - Toque em um veículo para ver detalhes

3. **Editar Veículo**
   - Toque no ícone de lápis no card
   - Ou toque no veículo e depois "Editar"
   - Modifique os dados e salve

4. **Excluir Veículo**
   - Toque no ícone de lixeira
   - Confirme a exclusão no modal
   - O veículo será removido permanentemente

## 🐛 Solução de Problemas

### Erro de Conexão com API
- Verifique se o servidor JSON está rodando na porta 3001
- Confirme se não há outro processo usando a porta

### Erro de Dependências
```bash
rm -rf node_modules
npm install
```

### Erro de Cache do Expo
```bash
expo start --clear
```

### Problemas de Layout
- O app é otimizado para telas de 320px a 428px de largura
- Em telas muito pequenas, o texto pode ser truncado com "..."
- Animações são suaves e otimizadas para performance

## 📱 Compatibilidade

- **iOS**: 12.0 ou superior
- **Android**: 5.0 (API 21) ou superior
- **Expo SDK**: 53.0.20

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

Desenvolvido com ❤️ usando React Native e Expo.

---

**Vehicle Manager** - Gerencie seus veículos de forma simples e eficiente! 🚗✨
