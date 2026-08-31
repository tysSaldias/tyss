declare const process: { env: Record<string, string | undefined> };

exports.handler = async (event) => {
  const token = process.env.ROOTERVALIS_API_KEY;

  if (!token) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "No ROOTERVALIS_API_KEY set" }),
    };
  }

  try {
    const res = await fetch(
      "https://api.rootervalis.com/api/spreadsheets/c048f7a4-3770-47ee-9ed7-9553bd4b45be/data",
      { headers: { "X-API-Key": token } }
    );

    const data = await res.json();

    // Find SKU cells and show their exact values + char codes
    const skuCells = data.cells.filter(
      (c) => c.row === "1" || c.row === 1 // header + first data row
    );

    const skuValues = data.cells
      .filter((c) => (c.row === "1" || c.row === 1) && (c.col === "2" || c.col === 2))
      .map((c) => ({
        value: c.value,
        type: typeof c.value,
        charCodes: String(c.value).split("").map((ch) => ch.charCodeAt(0)),
        length: String(c.value).length,
      }));

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ skuValues }),
    };
  } catch (err) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
