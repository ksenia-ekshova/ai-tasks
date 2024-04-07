import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type Data = {
  imageUrl: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { fullPrompt } = JSON.parse(req.body);

  const { size } = JSON.parse(req.body);

  const image = await openai.images.generate({
    model: "dall-e-2",
    prompt: fullPrompt,
    n: 1,
    size: size,
  });

  const imageUrl = image.data[0].url ?? "";

  return res.json({ imageUrl });
}
