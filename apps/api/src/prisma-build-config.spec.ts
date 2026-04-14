import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("nest build config", () => {
  it("copies generated prisma client assets into dist for runtime", () => {
    const configPath = resolve(process.cwd(), "nest-cli.json");
    const config = JSON.parse(readFileSync(configPath, "utf8")) as {
      compilerOptions?: {
        assets?: Array<{ include?: string; outDir?: string; watchAssets?: boolean }>;
      };
    };

    expect(config.compilerOptions?.assets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          include: "generated/prisma/**/*",
          outDir: "dist",
        }),
      ]),
    );
  });
});
