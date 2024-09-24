export async function FetchAres(ico: string) {
  const data = await fetch(
    `https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty/${ico}`
  ).then((res) => res.json());

  let street = data.sidlo.nazevUlice ?? data.sidlo.nazevObce;
  street += " " + data.sidlo.cisloDomovni;
  street += data.sidlo.cisloOrientacni ? "/" + data.sidlo.cisloOrientacni : "";

  return {
    name: data.obchodniJmeno,
    ico: data.ico,
    dic: data.dic,
    street: street,
    city: data.sidlo.nazevObce,
    psc: data.sidlo.psc,
    country: data.sidlo.nazevStatu,
  };
}
