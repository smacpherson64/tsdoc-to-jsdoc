import { transpileFile } from "ts-to-jsdoc";

onmessage = function (event) {
  if (!event.data) return;
  if (typeof event.data !== "string") return;
  // Ensure the code ends with a semi colon and a new line.
  // This seems to make for better parsing.
  const input = `${event.data.trim()};\n`;

  try {
    const transpiledResult = transpileFile({ code: input, inMemory: true });

    // Ensure all lone semi colons are removed.
    const result = transpiledResult.replace(/^;\n/gm, "");

    postMessage({ status: "success", result });
  } catch (error) {
    postMessage({ status: "error", error });
  }
};
