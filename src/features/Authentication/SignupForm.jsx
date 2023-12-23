import { useForm } from "react-hook-form";

import { useSignup } from "./useSignup";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

function SignupForm() {
  const { isSigningUp, signup } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      },
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="نام" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isSigningUp}
          {...register("fullName", { required: "پر کردن این پخش الزامی است" })}
        />
      </FormRow>

      <FormRow label="ایمیل" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isSigningUp}
          {...register("email", {
            required: "پر کردن این پخش الزامی است",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "ایمیل وارد شده معتبر نمی‌باشد",
            },
          })}
        />
      </FormRow>

      <FormRow label="رمز عبور" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          disabled={isSigningUp}
          {...register("password", {
            required: "پر کردن این پخش الزامی است",
            minLength: {
              value: 8,
              message: "حداقل تعداد کاراکتر ۸ می‌باشد",
            },
          })}
        />
      </FormRow>

      <FormRow label="تکرار رمز عبور" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isSigningUp}
          {...register("passwordConfirm", {
            required: "پر کردن این پخش الزامی است",
            validate: (value) =>
              value === getValues().password ||
              "رمز عبور وارد شده یکسان نمی‌باشد",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          disabled={isSigningUp}
          onClick={reset}
        >
          انصراف
        </Button>
        <Button disabled={isSigningUp}>ایجاد کاربر</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
