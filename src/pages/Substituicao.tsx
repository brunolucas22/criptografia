import { FieldValues, useForm } from "react-hook-form";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { getFormErrorMessage } from "../components/GetFormErrorMessage";

export function Substituicao() {
  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
  } = useForm();
  const {
    formState: { errors: errorsDes },
    register: registerDes,
    handleSubmit: handleSubmitDes,
    setValue: setValueDes,
  } = useForm();

  // Criptografia usando substituição
  const encrypt = (data: FieldValues) => {
    const text = data.palavraoriginal;
    let encryptText = "";
    for (let i = 0; i < text.length; i++) {
      let char = text[i];
      // Verificando se é uma letra do alfabeto
      if (char.match(/[a-z]/i)) {
        let idChar = text.charCodeAt(i);
        // Letras maiúsculas
        if (idChar >= 65 && idChar <= 90) {
          // Feito cálculos para a partir do X não usar caracteres que não são letras
          char = String.fromCharCode(((idChar - 65 + 3) % 26) + 65);
        }
        // Letras minúsculas
        else if (idChar >= 97 && idChar <= 122) {
          // Feito cálculos para a partir do x não usar caracteres que não são letras
          char = String.fromCharCode(((idChar - 97 + 3) % 26) + 97);
        }
      }
      // Caso for número
      if (char.match(/[0-9]/i)) {
        char = `${Number(char) + 3}`;
      }

      encryptText += char;
    }
    setValue("encript", encryptText);
  };

  const decrypt = (data: FieldValues) => {
    const text = data.palavracriptografada;
    let decryptText = "";
    for (let i = 0; i < text.length; i++) {
      let char = text[i];
      // Verificando se é uma letra do alfabeto
      if (char.match(/[a-z]/i)) {
        let idChar = text.charCodeAt(i);
        // Letras maiúsculas
        if (idChar >= 65 && idChar <= 90) {
          // Feito cálculos para a partir do X não usar caracteres que não são letras
          char = String.fromCharCode(((idChar - 65 - 3) % 26) + 65);
        }
        // Letras minúsculas
        else if (idChar >= 97 && idChar <= 122) {
          // Feito cálculos para a partir do x não usar caracteres que não são letras
          char = String.fromCharCode(((idChar - 97 - 3) % 26) + 97);
        }
      }
      // Caso for número
      if (char.match(/[0-9]/i)) {
        char = `${Number(char) - 3}`;
      }

      decryptText += char;
    }
    setValueDes("palavra", decryptText);
  };

  return (
    <>
      <form onSubmit={handleSubmit(encrypt)}>
        <div className="flex justify-content-start">
          <div className={`field col-12 md:col-10`}>
            <label style={{ fontWeight: "bold" }}>
              {`Palavra que será encriptada`}
            </label>
            <br />
            <InputTextarea
              autoResize
              className="w-full"
              id={`palavraoriginal`}
              placeholder={"Digite a Palavra"}
              {...register("palavraoriginal", { required: true })}
            />
            {getFormErrorMessage(errors.palavraoriginal)}
          </div>

          <Button
            className="my-5 mx-2 w-full max-h-3rem"
            label="Criptografar"
          />
        </div>
        <div className={`field col-12`}>
          <label
            style={{ fontWeight: "bold" }}
          >{`Palavra Criptografada`}</label>
          <br />
          <InputTextarea
            readOnly
            autoResize
            className="w-full"
            id={`encript`}
            placeholder={"Aguardando..."}
            {...register("encript")}
          />
        </div>
      </form>

      <form className="h-15rem" onSubmit={handleSubmitDes(decrypt)}>
        <div className="flex justify-content-start">
          <div className={`field col-12 md:col-10`}>
            <label style={{ fontWeight: "bold" }}>
              {`Palavra Criptografada`}
            </label>
            <br />
            <InputTextarea
              autoResize
              className="w-full"
              id={`palavracriptografada`}
              placeholder={"Digite a Palavra"}
              {...registerDes("palavracriptografada", { required: true })}
            />
            {getFormErrorMessage(errorsDes.palavracriptografada)}
          </div>

          <Button
            className="my-5 mx-2 w-full max-h-3rem"
            label="Desincriptar"
          />
        </div>
        <div className={`field col-12`}>
          <label style={{ fontWeight: "bold" }}>{`Palavra Original`}</label>
          <br />
          <InputTextarea
            autoResize
            readOnly
            className="w-full"
            id={`palavra`}
            placeholder={"Aguardando..."}
            {...registerDes("palavra")}
          />
        </div>
      </form>
    </>
  );
}
