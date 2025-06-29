# 🌙 Moongirl

[![License](https://img.shields.io/badge/license-MIT-purple.svg)](LICENSE)
[![Made with React Native](https://img.shields.io/badge/Mobile-App-blueviolet)]()
[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-orange)]()

Segurança pessoal pensada para mulheres.  
Aplicativo mobile para situações de emergência com **localização em tempo real**, **alertas rápidos** e **gravações seguras**.

---

## 📚 Tabela de Conteúdo

- [📱 Sobre o App](#-sobre-o-app)
- [🔐 Funcionalidades](#-funcionalidades)
- [🛰️ Funcionalidades Futuras](#️-funcionalidades-futuras)
- [🛠️ Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [⚙️ Como Rodar o Projeto Localmente](#️-como-rodar-o-projeto-localmente)
- [🤝 Contribuindo](#-contribuindo)
- [📸 Demonstrações](#-demonstrações)
- [📄 Licença](#-licença)

---

## 📱 Sobre o App

**Moongirl** é um aplicativo desenvolvido para aumentar a segurança de mulheres, oferecendo recursos emergenciais como:

- Envio de localização atual via **WhatsApp**
- Disparo de alertas rápidos para **contatos de confiança (os Guardiões)**
- Gravação de **áudios locais** em situações suspeitas

A proposta é oferecer um apoio silencioso e rápido em situações de risco, com foco em acessibilidade e facilidade de uso.

---

## 🔐 Funcionalidades

| Funcionalidade             | Descrição                                                                 |
|---------------------------|---------------------------------------------------------------------------|
| 📍 Compartilhamento de Localização | Envie sua localização atual com um único toque pelo WhatsApp                 |
| 🚨 Botão de Emergência     | Alerta instantâneo para os Guardiões cadastrados via mensagem             |
| 🛡️ Cadastro de Guardiões  | Adicione e gerencie seus contatos de confiança                            |
| 🎙️ Gravação de Áudio      | Grave áudios locais em situações de perigo, armazenados de forma segura   |

---

## 🛰️ Funcionalidades Futuras

- Envio **contínuo e automático** da localização
- Envio de **áudios por e-mail** para backup externo
- Integração com **serviços de emergência locais**
- Modo invisível para chamadas de socorro discretas
- Reconhecimento de palavra-chave para ativar alerta por voz

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia              | Descrição                                   |
|------------------------|---------------------------------------------|
| ⚛️ React Native + Expo | Estrutura principal do app mobile           |
| 📍 Expo Location       | Acesso à localização do dispositivo         |
| 🎙️ expo-av             | Gravação e controle de áudio                |
| 💾 AsyncStorage        | Armazenamento local e persistente           |
| 🧭 React Navigation    | Navegação entre as telas do aplicativo      |
| 📦 Firebase (opcional) | Backend para armazenar Guardiões/Alertas    |

---

## ⚙️ Como Rodar o Projeto Localmente

### 🔧 Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### 🚀 Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/moongirl.git

# 2. Acesse o diretório
cd moongirl

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
expo start
