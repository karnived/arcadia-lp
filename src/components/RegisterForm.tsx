import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@nextui-org/button";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  useDisclosure,
} from "@nextui-org/react";
import { createAccount } from "../api/api";
import AlertModal from "./AlertModal";

const formSchema = z
  .object({
    email: z
      .string({ required_error: "This field is required" })
      .email("Email is not valid"),
    nationalId: z
      .string({ required_error: "This field is required" })
      .length(8, "Must be 8 characters long")
      .refine((value) => {
        return !isNaN(Number(value)) && value?.length > 3;
      }, "DNI is not valid"),
    name: z
      .string({ required_error: "This field is required" })
      .min(3, "This field requires at leas 3 characters long"),
  })
  .required();

type FormSchemaValues = z.infer<typeof formSchema>;

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenError,
    onOpen: onOpenError,
    onOpenChange: onOpenChangeError,
  } = useDisclosure();

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormSchemaValues>({
    resolver: zodResolver(formSchema),
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      nationalId: "",
      name: "",
    },
  });

  const handleOnSubmit: SubmitHandler<FormSchemaValues> = async (
    data,
    event
  ) => {
    event?.preventDefault();

    try {
      setIsLoading(true);
      const response = await createAccount(data);

      if (response.result.insertedId) onOpen();
    } catch (error) {
      console.error("Error trying to create an account: ", error);
      onOpenError();
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  return (
    <div className="mb-[50px]">
      <AlertModal
        type="success"
        title="You're now part of Arcadia!"
        description=" In the coming days, we'll be revealing information about the event. Stay connected through the app to not miss anything!"
        onOpenChange={onOpenChange}
        isOpen={isOpen}
      />
      <AlertModal
        type="error"
        description="We encountered an error while loading your form. Please register again."
        onOpenChange={onOpenChangeError}
        isOpen={isOpenError}
      />

      <Card className="transparent-bg">
        <CardHeader className="flex items-center justify-center pt-8 pb-0">
          <h3 className="text-2xl text-center text-[#EAA5F2] font-bold max-w-[297px]">
            Fill in the form to join the event
          </h3>
        </CardHeader>
        <CardBody className="px-4 py-5">
          <Divider className="bg-white mb-5" />
          <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-5">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <>
                  <div className="input-container">
                    <input
                      {...field}
                      name="name"
                      placeholder="Full name"
                      className="bg-[#231636] px-3 py-[14px] rounded-sm w-full text-white"
                    />
                  </div>
                  <p className="text-red-500 text-xs mt-2 ml-1">
                    {errors.name?.message}
                  </p>
                </>
              )}
            />

            <Controller
              name="nationalId"
              control={control}
              render={({ field }) => (
                <>
                  <div className="input-container">
                    <input
                      {...field}
                      name="nationalId"
                      placeholder="DNI"
                      className="bg-[#231636] px-3 py-[14px] rounded-sm w-full text-white"
                    />
                  </div>
                  <p className="text-red-500 text-xs mt-2 ml-1">
                    {errors.nationalId?.message}
                  </p>
                </>
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <>
                  <div className="input-container">
                    <input
                      {...field}
                      name="email"
                      placeholder="Email"
                      className="bg-[#231636] px-3 py-[14px] rounded-sm w-full text-white"
                    />
                  </div>
                  <p className="text-red-500 text-xs mt-2 ml-1">
                    {errors.email?.message}
                  </p>
                </>
              )}
            />

            <Button
              color="primary"
              type="submit"
              isLoading={isLoading}
              className="flex mx-auto bg-black rounded-3xl border-1 border-[#FF1BF4] hover:bg-[#FF1BF4] active:bg-[#FF1BF4] shadow-[0_0_15px_3px_rgba(140,17,140,0.6)] w-[190px]"
            >
              RSVP
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default RegisterForm;
