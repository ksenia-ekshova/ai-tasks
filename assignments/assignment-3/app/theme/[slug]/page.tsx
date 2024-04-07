"use client";

import { themes } from "@/app/constants";
import { Button, Grid, TextField, Select, MenuItem } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

interface Props {
  params: {
    slug: string;
  };
}

export default function Theme({ params }: Props) {
  const { slug } = params;

  const [size, setSize] = useState('256x256');
  const [imageSize, setImageSize] = useState(256);
  const [shortPrompt, setShortPrompt] = useState("");
  const [fullPrompt, setFullPrompt] = useState("");
  const [isFullPromptLoaded, setIsFullPromptLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [error, setError] = useState("");

  const selectedImage = themes.find(
    (theme) => theme.id === parseInt(slug as string)
  );

  const handleGenerateFullDescription = async () => {
    setFullPrompt("Generating...");

    const paintingTheme = themes.find(
      (theme) => theme.id === parseInt(slug as string)
    )?.title;

    const response = await fetch(`/api/generate-prompt`, {
      method: "POST",
      body: JSON.stringify({
        shortPrompt: `The painting theme/genre is ${paintingTheme}. Create the description considering the mentioned genre. ${shortPrompt}`,
      }),
    });

    const data = await response.json();

    if (data?.result) {
      setFullPrompt(data.result);
      setIsFullPromptLoaded(true);
    } else {
      setFullPrompt("Failed to generate prompt");
      setIsFullPromptLoaded(false);
    }
  };

  const handleGenerateImage = async () => {
    setImageUrl("");
    setIsImageLoading(true);

    try {
      const response = await fetch(`/api/generate-image`, {
        method: "POST",
        body: JSON.stringify({ fullPrompt, size }),
      });

      const data = await response.json();

      if (data?.imageUrl) {
        setImageUrl(data?.imageUrl);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsImageLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-10">
        Generate an image
      </h1>
      <Grid container spacing={12}>
        <Grid item xl={3} lg={3} md={3} sm={4} xs={4}>
          <div
            className="flex flex-col gap-[8px] items-center"
            style={{ position: "relative", width: 300, height: 300 }}
          >
            <Image
              className="rounded-lg"
              layout="fill"
              objectFit="cover"
              src={selectedImage?.src ?? "/type1.webp"}
              alt="winter"
            />
            <p>{selectedImage?.title ?? "Landscape"}</p>
          </div>
        </Grid>
        <Grid item xl={9} lg={9} md={9} sm={8} xs={8}>
          <div className="flex flex-col gap-[24px] items-center padding-24">
            <p className="text-2xl font-bold">
              What kind of image you wanna generate?
            </p>

            <TextField
              sx={{ width: "500px" }}
              id="outlined-multiline-static"
              label="Short prompt"
              multiline
              rows={4}
              placeholder="Type here..."
              value={shortPrompt}
              onChange={(e) => setShortPrompt(e.target.value)}
            />

            <Button
              style={{ textTransform: "capitalize" }}
              variant="contained"
              color="primary"
              onClick={handleGenerateFullDescription}
            >
              Generate detailed prompt
            </Button>

            {fullPrompt && (
              <div
                style={{
                  width: 500,
                  backgroundColor: "#cccccc",
                  padding: 16,
                }}
              >
                {fullPrompt}
              </div>
            )}

            {isFullPromptLoaded && (
              <Button
                style={{ textTransform: "capitalize" }}
                variant="contained"
                color="primary"
                onClick={handleGenerateImage}
              >
                Generate image
              </Button>
            )}

            {isFullPromptLoaded && (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={imageSize || 256}
                onChange={(e) => setImageSize(Number(e.target.value))}
              >
                <MenuItem value={256}>256x256</MenuItem>
                <MenuItem value={512}>512x512</MenuItem>
                <MenuItem value={1024}>1024x1024</MenuItem>
              </Select>
            )}

            <div className="mb-24">
              {error ? (
                <p className="text-red-500">{"Ups! Something went wrong: "}</p>
              ) : (
                <>
                  {isImageLoading && (
                    <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12" />
                  )}
                  {imageUrl && (
                    <div className="flex items-center justify-center">
                      <Image
                        className="rounded-lg"
                        width={imageSize}
                        height={imageSize}
                        src={imageUrl}
                        alt="generated"
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
