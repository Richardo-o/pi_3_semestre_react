import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";

import stylesHome from "../styles/Home.module.css";
import styles from "../styles/cameraView.module.css";

import {
  FaVideo,
  FaCamera,
  FaPlay,
  FaExpand,
  FaDownload,
  FaEye,
} from "react-icons/fa";

export default function CameraViewer() {
  const router = useRouter();

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  /* =============== AUTENTICAÇÃO =============== */
  useEffect(() => {
    const token = Cookies.get("token") || localStorage.getItem("token");
    if (!token) {
      router.replace("/");
    } else {
      setIsCheckingAuth(false);
    }
  }, [router]);

  if (isCheckingAuth) {
    return (
      <div className={stylesHome.loadingScreen}>
        <div className={stylesHome.spinner}></div>
        <p>Verificando acesso...</p>
      </div>
    );
  }

  /* =============== SIDEBAR (DESKTOP + MOBILE) =============== */
  const toggleSidebar = () => {
    const isMobileView =
      typeof window !== "undefined" && window.innerWidth <= 1024;
    if (isMobileView) {
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  const closeSidebar = () => setIsSidebarOpen(false);

  /* =============== MOCK DE CÂMERAS =============== */
  const cameras = [
    {
      id: 1,
      name: "Câmera Principal",
      img: "https://s2.glbimg.com/Y66qRnrgCMLz8-zYGYNPMX0UoYQ=/600x0/filters:quality(70)/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2022/X/x/sqFAM3Ra6BFwwWdRBl1A/99846016-brasil-sao-paulo-sp-13-07-2022-pink-farms-fazenda-vertical-de-producao-de-alime.jpg",
      online: true,
    },
    {
      id: 2,
      name: "Câmera Secundária",
      img: "https://img.freepik.com/fotos-premium/alface-hidroponica-crescendo-em-uma-fazenda-vertical-criada-com-ia-generativa_419341-38394.jpg",
      online: true,
    },
    {
      id: 3,
      name: "Câmera Superior",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxMpwPrcU2lHHaO63hvLmQUKEdhdvZQROroQ&s",
      online: true,
    },
    {
      id: 4,
      name: "Câmera Lateral",
      img: "https://www.shutterstock.com/image-vector/cross-on-video-camera-social-600nw-1451901140.jpg",
      online: false,
    },
    {
      id: 5,
      name: "Câmera Ampla",
      img: "https://www.shutterstock.com/image-vector/cross-on-video-camera-social-600nw-1451901140.jpg",
      online: false,
    },
    {
      id: 6,
      name: "Câmera Traseira",
      img: "https://www.shutterstock.com/image-vector/cross-on-video-camera-social-600nw-1451901140.jpg",
      online: false,
    },
  ];

  return (
    <div className={stylesHome.dashboard}>
      {/* ==== NAVBAR / SIDEBAR ==== */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        isCollapsed={isSidebarCollapsed}
      />

      <main
        className={stylesHome.mainContent}
        data-sidebar-collapsed={isSidebarCollapsed}
      >
        {/* ==== HEADER ==== */}
        <Header
          onMenuClick={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          isSidebarCollapsed={isSidebarCollapsed}
        />

        {/* ==== TÍTULO DA PÁGINA ==== */}
        <div className={styles.pageTitle}>
          <div className={styles.headerIcon}>
            <FaVideo />
          </div>

          <div>
            <h1 className={styles.title}>Visualização de Câmeras</h1>
            <p className={styles.subtitle}>
              <FaEye className={styles.subIcon} />
              Acompanhe em tempo real todas as câmeras da estufa
            </p>
          </div>
        </div>

        {/* ==== GRID DE CÂMERAS ==== */}
        <div className={styles.grid}>
          {cameras.map((cam) => (
            <div className={styles.card} key={cam.id}>
              <div className={styles.cardHeader}>
                <div className={styles.cardName}>
                  <FaCamera className={styles.cardIcon} />
                  {cam.name}
                </div>

                <span
                  className={`${styles.status} ${
                    cam.online ? styles.online : styles.offline
                  }`}
                >
                  {cam.online ? "Online" : "Offline"}
                </span>
              </div>

              <div className={styles.imgBox}>
                <img src={cam.img} alt={cam.name} />
                <div className={styles.overlay}>
                  <button className={styles.playBtn}>
                    <FaPlay />
                  </button>
                </div>
              </div>

              <div className={styles.actions}>
                <button className={styles.actionBtn}>
                  <FaCamera /> Capturar
                </button>
                <button className={styles.actionBtn}>
                  <FaExpand /> Expandir
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
