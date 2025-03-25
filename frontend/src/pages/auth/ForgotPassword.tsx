import { Link } from "react-router-dom";
import { LibraryBig } from "lucide-react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ForgotPassword = ({
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
            <h1 className="text-xl font-bold">Restablece la contraseña</h1>
            <div className="text-center text-sm">
              Escribe la dirección de correo electrónico vinculado a tu cuenta de Bookstudio y te enviaremos un mensaje.
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="correo@ejemplo.com"
                required
              />
            </div>
            
            <Button>
              Enviar enlace
            </Button>
            <Button variant="outline" asChild>
              <Link to="/login">Cancelar</Link>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
