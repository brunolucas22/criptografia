import { TabPanel, TabView } from "primereact/tabview";
import { ChaveUnica } from "./pages/ChaveUnica";
import "./App.css";
import { Substituicao } from "./pages/Substituicao";
import { Transposicao } from "./pages/Transposicao";

function App() {
  return (
    <TabView>
      <TabPanel header="Substituição (Cifra de Cesár)">
        <Substituicao />
      </TabPanel>
      <TabPanel header="Transposição">
        <Transposicao />
      </TabPanel>
      <TabPanel header="Chave Única">
        <ChaveUnica />
      </TabPanel>
    </TabView>
  );
}

export default App;
