"use client";

import { useState } from "react";

async function getData() {
  const res = await fetch(
    "https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty/17049059"
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default function Page() {
  const [data, setData] = useState({});
  const [search, setSearch] = useState("");

  const searchData = async () => {
    const data = await getData();
    setData(data);
  };

  return (
    <main>
      <input
        type="text"
        value={search}
        onChange={(event) => setSearch(event.currentTarget.value)}
      />
      <button onClick={searchData}>Vyhledat</button>
      <p>{JSON.stringify(data)}</p>
    </main>
  );
}
