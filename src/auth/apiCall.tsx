export const INTRA_DAILY_API_CALL = (symbol: string) => {
  const API_CALL = `http://localhost:4000/intradaily/${symbol}`;

  return new Promise((resolve, reject) => {
    fetch(API_CALL)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        resolve(res.json());
      })
      .catch(err => {
        reject(err);
      })
  })
};

export const DAILY_API_CALL = (symbol: string) => {
  const API_CALL = `http://localhost:4000/daily/${symbol}`;

  return new Promise((resolve, reject) => {
    fetch(API_CALL)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        resolve(res.json());
      })
      .catch(err => {
        reject(err);
      })
  })
};

export const WEEKLY_API_CALL = (symbol: string) => {
  const API_CALL = `http://localhost:4000/weekly/${symbol}`;

  return new Promise((resolve, reject) => {
    fetch(API_CALL)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        resolve(res.json());
      })
      .catch(err => {
        reject(err);
      })
  })
};

export const MONTHLY_API_CALL = (symbol: string, month: number) => {
  const API_CALL = `http://localhost:4000/monthly/${symbol}/${month}`;

  return new Promise((resolve, reject) => {
    fetch(API_CALL)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        resolve(res.json());
      })
      .catch(err => {
        reject(err);
      })
  })
};

export const YEARLY_API_CALL = (symbol: string) => {
  const API_CALL = `http://localhost:4000/yearly/${symbol}`;

  return new Promise((resolve, reject) => {
    fetch(API_CALL)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        resolve(res.json());
      })
      .catch(err => {
        reject(err);
      })
  })
};

export const FIVE_YEAR_API_CALL = (symbol: string) => {
  const API_CALL = `http://localhost:4000/five-yearly/${symbol}`;

  return new Promise((resolve, reject) => {
    fetch(API_CALL)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        resolve(res.json());
      })
      .catch(err => {
        reject(err);
      })
  })
};

export const OVER_TWENTY_YEAR_API_CALL = (symbol: string) => {
  const API_CALL = `http://localhost:4000/over-twenty-year/${symbol}`;

  return new Promise((resolve, reject) => {
    fetch(API_CALL)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        resolve(res.json());
      })
      .catch(err => {
        reject(err);
      })
  })
};

// Yahoo Finance API call
export const GET_COMPANY_ANALYSIS = (symbol: string) => {
  const API_CALL = `http://localhost:4000/get-company-analysis/${symbol}`;

  return new Promise((resolve, reject) => {
    fetch(API_CALL)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        resolve(res.json());
      })
      .catch(err => {
        reject(err);
      })
  })
};
