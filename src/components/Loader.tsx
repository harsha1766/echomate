export default function Loader({ loading }: { loading: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        zIndex: 1000,
        width: "100vw",
        height: "100vh",
        background: "rgba(0, 0, 0, 0.5)",
        display: loading ? 'flex':"none",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h3 style={{ color: "white", marginTop: 12 }}>Loading...</h3>
      </div>
    </div>
  );
}
