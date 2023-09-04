let functionId = "3EK6nRfgJFYkBEwGmayIjQxa9ZKLf_YU5xJYUjOL2fk" // replace with your function id

export async function GET({ request }: { request: Request }) {
  try {
    const response = await fetch(`https://api.mem.tech/api/state/${functionId}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    let result;
    const responseText = await response.text();

    if (responseText) {
      result = JSON.parse(responseText);
    } else {
      result = null;
    }

    return new Response(JSON.stringify({
      data: result
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

export async function POST({ request }: { request: Request }) {
  const data = await request.json();

  console.log("-----", data)
  try {
    const result = (
      await fetch(
        "https://api.mem.tech/api/transactions", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          functionId: functionId,
          input: [data]
        })
      }).then(res => res.json())
    );

    return new Response(JSON.stringify({
      response: result
    }), {
      status: 200
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
