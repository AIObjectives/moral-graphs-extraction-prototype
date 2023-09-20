const parse_data = require("./parse_data");
const gpt4 = require("./gpt4");
const fs = require("fs");

const processEthics = async (e, files, prompts) => {
  let values = [];
  for (const { transcript, file_key } of files) {
    const list = await gpt4(
      `${e}_extract_list_${file_key}`,
      prompts[e].extract_list,
      { transcript }
    );
    values = [...values, ...list];
  }
  const clean_list = await gpt4(`${e}_clean_up`, prompts[e].clean_up, {
    values,
  });

  const graphs = [];

  for (const { transcript, file_key, interviewee, video } of files) {
    try {
      const nodes = (
        await gpt4(`${e}_extract_nodes_${file_key}`, prompts[e].extract_nodes, {
          transcript,
          clean_list,
        })
      ).map(({ quotes, score, ...x }) => {
        const label = x.principle || x.value || x.virtue;
        const id = "N" + clean_list.indexOf(label);
        return { id, label, quotes, score };
      });

      graphs[file_key] = { nodes };

      const edges = (
        await gpt4(`${e}_extract_edges_${file_key}`, prompts[e].extract_edges, {
          transcript,
          nodes_json: JSON.stringify(nodes.map((x) => x.label)),
        })
      ).map(({ from, to, quotes, edgeType, explanation }) => ({
        source: "N" + clean_list.indexOf(from),
        target: "N" + clean_list.indexOf(to),
        label: edgeType,
        quotes,
        explanation,
      }));

      graphs.push({
        interviewee,
        video,
        transcript,
        nodes,
        edges,
        clean_list,
      });
    } catch (e) {
      console.log(e.message);
    }
    fs.writeFileSync(
      `../app/src/data/graphs_${e}.json`,
      JSON.stringify(graphs, null, 2)
    );
  }
  console.log(graphs);
};

const main = async () => {
  const { files, prompts } = await parse_data();
  await processEthics("virtue", files, prompts);
  await processEthics("deontological", files, prompts);
  await processEthics("utilitarian", files, prompts);
};

main();
