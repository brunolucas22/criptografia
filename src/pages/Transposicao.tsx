import { FieldValues, useForm } from "react-hook-form";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { getFormErrorMessage } from "../components/GetFormErrorMessage";

export function Transposicao() {
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

  const validate = (value: string) => {
    // Verificando se possui números na chave
    if (value.match(/[0-9]/i)) {
      return "A chave não pode possuir números.";
    }

    // Separa a string em letras minusculas para analisar se a letras que repetem
    const chars = value.toLowerCase().split("");

    // Cria um Set(lista que ignora valores iguais)
    const uniqueChars = new Set(chars);

    // Se o tamanho do Set for diferente da quantidade de caracteres é porque tinha valores repetidos
    return (
      uniqueChars.size === chars.length ||
      "A chave não pode ter letras que se repetem."
    );
  };

  const encrypt = (data: FieldValues) => {
    const text = data.palavraoriginal;
    const key = data.chaveoriginal;
    var objectAux: any = {};
    let encryptText = "";
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const charKey = key[i % key.length];

      objectAux = {
        ...objectAux,
        [charKey]: [...(objectAux[charKey] || []), char],
      };
    }
    console.log(objectAux);
    for (let k of Object.keys(objectAux).sort()) {
      encryptText += objectAux[k].join("");
    }
    setValue("encript", encryptText);
  };

  const decrypt = (data: FieldValues) => {
    var text: string = data.palavracriptografada;
    const key = data.chave;
    const keySort: string = key.split("").sort().join("");

    var objectAux: any = {};
    let decryptText = "";

    var textLength: number = text.length;
    // Verifica a quantidade de caracteres em cada lista
    while (textLength > 0) {
      for (let k of key) {
        if (textLength - 1 >= 0) {
          objectAux = {
            ...objectAux,
            [k]: { length: (objectAux[k]?.length || 0) + 1, list: [] },
          };
        } else {
          break;
        }

        textLength -= 1;
      }
    }
    for (let i = 0; i < keySort.length; i++) {
      const charKey = keySort[i];
      objectAux = {
        ...objectAux,
        [charKey]: [...text.substring(0, objectAux[charKey]?.length)],
      };

      text = text.substring(objectAux[charKey]?.length);
    }

    for (let i = 0; i < objectAux[key[0]].length; i++) {
      for (let k of key) {
        const char = objectAux[k][i];
        if (char) {
          decryptText += char;
        } else {
          break;
        }
      }
    }

    setValueDes("palavra", decryptText);
  };

  return (
    <>
      <form onSubmit={handleSubmit(encrypt)}>
        <div className="flex justify-content-start">
          <div className={`field col-12 md:col-5`}>
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
          <div className={`field col-12 md:col-5`}>
            <label style={{ fontWeight: "bold" }}>{`Chave`}</label>
            <br />
            <InputTextarea
              autoResize
              className="w-full"
              id={`chaveoriginal`}
              placeholder={"Digite a Chave"}
              {...register("chaveoriginal", {
                required: true,
                validate: validate,
              })}
            />
            {getFormErrorMessage(errors.chaveoriginal)}
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
          <div className={`field col-12 md:col-5`}>
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
          <div className={`field col-12 md:col-5`}>
            <label style={{ fontWeight: "bold" }}>{`Chave`}</label>
            <br />
            <InputTextarea
              autoResize
              className="w-full"
              id={`chave`}
              placeholder={"Digite a Chave"}
              {...registerDes("chave", { required: true, validate: validate })}
            />
            {getFormErrorMessage(errorsDes.chave)}
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
