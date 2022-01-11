import "./App.css";
import { client } from "./ApolloClient/client";
import { ApolloProvider } from "@apollo/client";
import ExchangeRate from "./pages/ExchangeRate";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <ExchangeRate />
      </div>
    </ApolloProvider>
  );
}

export default App;
