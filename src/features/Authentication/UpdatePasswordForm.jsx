import { useForm } from "react-hook-form";

import { useUpdateUser } from "./useUpdateUser";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;
  const { isUpdating, updateUser } = useUpdateUser();

  function onSubmit({ password }) {
    updateUser({ password }, { onSuccess: () => reset() });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="رمز عبور جدید" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "پر کردن این پخش الزامی است",
            minLength: {
              value: 8,
              message: "حداقل تعداد کاراکتر ۸ می‌باشد",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="تکرار رمز عبور جدید"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          autoComplete="new-password"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "پر کردن این پخش الزامی است",
            validate: (value) =>
              value === getValues().password ||
              "رمز عبور وارد شده یکسان نمی‌باشد",
          })}
        />
      </FormRow>

      <FormRow>
        <Button type="reset" variation="secondary" onClick={reset}>
          انصراف
        </Button>
        <Button disabled={true}>بروزرسانی</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
