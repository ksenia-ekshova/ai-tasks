"use client";

import { Grid } from "@mui/material";
import Image from "next/image";
import { themes } from "./constants";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-10">Painting themes</h1>
      <Grid container spacing={4}>
        {themes.map((theme) => (
          <Grid key={theme.title} item xl={3} lg={3} md={3} sm={4} xs={6}>
            <Link href={`/theme/${theme.id}`} passHref>
              <div
                className="flex flex-col gap-[8px] items-center card"
                style={{ position: "relative", width: 275, height: 175 }}
              >
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={theme.src}
                  alt="image"
                />
              </div>
            </Link>
            <p style={{ fontSize: "22px" }}>{theme.title}</p>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
