# Heal-Michigan Moral Graphs

### Overview

- the input data consist of transcripts from Silent Cry (Heal Michigan)
- we're using GPT-4 to extract moral graphs from the transcripts
- we're trying 3 different types of ethics (deontological, utilitarian, and virtues)
- the colors of the dots correspond to different values
- the size of the dots correspond to the score/strength of the value
- you can hover on a dot to look at relevant quotes from original transcript
- you can move the dots around manually (there is no automatic layout algorithm yet)

### To start the interface

```
cd app
npm start
```

### Different types of ethics

The following graphs are for the same interviewee, but using two different set of prompts respectively from `./promts/deontological_ethics` and `./prompts/utilitarian_ethics`.

<img width="995" alt="image" src="https://github.com/AIObjectives/moral-graphs-silent-cry/assets/3934784/df933bfe-aaa3-4da9-839b-a552b72f5ab3">

<img width="965" alt="image" src="https://github.com/AIObjectives/moral-graphs-silent-cry/assets/3934784/dafcd51d-9937-459b-892e-11dc286a65a2">

The following graphs are for the same interviewee, but using three different set of prompts respectively from `./promts/deontological_ethics`, `./prompts/utilitarian_ethics`, and `./prompts/virtue_ethics`.

<img width="758" alt="image" src="https://github.com/AIObjectives/moral-graphs-silent-cry/assets/3934784/9af117e8-6bd4-460e-b76d-cdc10650e797">

<img width="916" alt="image" src="https://github.com/AIObjectives/moral-graphs-silent-cry/assets/3934784/ba292eff-d3df-44c9-84e9-b4ab2875f4ba">

<img width="913" alt="image" src="https://github.com/AIObjectives/moral-graphs-silent-cry/assets/3934784/56430d6e-6a47-4661-b54f-db56d0402695">

### Comparing two people

The following graphs are for two different participants. Note how they agree on several principles but not all. They put different weights on different things and they draw different edges.

<img width="1021" alt="image" src="https://github.com/AIObjectives/moral-graphs-silent-cry/assets/3934784/e660ae13-e8cd-46d3-8b48-ea61753d9c10">

<img width="963" alt="image" src="https://github.com/AIObjectives/moral-graphs-silent-cry/assets/3934784/5c51aaaf-7bec-4265-b1fb-3fa69a3b8f58">


### How to re-run the pipeline (if you really want to)

Here's how you'd re-run the pipeline after changing the data or the prompts:

```
cd pipeline
npm i
rm cache/*
OPEN_AI_KEY="...." node main.js # <-- SLOW !!!!
```
