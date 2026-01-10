import { useState, useEffect } from "react";

function App() {
  const [order, setOrder] = useState({
    classic: 0,
    cheese: 0,
    bacon: 0,
    promoClassic: 0,
    promoCheese: 0,
    promoBacon: 0,
    promoSurtida: 0,
  });

  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [total, setTotal] = useState(0);

  const price = 5000;
  const promoPrice = 20000;

  const hamburguesas = [
    { type: "classic", label: "Classic", img: "https://bk-latam-prod.s3.amazonaws.com/sites/burgerking.com.py/files/hamburguesa.png", price },
    { type: "cheese", label: "Cheese", img: "https://w7.pngwing.com/pngs/772/330/png-transparent-hamburger-buffalo-wing-cheeseburger-french-fries-hot-dog-buffalo-wings-food-cheese-cheeseburger.png", price },
    { type: "bacon", label: "Bacon", img: "data:image/jpeg;base64,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", price },
  ];

  const promos = [
    { type: "promoClassic", label: "Classic x4", price: promoPrice },
    { type: "promoCheese", label: "Cheese x4", price: promoPrice },
    { type: "promoBacon", label: "Bacon x4", price: promoPrice },
    { type: "promoSurtida", label: "Promo Surtida x4", price: promoPrice },
  ];

  // Sumar y restar
  const addItem = (type) => setOrder(prev => ({ ...prev, [type]: prev[type] + 1 }));
  const removeItem = (type) => setOrder(prev => ({ ...prev, [type]: Math.max(prev[type] - 1, 0) }));

  // Calcular total y sugerir promo surtida
  useEffect(() => {
    let subtotal = 0;
    let totalBurgers = 0;
    hamburguesas.forEach(h => {
      subtotal += order[h.type] * h.price;
      totalBurgers += order[h.type];
    });
    promos.forEach(p => subtotal += order[p.type] * p.price);

    if (totalBurgers >= 4 && order.promoSurtida === 0) {
      // Puede sugerir promo surtida automáticamente (opcional)
    }

    setTotal(subtotal);
  }, [order]);

  const sendWhatsApp = () => {
    if (!fecha || !hora) { alert("Ingrese fecha y hora del pedido."); return; }

    let message = "Hola, quiero ordenar:\n";
    hamburguesas.forEach(h => { if (order[h.type]) message += `${order[h.type]} Hamburguesa ${h.label}\n`; });
    promos.forEach(p => { if (order[p.type]) message += `${order[p.type]} ${p.label}\n`; });
    message += `Total: ${total}₲\nFecha: ${fecha}\nHora: ${hora}`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5492616136651?text=${encoded}`;
    window.open(whatsappUrl, "_blank");
  };

  const carrito = [...hamburguesas, ...promos].filter(item => order[item.type] > 0);

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>🍔 VALMAR BURGER MDZ 🍔</h1>

      {/* Productos */}
      <div style={gridStyle}>
        {hamburguesas.map(h => (
          <div key={h.type} style={cardStyle}>
            <img src={h.img} alt={h.label} style={imgStyle} />
            <div style={infoStyle}>
              <div style={labelStyle}>{h.label}</div>
              <div>{h.price}₲ c/u</div>
            </div>
            <div style={counterStyle}>
              <button className="btn" onClick={() => addItem(h.type)}>➕</button>
              <button className="btn" onClick={() => removeItem(h.type)}>➖</button>
              <div>{order[h.type]}</div>
            </div>
          </div>
        ))}

        {promos.map(p => (
          <div key={p.type} style={cardStyle}>
            <div style={{ ...infoStyle, textAlign: "center", fontWeight: "bold" }}>{p.label}</div>
            <div style={counterStyle}>
              <button className="btn" onClick={() => addItem(p.type)}>➕</button>
              <button className="btn" onClick={() => removeItem(p.type)}>➖</button>
              <div>{order[p.type]}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Fecha y hora */}
      <div style={formStyle}>
        <label>
          <strong>Fecha:</strong>{" "}
          <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} style={inputStyle}/>
        </label>
        <br/>
        <label>
          <strong>Hora:</strong>{" "}
          <input type="time" value={hora} onChange={e => setHora(e.target.value)} style={inputStyle}/>
        </label>
      </div>

      {/* Resumen carrito */}
      {carrito.length > 0 && (
        <div style={cartStyle}>
          <h3>🛒 Resumen del pedido</h3>
          {carrito.map(item => (
            <div key={item.type} style={cartItemStyle}>
              <span>{item.label}</span>
              <span>{order[item.type]} x {item.price}₲ = {order[item.type]*item.price}₲</span>
            </div>
          ))}
          <div style={totalCartStyle}>Total: {total}₲</div>
        </div>
      )}

      <button onClick={sendWhatsApp} style={whatsappStyle}>📲 Enviar a WhatsApp</button>
    </div>
  );
}

// --- Styles ---
const containerStyle = {
  fontFamily: "Arial, sans-serif",
  padding: "10px",
  width: "90%",
  maxWidth: "900px",
  margin: "10px auto",
  backgroundColor: "#FFDAB9", // color cálido y familiar
  borderRadius: "15px",
};

const titleStyle = { textAlign: "center", color: "#FF6F00", marginBottom: "15px" };
const gridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "15px" };
const cardStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#FFF0E0",
  padding: "15px",
  borderRadius: "10px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
  transition: "transform 0.2s",
  cursor: "pointer",
  width: "100%",
};
const imgStyle = { width: "100px", height: "100px", objectFit: "contain", marginBottom: "5px" };
const infoStyle = { textAlign: "center", marginBottom: "5px" };
const labelStyle = { fontWeight: "bold", fontSize: "16px", marginBottom: "3px", color: "#D35400" };
const counterStyle = { display: "flex", alignItems: "center", gap: "8px" };
const inputStyle = { padding: "5px", margin: "5px 0", borderRadius: "5px", border: "1px solid #ccc" };
const formStyle = { marginBottom: "20px" };
const cartStyle = { backgroundColor: "#FFE4B5", padding: "10px", borderRadius: "10px", marginBottom: "20px" };
const cartItemStyle = { display: "flex", justifyContent: "space-between", marginBottom: "5px" };
const totalCartStyle = { fontWeight: "bold", textAlign: "right", marginTop: "10px", fontSize: "16px" };
const whatsappStyle = {
  width: "100%",
  padding: "15px",
  fontSize: "18px",
  backgroundColor: "#FF4500",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "transform 0.2s, background-color 0.2s",
};
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      btn.style.transform = "scale(1.3)";
      btn.style.backgroundColor = "#FF8C00";
      setTimeout(() => { btn.style.transform = "scale(1)"; btn.style.backgroundColor = "#D35400"; }, 150);
    });
  });
});

export default App;
