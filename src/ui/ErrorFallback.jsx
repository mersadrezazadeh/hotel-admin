import Button from "./Button";
import Heading from "./Heading";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <main className="flex h-screen items-center justify-center bg-gray-50 p-12 dark:bg-gray-900">
      <div className="rounded-lg border border-gray-100 bg-gray-0 p-12 text-center shadow-lg dark:border-gray-800 dark:bg-gray-850">
        <Heading type="h1">متاسفانه مشکلی رخ داده 😔</Heading>

        <p className="mb-8 mt-4 text-gray-500 dark:text-gray-400">
          {error.message}
        </p>

        <Button size="large" onClick={resetErrorBoundary}>
          سعی مجدد
        </Button>
      </div>
    </main>
  );
}

export default ErrorFallback;
