import { LibraryBig } from "lucide-react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";

const ResetPassword = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <LibraryBig className="size-5" />
              </div>
              <span className="sr-only">BookStudio</span>
            </a>
            <h1 className="text-xl font-bold">Crear nueva contraseña</h1>
            <div className="text-center text-sm">
              Ingresa la nueva contraseña para tu cuenta de Bookstudio a continuación.
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Nueva contraseña</Label>
              <PasswordInput
                id="newPassword"
                placeholder="Nueva contraseña"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Confirmar contraseña nueva</Label>
              <PasswordInput
                id="confirmNewPassword"
                placeholder="Confirmar contraseña nueva"
                required
              />
            </div>
            <Button>
              Crear contraseña
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
