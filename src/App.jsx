import { useState, useEffect } from "react";

function App() {
  const [order, setOrder] = useState({
    classic: 0,
    cheese: 0,
    bacon: 0,
    promoClassic: 0,
    promoCheese: 0,
    promoSurtida: 0,
  });

  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [total, setTotal] = useState(0);

  const price = 5000;
  const promoPrice = 20000;

  const hamburguesas = [
    { type: "classic", label: "Classic", img: "https://bk-latam-prod.s3.amazonaws.com/sites/burgerking.com.py/files/hamburguesa.png", price },
    { type: "cheese", label: "Especial", img: "https://w7.pngwing.com/pngs/772/330/png-transparent-hamburger-buffalo-wing-cheeseburger-french-fries-hot-dog-buffalo-wings-food-cheese-cheeseburger.png", price },
    ];

  const promos = [
    { type: "promoClassic", label: "Classic x4", price: promoPrice },
    { type: "promoCheese", label: "Cheese x4", price: promoPrice },
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
              <div>{h.price}$ c/u</div>
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
              <span>{order[item.type]} x {item.price}$ = {order[item.type]*item.price}$</span>
            </div>
          ))}
          <div style={totalCartStyle}>Total: {total}$</div>
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
