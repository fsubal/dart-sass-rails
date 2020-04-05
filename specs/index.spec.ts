import fs from "fs";
import glob from "glob";
import path from "path";
import { execSync } from "child_process";

describe("dartSassRails", () => {
  beforeAll(() => {
    execSync(
      "yarn webpack --config specs/example/webpack.config.ts --mode=development --env=development"
    );
  });

  it("no diffs are present", () => {
    const files = glob.sync(
      path.join(__dirname, "example", "public", "bundles", "*.css")
    );
    if (files.length === 0) {
      throw new Error("no bundles found");
    }

    const stylesheets = files.map((file) => fs.readFileSync(file).toString());

    expect(stylesheets).toMatchSnapshot();
  });
});
