import { useState, useEffect, useRef } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { Pencil, Trash, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";

const personalSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "El nombre de usuario debe tener al menos 2 caracteres.",
    })
    .max(30, {
      message: "El nombre de usuario no puede tener más de 30 caracteres.",
    }),
  email: z
    .string()
    .email({ message: "Introduce un correo electrónico válido." }),
  firstName: z.string().min(1, { message: "Los nombres son obligatorios." }),
  lastName: z.string().min(1, { message: "Los apellidos son obligatorios." }),
});

const photoSchema = z.object({
  foto: z
    .instanceof(File)
    .refine(
      (file) => {
        const allowedTypes = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
        ];
        return allowedTypes.includes(file.type);
      },
      { message: "Solo se permiten imágenes en formato JPG, PNG, GIF o WEBP." }
    )
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "El tamaño máximo de la imagen es 5MB.",
    })
    .optional()
    .or(z.null()),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, {
      message: "La contraseña actual debe tener al menos 6 caracteres.",
    }),
    newPassword: z.string().min(6, {
      message: "La contraseña nueva debe tener al menos 6 caracteres.",
    }),
    confirmNewPassword: z
      .string()
      .min(6, { message: "Debes confirmar la contraseña nueva." }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Las contraseñas nuevas deben coincidir.",
    path: ["confirmNewPassword"],
  });

type PersonalFormValues = z.infer<typeof personalSchema>;
type PhotoFormValues = z.infer<typeof photoSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

const personalDefaults: Partial<PersonalFormValues> = {
  username: "Jason",
  email: "jasonvilac@gmail.com",
  firstName: "Jason",
  lastName: "Vila",
};

const passwordDefaults: Partial<PasswordFormValues> = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

const Profile = () => {
  const photoForm = useForm<PhotoFormValues>({
    resolver: zodResolver(photoSchema),
    defaultValues: { foto: null },
    mode: "onChange",
  });

  const personalForm = useForm<PersonalFormValues>({
    resolver: zodResolver(personalSchema),
    defaultValues: personalDefaults,
    mode: "onChange",
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: passwordDefaults,
    mode: "onChange",
  });

  const photoValue = useWatch({ control: photoForm.control, name: "foto" });
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadPhoto = () => {
    fileInputRef.current?.click();
  };

  const handleDeletePhoto = () => {
    photoForm.setValue("foto", null);
    setAvatarUrl(null);
    setPhotoError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePhotoSubmit = (data: PhotoFormValues) => {
    console.log("Foto de perfil:", data);
  };

  const handlePersonalSubmit = (data: PersonalFormValues) => {
    console.log("Datos personales:", data);
  };

  const handlePasswordSubmit = (data: PasswordFormValues) => {
    console.log("Datos para cambiar contraseña:", data);
  };

  useEffect(() => {
    if (photoValue instanceof File) {
      try {
        photoSchema.shape.foto.parse(photoValue);
        const objectUrl = URL.createObjectURL(photoValue);
        setAvatarUrl(objectUrl);
        setPhotoError(null);

        photoForm.handleSubmit(handlePhotoSubmit)();
        return () => URL.revokeObjectURL(objectUrl);
      } catch (error) {
        if (error instanceof z.ZodError) {
          setPhotoError(error.errors[0].message);
          setAvatarUrl(null);
        }
      }
    } else {
      setAvatarUrl(null);
      setPhotoError(null);
    }
  }, [photoValue, photoForm]);

  const getFallback = () => {
    const { firstName, lastName } = personalForm.getValues();
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Configuración de perfil</h3>
        <p className="text-sm text-muted-foreground">
          Actualiza tu información personal, foto de perfil y contraseña.
        </p>
      </div>

      <div className="flex flex-col items-center relative">
        <div className="relative">
          <Avatar
            key={avatarUrl ?? "fallback"}
            className="w-32 h-32 rounded-full"
          >
            {avatarUrl ? (
              <AvatarImage
                src={avatarUrl}
                alt="Foto de perfil"
                className="object-cover"
              />
            ) : (
              <AvatarFallback className="text-5xl">
                {getFallback()}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="absolute bottom-0 right-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center bg-background">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-full p-0 rounded-full"
                  >
                    <Pencil />
                  </Button>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleUploadPhoto}>
                  <Upload className="text-current" />
                  Subir foto
                </DropdownMenuItem>
                {avatarUrl && (
                  <DropdownMenuItem
                    className="text-red-600 dark:text-red-500 data-[highlighted]:text-red-600 dark:data-[highlighted]:text-red-500"
                    onClick={handleDeletePhoto}
                  >
                    <Trash className="text-current" />
                    Eliminar foto
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <input
          ref={fileInputRef}
          id="foto-input"
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              photoForm.setValue("foto", file);
            }
          }}
        />

        {photoError && (
          <p className="text-xs text-destructive mt-2 text-center">
            {photoError}
          </p>
        )}
      </div>

      <Separator />

      <Form {...personalForm}>
        <form
          onSubmit={personalForm.handleSubmit(handlePersonalSubmit)}
          className="space-y-8"
        >
          <div className="space-y-6">
            <h4 className="text-md font-semibold">Información personal</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <FormField
                control={personalForm.control}
                name="firstName"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Nombres</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingrese sus nombres" {...field} />
                    </FormControl>
                    {fieldState.error && (
                      <FormMessage className="text-xs text-destructive mt-1" />
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={personalForm.control}
                name="lastName"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Apellidos</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingrese sus apellidos" {...field} />
                    </FormControl>
                    {fieldState.error && (
                      <FormMessage className="text-xs text-destructive mt-1" />
                    )}
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={personalForm.control}
              name="username"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Nombre de usuario</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingrese su nombre de usuario"
                      {...field}
                    />
                  </FormControl>
                  <p className="text-xs text-muted-foreground">
                    Puedes cambiar tu nombre de usuario una vez cada 30 días.
                  </p>
                  {fieldState.error && (
                    <FormMessage className="text-xs text-destructive mt-1" />
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={personalForm.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="ejemplo@correo.com"
                      {...field}
                    />
                  </FormControl>
                  {fieldState.error && (
                    <FormMessage className="text-xs text-destructive mt-1" />
                  )}
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-center">
            <Button type="submit">Actualizar perfil</Button>
          </div>
        </form>
      </Form>

      <Separator />

      <Form {...passwordForm}>
        <form
          onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
          className="space-y-8"
        >
          <div className="space-y-6">
            <h4 className="text-md font-semibold">Cambiar contraseña</h4>
            <FormField
              control={passwordForm.control}
              name="currentPassword"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Contraseña actual</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Contraseña actual" {...field} />
                  </FormControl>
                  {fieldState.error && (
                    <FormMessage className="text-xs text-destructive mt-1" />
                  )}
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Contraseña nueva</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Contraseña nueva"
                        {...field}
                      />
                    </FormControl>
                    {fieldState.error && (
                      <FormMessage className="text-xs text-destructive mt-1" />
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="confirmNewPassword"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Confirmar contraseña nueva</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Confirmar contraseña nueva"
                        {...field}
                      />
                    </FormControl>
                    {fieldState.error && (
                      <FormMessage className="text-xs text-destructive mt-1" />
                    )}
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Button type="submit">Cambiar contraseña</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Profile;
