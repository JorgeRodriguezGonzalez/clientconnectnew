import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const WebDesign = () => {
  return (
    <div>
      <Header />
      <main style={{ padding: "200px 20px", textAlign: "center", background: "#000", color: "#fff" }}>
        <h1>Web Design - Test</h1>
        <p>If you see this, the page loads.</p>
      </main>
      <Footer />
    </div>
  );
};

export default WebDesign;