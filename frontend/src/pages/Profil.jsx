export default function Profil() {
  return (
    <div style={styles.container}>
      <img src="/logo-cbrsolo.png" alt="CBR Soloraya" style={styles.logo} />

      <h1 style={styles.title}>CAMP BEBAS RIBA</h1>
      <h2 style={styles.subtitle}>CBR SOLORAYA</h2>

      <section style={styles.section}>
        <h3>📌 Tentang Kami</h3>
        <p>
          CBR (Camp Bebas Riba) adalah komunitas sosial independen yang bergerak
          dalam edukasi dan pendampingan masyarakat untuk terbebas dari jeratan riba
          serta membangun kehidupan keuangan yang halal, sehat, dan berkah.
        </p>
      </section>

      <section style={styles.section}>
        <h3>🎯 Visi</h3>
        <p>
          Terwujudnya masyarakat yang merdeka finansial tanpa riba dan menjalani
          kehidupan yang sesuai nilai spiritual dan keadilan.
        </p>
      </section>

      <section style={styles.section}>
        <h3>🛠️ Misi</h3>
        <ul>
          <li>Memberikan edukasi bahaya riba</li>
          <li>Memberikan solusi hijrah finansial</li>
          <li>Menjadi wadah komunitas bebas riba</li>
          <li>Mendukung UMKM halal dan mandiri</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h3>📍 Wilayah CBR Soloraya</h3>
        <p>
          Surakarta, Sukoharjo, Karanganyar, Boyolali, Klaten, Sragen, Wonogiri
        </p>
      </section>

      <section style={styles.section}>
        <h3>📞 Kontak</h3>
        <p>Email: superadmin@cbr.com</p>
        <p>Instagram: @cbrsoloraya</p>
        <p>WhatsApp: (sesuai admin)</p>
      </section>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "auto",
    padding: "30px",
    fontFamily: "Arial, sans-serif",
    lineHeight: "1.7"
  },
  logo: {
    width: "140px",
    display: "block",
    margin: "auto",
    marginBottom: "20px"
  },
  title: {
    textAlign: "center",
    marginBottom: "0"
  },
  subtitle: {
    textAlign: "center",
    color: "#777"
  },
  section: {
    marginTop: "25px"
  }
}
