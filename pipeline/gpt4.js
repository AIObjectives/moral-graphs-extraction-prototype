const OpenAI = require("openai");
const openai = new OpenAI({});
const fs = require("fs");

module.exports = async function gpt4(key, prompt, replace = {}) {
  const cache_file = `./cache/${key}.json`;
  if (fs.existsSync(cache_file)) {
    console.log("Using cached GPT-4 job " + key);
    return JSON.parse(fs.readFileSync(cache_file, "utf8"));
  }
  console.log("Starting GPT-4 job " + key);
  const time = Date.now();
  let content = prompt;
  for (const [key, value] of Object.entries(replace)) {
    content = content.replace(new RegExp(`\\{${key}\\}`, "g"), value);
  }
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content }],
    temperature: 0.0,
    model: "gpt-4",
  });
  console.log(`GPT-4 job ${key} took ${Date.now() - time}ms`);
  if (completion.choices[0].finish_reason === "length") {
    throw new Error("TOO LONG!");
  }
  const json = completion.choices[0].message.content;
  const { fixed, parsed } = await parseOrFixJson(key, json);
  fs.writeFileSync(`./cache/${key}.json`, fixed);
  return parsed;
};

const parseOrFixJson = async (key, res) => {
  try {
    return { fixed, parsed: JSON.parse(res) };
  } catch (e) {
    console.log("GPT-4 produced invalid JSON, trying to fix it...");
    const m1 =
      "You are a JSON fixer. Given an input you remove the fluff and fix the syntax errors before returning valid JSON";
    const m2 = 'Bla bla bla \n```json`n {"key": "value"}\n```\n bla bla bla';
    const m3 = '{"key": "value"}';
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: m1 },
        { role: "user", content: m2 },
        { role: "assistant", content: m3 },
        { role: "user", content: res },
      ],
      model: "gpt-4",
    });
    const json = completion.choices[0].message.content;
    try {
      const parsed = JSON.parse(json);
      console.log("Fixed JSON successfully!");
      return { fixed: json, parsed };
    } catch (e) {
      const fix_file = `./cache/_FIXME_${key}.json`;
      console.error(`Failed to fix JSON -- go fix ${fix_file} by hand`);
      fs.writeFileSync(`./cache/_FIXME_${key}.json`, json);
      throw e;
    }
  }
};
