interface AresJsonSchema {
  obchodniJmeno: string;
  ico: string;
  dic: string;
  sidlo: {
    nazevUlice: string;
    nazevObce: string;
    cisloDomovni: string;
    cisloOrientacni: string;
    psc: string;
    nazevStatu: string;
  };
}

export async function getData(ico: string) {
  const res: AresJsonSchema = await fetch(
    `https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty/${ico}`
  ).then((res) => res.json());

  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error("Failed to fetch data");
  // }

  const street = res.sidlo.nazevUlice ?? res.sidlo.nazevObce;
  const unitNo = `${res.sidlo.cisloDomovni}${
    res.sidlo.cisloOrientacni ? "/" + res.sidlo.cisloOrientacni : ""
  }`;

  const format = {
    label: res.obchodniJmeno,
    ico: res.ico,
    dic: res.dic,
    street: `${street} ${unitNo}`,
    city: res.sidlo.nazevObce,
    postalCode: res.sidlo.psc,
    country: res.sidlo.nazevStatu,
  };

  return format;
}
