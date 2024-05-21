import * as cheerio from "cheerio";
import { NextResponse } from "next/server";
import * as request from "request";

export async function GET() {
  const data = await getData("Greenpeace");
  console.log(data);

  return NextResponse.json(data, { status: 200 });
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
