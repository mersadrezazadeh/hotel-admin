import { useMoveBack } from "../hooks/useMoveBack";

import Heading from "../ui/Heading";
import Button from "../ui/Button";

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <main className="flex h-screen items-center justify-center bg-gray-50 p-12 dark:bg-gray-900">
      <div className="space-y-8 rounded-lg border border-gray-100 bg-gray-0 p-12 text-center dark:border-gray-800 dark:bg-gray-850">
        <Heading type="h1">صفحه مورد نظر یافت نشد</Heading>

        <Button size="large" onClick={moveBack}>
          بازگشت
        </Button>
      </div>
    </main>
  );
}

export default PageNotFound;
