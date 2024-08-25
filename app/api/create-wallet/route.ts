export async function POST(req: Request) {
  const { mnemonic } = await req.json();
  const wallet = await mnemonic.toWallet();
  return new Response(JSON.stringify(wallet), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
