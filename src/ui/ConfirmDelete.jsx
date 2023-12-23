import Heading from "./Heading";
import Button from "./Button";

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <div className="flex min-w-max max-w-sm flex-col gap-3">
      <Heading type="h3">حذف {resourceName}</Heading>
      <p className="mb-3 text-gray-500 dark:text-gray-400">
        آیا از حذف {resourceName} اطمینان دارید؟
      </p>
      <div className="flex justify-end gap-3">
        <Button variation="secondary" onClick={onCloseModal}>
          لغو
        </Button>
        <Button variation="danger" onClick={onConfirm} disabled={disabled}>
          تایید
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
