// import Link from "next/link";
import { ReactNode, Suspense } from "react";
import styles from './layout.module.css';
import Bar from "@/components/Bar/Bar";
import Navigation from "@/components/Navigation/Navigation";
import Sidebar from "@/components/Sidebar/Sidebar";


interface MusicLayoutProps {
  children: ReactNode
};

export default function MusicLayout({ children }: MusicLayoutProps) {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <main className={styles.main}>
            <Navigation />
            {/* <Suspense fallback={<div>"Данные загружаются. Пожалуйста, подождите."</div>}> */}
            {/* <Suspense> */}
              {children}
            {/* </Suspense> */}
            <Sidebar />
          </main>
          <Bar />
          <footer className="footer"></footer>
        </div>
      </div>
    </>
  );
}
