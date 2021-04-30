import "./App.css";
import Panel from "nav-frontend-paneler";
import Navn from "./components/navn";
import Status from "./components/status";
import { authUrl, fetcher } from "./api";
import { useQuery } from "react-query";

function App() {
  const { data, error } = useQuery(authUrl, fetcher);

  return data?.name ? (
    <div className="podlet-template">
      <Panel border>
        <Navn navn={!data?.name} />
        <Status status={"registrert som arbeidssøker"} />
      </Panel>
    </div>
  ) : null;
}

export default App;
