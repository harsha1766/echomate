import { Alert, Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { closeSnack } from "src/redux/reducers/snack.reducer";

export default function AlertComponent() {
  const dispatch = useAppDispatch();
  const { open, type, message } = useAppSelector((state) => state.snack);
  const onClose = () => {
    dispatch(closeSnack());
  };
  const variant = type === "success" ? "success" : "danger";
  return (
    <Alert
      show={open}
      variant={variant}
      className="my-4"
      style={{
        maxWidth: 400,
        margin: "auto",
        position: "absolute",
        top: 8,
        right: 24,
        zIndex: 1000,
      }}
    >
      <Alert.Heading>Alert</Alert.Heading>
      <p>{message}</p>
      <hr />
      <div className="d-flex justify-content-end">
        <Button onClick={onClose} variant={`outline-${variant}`}>
          Close me
        </Button>
      </div>
    </Alert>
  );
}
