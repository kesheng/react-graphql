import React from "react";
import { useQuery, gql } from "@apollo/client";

// const EXCHANGE_RATES = gql`
//   query GetExchangeRates {
//     rates(currency: "AUD") {
//       currency
//       rate
//     }
//     openExchangeRates
//       @rest(
//         type: "openExchangeRates"
//         path: "/latest"
//         endpoint: "openExchangeRate"
//       ) {
//       rates
//     }
//   }
// `;

const EXCHANGE_RATES_HTTP = gql`
  query GetExchangeRates {
    rates(currency: "AUD") {
      currency
      rate
    }
  }
`;

const EXCHANGE_RATES_REST = gql`
  query GetExchangeRates {
    openExchangeRates
      @rest(
        type: "openExchangeRates"
        path: "/latest"
        endpoint: "openExchangeRate"
      ) {
      rates
    }
  }
`;

function ExchangeRate() {
  const useQueryMultiple = () => {
    let resHttp = useQuery(EXCHANGE_RATES_HTTP, {
      context: { clientName: "http" },
    });

    let resRest = useQuery(EXCHANGE_RATES_REST, {
      context: { clientName: "rest" },
    });

    if (
      resRest?.data?.openExchangeRates?.rates &&
      Object.keys(resRest.data.openExchangeRates.rates).length > 0
    ) {
      resRest.data = {
        rates: Object.entries(resRest.data.openExchangeRates.rates).reduce(
          (prev, current) => {
            return prev.concat({ currency: current[0], rate: current[1] });
          },
          []
        ),
      };
    }

    return [resHttp, resRest];
  };

  const [resHttp, resRest] = useQueryMultiple();
  const { data, error, loading } = resHttp;
  const { data: restData, error: restError, loading: restLoading } = resRest;

  if (loading) {
    return <div>Loading</div>;
  }

  console.log(data, restData);

  if (error) {
    console.log("gql http link error ", error.message);

    if (restLoading) {
      return <div>Loading</div>;
    }

    if (restError) {
      console.log("gql http link error ", restError.message);
    }

    return restData.rates.map(({ currency, rate }) => (
      <div key={currency}>
        <p>
          {currency}: {rate}
        </p>
      </div>
    ));
  }

  return data.rates.map(({ currency, rate }) => (
    <div key={currency}>
      <p>
        {currency}: {rate}
      </p>
    </div>
  ));
}

export default ExchangeRate;
