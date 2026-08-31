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

    // Return first 10 cells for debugging
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: res.status,
        sheetCount: data.sheets?.length,
        sheets: data.sheets,
        cellCount: data.cells?.length,
        firstCells: data.cells?.slice(0, 15),
      }),
    };
  } catch (err) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
