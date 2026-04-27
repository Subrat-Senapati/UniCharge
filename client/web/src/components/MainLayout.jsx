import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ChatbotButton from "./ChatbotButton";

function MainLayout() {
  return (
    <>
      <Header />
      <main className="main-content">
        <Outlet />
        <ChatbotButton />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;