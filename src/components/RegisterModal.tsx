import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { forwardRef } from "react";

const formSchema = z
  .object({
    email: z
      .string({ required_error: "Este campo es requerido" })
      .email("El mail ingresado no es válido"),
    dni: z
      .string({ required_error: "Este campo es requerido" })
      .length(8, "El DNI ingresado no es válido"),
    name: z.string({ required_error: "Este campo es requerido" }),
  })
  .required();

type FormSchemaValues = z.infer<typeof formSchema>;

const RegisterModal = forwardRef<HTMLDivElement>((_props, ref) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormSchemaValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      dni: "",
      name: "",
    },
  });

  const handleOnSubmit: SubmitHandler<FormSchemaValues> = (data, event) => {
    event?.preventDefault();
    // TODO: Handle submit
    console.log(data);
  };

  return (
    <div className="mt-8">
      <div ref={ref}>
        <Button color="secondary" onPress={onOpen}>
          Confirmar asistencia
        </Button>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        placement="center"
        className="top-0 mx-6"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h2>Confirmar asistencia</h2>
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={handleSubmit(handleOnSubmit)}
                  className="space-y-3"
                >
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <Input
                          label="Email"
                          placeholder="Ingresa tu correo"
                          {...field}
                        />
                        <p className="text-red-500 text-xs mt-2 ml-1">
                          {errors.email?.message}
                        </p>
                      </div>
                    )}
                  />

                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <Input
                          label="Nombre"
                          placeholder="Ingresa tu nombre"
                          {...field}
                        />
                        <p className="text-red-500 text-xs mt-2 ml-1">
                          {errors.name?.message}
                        </p>
                      </div>
                    )}
                  />

                  <Controller
                    name="dni"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <Input
                          label="DNI"
                          placeholder="Ingresa tu DNI"
                          {...field}
                        />
                        <p className="text-red-500 text-xs mt-2 ml-1">
                          {errors.dni?.message}
                        </p>
                      </div>
                    )}
                  />

                  <div className="flex flex-row gap-2 py-4 justify-end">
                    <Button onPress={onClose}>Cancelar</Button>
                    <Button color="primary" type="submit" isDisabled={!isValid}>
                      RSVP
                    </Button>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
});

export default RegisterModal;
