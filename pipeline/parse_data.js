const { glob } = require("glob");
const fs = require("fs");

module.exports = async () => {
  const files = (await glob("../data/*.txt")).map((x) => {
    const transcript = fs.readFileSync(x, "utf8");
    const interviewee = transcript.split("\n")[0].trim();
    return {
      file_key: interviewee.replace(/[^a-zA-Z]/g, ""),
      path: x,
      interviewee,
      video: transcript.split("\n")[1].split(": ")[1].trim(),
      transcript,
    };
  });
  const ethics = (await glob("../prompts/*")).map((x) => {
    return { path: x, name: x.split("/")[2].split("_")[0] };
  });
  const prompts = {};
  ethics.forEach(({ path, name }) => {
    prompts[name] = {};
    for (const key of [
      "extract_list",
      "clean_up",
      "extract_nodes",
      "extract_edges",
    ]) {
      try {
        prompts[name][key] = fs.readFileSync(`${path}/${key}.txt`, "utf8");
      } catch (e) {
        console.log(e.message);
      }
    }
  });
  return { files, ethics, prompts };
};
