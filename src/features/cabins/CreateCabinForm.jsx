import { useForm } from "react-hook-form";

import { formatCurrency } from "../../utils/helpers";
import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import FileInput from "../../ui/FileInput";
import Button from "../../ui/Button";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isUpdating, updateCabin } = useUpdateCabin();
  const isWorking = isCreating || isUpdating;

  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      updateCabin(
        {
          newCabinData: {
            ...data,
            image: image,
          },
          id: editId,
        },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
    else
      createCabin(
        {
          ...data,
          image:
            image ||
            "https://izsufvpaplqjfmjdwpwd.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg",
        },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
  }

  // This function can be add as a second argument to handleSubmit. like this --> handleSubmit(onSubmit, onError)
  // function onError(errors) {
  //   console.log(errors);
  // }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      {/* Name */}
      <FormRow type="modal" label="نام" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "پر کردن این بخش الزامی است" })}
        />
      </FormRow>
      {/* Capacity */}
      <FormRow type="modal" label="ظرفیت" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "پر کردن این بخش الزامی است",
            min: {
              value: 1,
              message: "مقدار وارد شده معتبر نیست",
            },
          })}
        />
      </FormRow>
      {/* Price */}
      <FormRow type="modal" label="قیمت" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "پر کردن این بخش الزامی است",
            min: {
              value: 1,
              message: "مقدار وارد شده معتبر نیست",
            },
          })}
        />
      </FormRow>
      {/* Discount */}
      <FormRow type="modal" label="تخفیف" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register("discount", {
            required: "پر کردن این بخش الزامی است",
            validate: (value) =>
              getValues().regularPrice
                ? +value < +getValues().regularPrice ||
                  `مقدار تخفیف باید کمتر از ${formatCurrency(
                    +getValues().regularPrice,
                  )} تومان باشد`
                : null,
            min: {
              value: 0,
              message: "مقدار وارد شده معتبر نیست",
            },
          })}
        />
      </FormRow>
      {/* Description */}
      <FormRow
        type="modal"
        label="توضیحات"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          disabled={isWorking}
          {...register("description", {
            required: "پر کردن این بخش الزامی است",
          })}
        />
      </FormRow>
      {/* Image */}
      <FormRow type="modal" label="تصویر" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register("image")}
        />
      </FormRow>
      {/* Buttons */}
      <FormRow>
        <Button
          type="reset"
          variation="secondary"
          onClick={() => onCloseModal?.()}
          disabled={isWorking}
        >
          انصراف
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "ویرایش" : "ایجاد"} ویلا
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
