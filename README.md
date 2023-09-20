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

### How to re-run the pipeline (if you really want to)

Here's how you'd re-run the pipeline after changing the data or the prompts:

```
cd pipeline
npm i
rm cache/*
OPEN_AI_KEY="...." node main.js # <-- SLOW !!!!
```
