export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const companyName = searchParams.get("companyName");

        const data = await searchJustice(companyName);
        const result = data.map((company) => {
            return {
                label: company["Název subjektu:"].replace(/\'/g, '"'),
                ico: company["IČO:"],
            };
        });
        return NextResponse.json(result, { status: 200 });
        // return NextResponse.json({ message: "Fetch failed" }, { status: 400 });
}

function searchJustice(companyName) {
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