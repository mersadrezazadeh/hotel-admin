import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import LoginForm from "../features/Authentication/LoginForm";

function Login() {
  return (
    <main className="container flex h-screen max-w-lg flex-col items-center justify-center gap-4 bg-gray-50 p-6 dark:bg-gray-900 xs:gap-14">
      <Logo />
      <Heading type="h4">وارد حساب کاربری خود شوید</Heading>

      <div className="w-full">
        <LoginForm />
      </div>
    </main>
  );
}

export default Login;
