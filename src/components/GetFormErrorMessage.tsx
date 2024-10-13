export const getFormErrorMessage = (errors: any) => {
  if (errors?.type === "required") {
    return (
      <span className="p-error">{"Campo Obrigatório Não Preenchido."}</span>
    );
  } else if (errors?.type === "validate") {
    return <span className="p-error">{errors.message}</span>;
  }
};
