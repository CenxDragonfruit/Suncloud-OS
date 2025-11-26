# ☁️ Suncloud OS: Web-based Operating System Environment

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/CenxDragonfruit/Suncloud-OS/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)

---

## 🌟 Visão Geral do Projeto

O **Suncloud OS** é um ambiente de sistema operacional baseado em navegador (Web-based Operating System Environment - WbOSE) que visa unificar a experiência de computação pessoal e profissional em uma única interface acessível via web.

Construído com uma arquitetura modular e moderna, o Suncloud OS simula a familiar metáfora de desktop (janelas, barra de tarefas, ícones) para fornecer um ecossistema de aplicações integradas, com foco em **Inteligência Artificial (IA)**, **Internet das Coisas (IoT)** e **Produtividade**.

### 🚀 Principais Características

*   **Arquitetura Modular:** Cada aplicação é um módulo independente, facilitando a manutenção e a escalabilidade.
*   **Experiência de Desktop:** Gerenciamento de janelas, barra de tarefas e menu iniciar reativos.
*   **Stack Tecnológica Moderna:** Desenvolvido com React, TypeScript e Vite para alta performance.
*   **Design System Consistente:** Utiliza Tailwind CSS e shadcn-ui para uma interface de usuário coesa e acessível.
*   **Ecossistema de Apps Expansivo:** Inclui módulos de produtividade, multimídia, sistema e integração com IoT/IA.

---

## 🛠️ Stack Tecnológica

O projeto Suncloud OS é construído sobre uma fundação robusta de tecnologias de frontend:

