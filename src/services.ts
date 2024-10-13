import { useService } from "./hooks/useService";

export const enviarCodigo = () => {
  const service = useService({
    baseUrl: "client/sendMessage/comunidadezdg",
    key: ["enviarCodigo"],
  });

  return service.usePost();
};
