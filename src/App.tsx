import "./App.css";
import Panel from "nav-frontend-paneler";
import Navn from "./components/navn";
import Status from "./components/status";
import { authUrl, fetcher } from "./api";
import { useQuery } from "react-query";

function App() {
  const { data } = useQuery(authUrl, fetcher);
  const navnPaaBruker = data?.name;

  return navnPaaBruker ? (
    <div className="podlet-template">
      <Panel border>
        <Navn navn={navnPaaBruker} />
        <Status status={"registrert som arbeidssøker"} />
      </Panel>
    </div>
  ) : null;
}

export default App;
