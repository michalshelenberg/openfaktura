import * as cheerio from "cheerio";
import { NextResponse } from "next/server";
import * as request from "request";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search");

  const data = await getData(search);

  const result = data.map((company) => {
    return { label: company["Název subjektu:"], ico: company["IČO:"] };
  });

  return NextResponse.json(result, { status: 200 });
}

function getData(companyName) {
  return new Promise((resolve, reject) => {
    request(
      "https://or.justice.cz/ias/ui/rejstrik-dotaz?dotaz=" +
        encodeURIComponent(companyName),
      (error, response, body) => {
        if (!error && response.statusCode == 200) {
          var results = [];
          const $ = cheerio.load(body);
          $(".search-results li.result").each((i, elem) => {
            var company = {};
            $(elem)
              .find("th")
              .each((j, cell) => {
                var key = $(cell).text().trim();
                company[key] = $(cell).next().text().trim();
              });
            results.push(company);
          });
          resolve(results);
        } else {
          reject(error);
        }
      }
    );
  });
}

// getData("Seznam", function (data) {
//   console.log(data);
// });
