import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import styles from "../styles/Settings.module.css";

import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";

import {
  FaUser,
  FaBell,
  FaCog,
  FaLock,
  FaPalette,
  FaWifi,
  FaMobileAlt,
  FaGlobe,
  FaKey,
  FaInfoCircle,
} from "react-icons/fa";

export default function Settings() {
  const router = useRouter();

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);      // drawer mobile
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // colapsada desktop

  // ✅ Proteção de rota igual ao Home
  useEffect(() => {
    const token = Cookies.get("token") || localStorage.getItem("token");

    if (!token) {
      router.replace("/"); // volta pro login
    } else {
      setIsCheckingAuth(false);
    }
  }, [router]);

  // Tela de loading enquanto verifica auth
  if (isCheckingAuth) {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.spinner}></div>
        <p>Verificando acesso...</p>
      </div>
    );
  }

  const toggleSidebar = () => {
    const isMobileView =
      typeof window !== "undefined" && window.innerWidth <= 1024;

    if (isMobileView) {
      setIsSidebarOpen((prev) => !prev); // abre/fecha drawer
    } else {
      setIsSidebarCollapsed((prev) => !prev); // colapsa/expande
    }
  };

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className={styles.dashboard}>
   
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        isCollapsed={isSidebarCollapsed}
      />
      

      
      <main
        className={styles.mainContent}
        data-sidebar-collapsed={isSidebarCollapsed}
      >
          <Header
          onMenuClick={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          isSidebarCollapsed={isSidebarCollapsed}
        />
       
        <div className={styles.container}>
          <h1 className={styles.title}>
            <FaCog /> Configurações
          </h1>

          <div className={styles.grid}>
            <Card title="Conta" icon={<FaUser />}>
              Gerencie seu perfil, email e dados pessoais.
            </Card>

            <Card title="Notificações" icon={<FaBell />}>
              Ajuste alertas, sons e preferências gerais.
            </Card>

            <Card title="Segurança" icon={<FaLock />}>
              Controle de privacidade, senhas e permissões.
            </Card>

            <Card title="Tema e Aparência" icon={<FaPalette />}>
              Personalize cores, temas e aparência geral.
            </Card>

            <Card title="Rede" icon={<FaWifi />}>
              Informações de conexão e configurações de internet.
            </Card>

            <Card title="Dispositivos" icon={<FaMobileAlt />}>
              Gerencie dispositivos conectados.
            </Card>

            <Card title="Idioma" icon={<FaGlobe />}>
              Alterar idioma do sistema.
            </Card>

            <Card title="Senhas" icon={<FaKey />}>
              Atualização de senhas e chaves de acesso.
            </Card>

            <Card title="Sobre" icon={<FaInfoCircle />}>
              Informações do aplicativo, versão e termos.
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

function Card(props) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.icon}>{props.icon}</span>
        <h2 className={styles.cardTitle}>{props.title}</h2>
      </div>
      <p className={styles.cardText}>{props.children}</p>
    </div>
  );
}
