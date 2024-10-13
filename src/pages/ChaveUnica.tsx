import { FieldValues, useForm } from "react-hook-form";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { getFormErrorMessage } from "../components/GetFormErrorMessage";

export function ChaveUnica() {
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

  // Converte um caractere para bits
  const charToBin = (char: any) => {
    return char.charCodeAt(0).toString(2).padStart(8, "0");
  };

  // XOR entre dois binários de 8 bits
  const xorBinary = (bin1: any, bin2: any) => {
    let result = "";
    for (let i = 0; i < bin1.length; i++) {
      // Aplica XOR bit a bit
      result += (bin1[i] ^ bin2[i]).toString();
    }
    return result;
  };

  // Converte binário de 8 bits de volta para um caractere ASCII
  const binToChar = (bin: any) => {
    return String.fromCharCode(parseInt(bin, 2));
  };

  // Criptografia usando XOR bit a bit
  const encrypt = (data: FieldValues) => {
    const text = data.palavraoriginal;
    const key = data.chaveoriginal;

    let encryptedBinary = "";

    for (let i = 0; i < text.length; i++) {
      // Converte o caractere da mensagem e da chave para binário (8 bits)
      const textBin = charToBin(text[i]);
      const keyBin = charToBin(key[i % key.length]);

      // Aplica XOR bit a bit
      const encryptedCharBin = xorBinary(textBin, keyBin);
      console.log(
        { bit: textBin, caractere: text[i] },
        { bitChave: keyBin, caractereChave: key[i % key.length] },
        { bitResultado: encryptedCharBin }
      );
      // Adiciona o resultado binário para o valor que será visualizado
      encryptedBinary += encryptedCharBin + " "; // Separa os blocos com espaço
    }
    setValue("bits", encryptedBinary.trim());
  };

  // Descriptografia usando XOR bit a bit
  const decrypt = (data: FieldValues) => {
    const encryptedBinary = data.palavracriptografada;
    const key = data.chave;
    const binaryBlocks = encryptedBinary.split(" ");
    let decryptedText = "";

    for (let i = 0; i < binaryBlocks.length; i++) {
      // Pega o bloco binário encriptado e a chave
      const encryptedBin = binaryBlocks[i];
      const keyBin = charToBin(key[i % key.length]);

      // Aplica XOR bit a bit
      const decryptedCharBin = xorBinary(encryptedBin, keyBin);

      // Converte o binário de volta para o caractere
      decryptedText += binToChar(decryptedCharBin);
    }

    setValueDes("palavra", decryptedText);
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
              {...register("chaveoriginal", { required: true })}
            />
            {getFormErrorMessage(errors.chaveoriginal)}
          </div>

          <Button
            className="my-5 mx-2 w-full max-h-3rem"
            label="Criptografar"
          />
        </div>
        <div className={`field col-12`}>
          <label style={{ fontWeight: "bold" }}>{`Bits Criptografados`}</label>
          <br />
          <InputTextarea
            readOnly
            autoResize
            className="w-full"
            id={`bits`}
            placeholder={"Aguardando..."}
            {...register("bits")}
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
              {...registerDes("chave", { required: true })}
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