| Categoria | Tecnologia | Descrição |
| :--- | :--- | :--- |
| **Framework** | [**React**](https://reactjs.org/) | Biblioteca principal para a construção da interface de usuário. |
| **Linguagem** | [**TypeScript**](https://www.typescriptlang.org/) | Adiciona tipagem estática para maior segurança e manutenibilidade do código. |
| **Build Tool** | [**Vite**](https://vitejs.dev/) | Ferramenta de build de nova geração para desenvolvimento rápido e otimizado. |
| **Estilização** | [**Tailwind CSS**](https://tailwindcss.com/) | Framework CSS *utility-first* para design rápido e responsivo. |
| **Componentes UI** | [**shadcn-ui**](https://ui.shadcn.com/) | Componentes de UI acessíveis e reutilizáveis, construídos com Radix UI. |
| **Estado de Servidor** | [**React Query**](https://tanstack.com/query/latest) | Gerenciamento de caching, sincronização e atualização de dados remotos. |
| **Roteamento** | [**React Router DOM**](https://reactrouter.com/en/main) | Roteamento declarativo para navegação entre as "páginas" do sistema. |

---

## ⚙️ Instalação e Configuração

Para configurar o ambiente de desenvolvimento local, siga os passos abaixo.

### Pré-requisitos

Certifique-se de ter o **Node.js** (versão LTS recomendada) e o **npm** (ou `yarn`/`pnpm`) instalados em sua máquina.

### Passos de Instalação

1.  **Clone o Repositório:**

    ```bash
    git clone https://github.com/CenxDragonfruit/Suncloud-OS.git
    cd Suncloud-OS
    ```

2.  **Instale as Dependências:**

    ```bash
    npm install
    # ou pnpm install
    # ou yarn install
    ```

3.  **Inicie o Servidor de Desenvolvimento:**

    ```bash
    npm run dev
    ```

    O Suncloud OS estará acessível em `http://localhost:8080` (ou a porta indicada pelo Vite).

---

## 📂 Estrutura do Projeto

A estrutura de diretórios é organizada para refletir a modularidade do sistema:

```
Suncloud-OS/
├── public/                 # Ativos estáticos (ícones, imagens, vídeos, áudio)
├── src/
│   ├── components/         # Componentes de UI reutilizáveis
│   │   ├── apps/           # Módulos de cada aplicação (AIChat, FileExplorer, etc.)
│   │   ├── ui/             # Componentes base do shadcn-ui (botões, diálogos, etc.)
│   │   ├── Desktop.tsx     # O "kernel" do WbOSE: Gerenciador de Janelas e Ícones
│   │   └── Taskbar.tsx     # Barra de tarefas e flyouts de sistema
│   ├── contexts/           # Provedores de Contexto (Ex: SystemContext para eventos globais)
│   ├── hooks/              # Hooks customizados
│   ├── lib/                # Funções utilitárias genéricas (Ex: utils.ts)
│   ├── pages/              # Componentes de rota (Index.tsx, NotFound.tsx)
│   └── App.tsx             # Configuração de roteamento e provedores
├── package.json            # Dependências e scripts do projeto
├── tailwind.config.ts      # Configuração de estilos e temas
└── vite.config.ts          # Configuração do build e aliases
```

---

## 🧩 Módulos de Aplicação (Apps)

O Suncloud OS é composto por um rico ecossistema de aplicações. Cada módulo é um componente React que é renderizado dentro de um container de janela (`Window.tsx`).

| ID | Nome da Aplicação | Arquivo | Categoria |
| :--- | :--- | :--- | :--- |
| `dashboard` | **SmartDashboard** | `SmartDashboard.tsx` | IoT/Sistema |
| `browser` | **Navegador** | `Browser.tsx` | Utilidade |
| `files` | **Arquivos** | `FileExplorer.tsx` | Sistema/Produtividade |
| `cloud` | **Cloud Drive** | `CloudDrive.tsx` | Armazenamento em Nuvem |
| `settings` | **Configurações** | `Settings.tsx` | Sistema |
| `aichat` | **IA Chat** | `AIChat.tsx` | Inteligência Artificial |
| `terminal` | **Terminal** | `Terminal.tsx` | Sistema/CLI Simulado |
| `gallery` | **Galeria** | `Gallery.tsx` | Multimídia |
| `docs` | **Documentos** | `Documents.tsx` | Produtividade |
| `mail` | **Email** | `Email.tsx` | Produtividade |
| `calendar` | **Calendário** | `CalendarApp.tsx` | Produtividade |
| `music` | **Música** | `Music.tsx` | Multimídia |
| `video` | **Vídeos** | `Video.tsx` | Multimídia |
| `power` | **SmartPower** | `SmartPower.tsx` | IoT/Energia |
| `eco` | **EcoSense** | `EcoSense.tsx` | Sustentabilidade |
| `skylink` | **SkyLink** | `SkyLink.tsx` | Conectividade |
| `synthwork` | **SynthWork** | `SynthWork.tsx` | Multimídia/Criação |
| `sound` | **SoundSphere** | `SoundSphere.tsx` | Multimídia/Áudio |
| `timevault` | **TimeVault** | `TimeVault.tsx` | Sistema/Backup |

---

## 🤝 Contribuição

Contribuições são bem-vindas! Se você deseja contribuir para o Suncloud OS, siga estas diretrizes:

1.  **Fork** o repositório.
2.  Crie uma nova *branch* para sua funcionalidade (`git checkout -b feature/sua-funcionalidade`).
3.  Implemente suas mudanças e garanta que o código esteja tipado (TypeScript) e formatado.
4.  Execute o *linting* (`npm run lint`) para verificar a qualidade do código.
5.  Faça o *commit* de suas alterações (`git commit -m 'feat: Adiciona nova funcionalidade X'`).
6.  Envie para a *branch* (`git push origin feature/sua-funcionalidade`).
7.  Abra um **Pull Request** detalhado.

---

## 📄 Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](https://github.com/CenxDragonfruit/Suncloud-OS/blob/main/LICENSE) para mais detalhes.

**Desenvolvido com 💙 por [Manus AI]**
*Baseado no repositório CenxDragonfruit/Suncloud-OS.*
