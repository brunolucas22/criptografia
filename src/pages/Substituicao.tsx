import { FieldValues, useForm } from "react-hook-form";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { getFormErrorMessage } from "../components/GetFormErrorMessage";
import { Checkbox } from "primereact/checkbox";

export function Substituicao() {
  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
    watch,
  } = useForm();
  const {
    formState: { errors: errorsDes },
    register: registerDes,
    handleSubmit: handleSubmitDes,
    setValue: setValueDes,
  } = useForm();

  // Remove o acento das letras para que haja uma substituição
  const removeAccents: (char: string) => string = (char: string) => {
    if (!watch("removeracento")) {
      return char;
    }
    const accentMap: { [key: string]: string } = {
      ç: "c",
      Ç: "C",
      ã: "a",
      Ã: "A",
      á: "a",
      Á: "A",
      à: "a",
      À: "A",
      â: "a",
      Â: "A",
      é: "e",
      É: "E",
      ê: "e",
      Ê: "E",
      í: "i",
      Í: "I",
      ó: "o",
      Ó: "O",
      ô: "o",
      Ô: "O",
      õ: "o",
      Õ: "O",
      ú: "u",
      Ú: "U",
      ü: "u",
      Ü: "U",
    };

    return accentMap[char] || char;
  };

  // Criptografia usando substituição
  const encrypt = (data: FieldValues) => {
    const text = data.palavraoriginal;
    let encryptText = "";
    for (let i = 0; i < text.length; i++) {
      let char = removeAccents(text[i]);

      // Verificando se é uma letra do alfabeto
      if (char.match(/[a-z]/i)) {
        let idChar = char.charCodeAt(0);

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
        char = `${(Number(char) + 3 + 10) % 10}`;
      }

      encryptText += char;
    }
    setValue("encript", encryptText);
  };

  const decrypt = (data: FieldValues) => {
    const text = data.palavracriptografada;
    let decryptText = "";
    for (let i = 0; i < text.length; i++) {
      let char = removeAccents(text[i]);
      // Verificando se é uma letra do alfabeto
      if (char.match(/[a-z]/i)) {
        let idChar = text.charCodeAt(i);
        // Letras maiúsculas
        if (idChar >= 65 && idChar <= 90) {
          // Feito cálculos para a partir do X não usar caracteres que não são letras
          char = String.fromCharCode(((idChar - 65 - 3 + 26) % 26) + 65);
        }
        // Letras minúsculas
        else if (idChar >= 97 && idChar <= 122) {
          // Feito cálculos para a partir do x não usar caracteres que não são letras
          char = String.fromCharCode(((idChar - 97 - 3 + 26) % 26) + 97);
        }
      }
      // Caso for número
      if (char.match(/[0-9]/i)) {
        char = `${(Number(char) - 3 + 10) % 10}`;
      }

      decryptText += char;
    }
    setValueDes("palavra", decryptText);
  };

  return (
    <>
      <form onSubmit={handleSubmit(encrypt)}>
        <div className={`field col-12 md:col-5`}>
          <label style={{ fontWeight: "bold" }}>{`Remover Acentos`}</label>
          <br />
          <Checkbox
            onChange={(e) => setValue("removeracento", e.checked)}
            checked={watch("removeracento")}
          ></Checkbox>
        </div>
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
