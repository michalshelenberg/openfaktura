export async function fetchAres(ico: string) {
  const data = await fetch(
    `https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty/${ico}`
  ).then((res) => res.json());

  const billFrom = {
    label: data.obchodniJmeno,
    ico: data.ico,
    dic: data.dic,
    addrLine1:
      (data.sidlo.nazevUlice ?? data.sidlo.nazevObce) +
      " " +
      data.sidlo.cisloDomovni +
      (data.sidlo.cisloOrientacni && "/" + data.sidlo.cisloOrientacni),
    addrLine2: `${data.sidlo.psc} ${data.sidlo.nazevObce}`,
    postalCode: data.sidlo.psc,
    country: data.sidlo.nazevStatu,
  };

  return data;
}
