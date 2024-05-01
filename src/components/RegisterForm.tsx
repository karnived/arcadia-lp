import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader, useDisclosure } from "@nextui-org/react";
import { createAccount } from "../api/api";
import SuccessModal from "./SuccessModal";
import { useState } from "react";

const formSchema = z
  .object({
    email: z
      .string({ required_error: "Este campo es requerido" })
      .email("El mail ingresado no es válido"),
    nationalId: z
      .string({ required_error: "Este campo es requerido" })
      .length(8, "El DNI ingresado no es válido")
      .refine((value) => {
        return !isNaN(Number(value)) && value?.length > 3;
      }, "El DNI ingresado no es válido"),
    name: z
      .string({ required_error: "Este campo es requerido" })
      .min(3, "Este campo require al menos 3 caractéres"),
  })
  .required();

type FormSchemaValues = z.infer<typeof formSchema>;

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
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

      if (response.result.insertedId) {
        onOpen();
        reset();
      }
    } catch (error) {
      console.error("Error trying to create an account: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-[50px]">
      <SuccessModal onOpenChange={onOpenChange} isOpen={isOpen} />
      <Card className="custom-transparent-bg ">
        <CardHeader className="flex items-center justify-center pt-8">
          <h3 className="text-2xl text-center text-[#EAA5F2] font-bold">
            Completa el formulario para ser parte del evento
          </h3>
        </CardHeader>
        <CardBody className="px-4 py-5">
          <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-5">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <div>
                  <input
                    {...field}
                    name="name"
                    placeholder="Nombre"
                    className="bg-[#231636] px-3 py-[14px] rounded-sm w-full text-white"
                  />

                  <p className="text-red-500 text-xs mt-2 ml-1">
                    {errors.name?.message}
                  </p>
                </div>
              )}
            />

            <Controller
              name="nationalId"
              control={control}
              render={({ field }) => (
                <div>
                  <input
                    {...field}
                    name="nationalId"
                    placeholder="DNI"
                    className="bg-[#231636] px-3 py-[14px] rounded-sm w-full text-white"
                  />

                  <p className="text-red-500 text-xs mt-2 ml-1">
                    {errors.nationalId?.message}
                  </p>
                </div>
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <div>
                  <input
                    {...field}
                    name="email"
                    placeholder="Email"
                    className="bg-[#231636] px-3 py-[14px] rounded-sm w-full text-white"
                  />

                  <p className="text-red-500 text-xs mt-2 ml-1">
                    {errors.email?.message}
                  </p>
                </div>
              )}
            />

            <Button
              color="primary"
              type="submit"
              isDisabled={!isValid}
              isLoading={isLoading}
              className="flex mx-auto bg-black rounded-3xl border-1 border-[#FF1BF4] hover:bg-[#FF1BF4]"
            >
              Confirmar asistencia
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default RegisterForm;