import LoginForm from "./LoginForm";
import Page from "components/Page";

function Login() {
  return (
    <Page title="Login" description="Login">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#E5E5E5",
        }}
      >
        <LoginForm />
      </div>
    </Page>
  );
}

export default Login;
