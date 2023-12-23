import { useState } from "react";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";
import { toPersianNumber } from "../../utils/helpers";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import FileInput from "../../ui/FileInput";
import Button from "../../ui/Button";

function UpdateUserDataForm() {
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();
  const { isUpdating, updateUser } = useUpdateUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    if (!fullName) return;

    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      },
    );
  }

  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="ایمیل">
        <Input value={email} disabled />
      </FormRow>

      <FormRow label="نام">
        <Input
          value={toPersianNumber(fullName)}
          type="text"
          id="fullName"
          disabled={isUpdating}
          onChange={(e) => setFullName(e.target.value)}
        />
      </FormRow>

      <FormRow label="تصویر">
        <FileInput
          id="avatar"
          accept="image/*"
          disabled={isUpdating}
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </FormRow>

      <FormRow>
        <Button
          type="reset"
          variation="secondary"
          disabled={isUpdating}
          onClick={handleCancel}
        >
          انصراف
        </Button>
        <Button disabled={isUpdating}>بروزرسانی</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
