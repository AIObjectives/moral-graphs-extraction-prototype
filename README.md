# Heal-Michigan Moral Graphs

## TL;DR: 

This repo contains some code and code and screenshots produced duing an AOI hackathon. 

The idea was to try and use LLMs to extract different type of "moral graphs" using the transcripts of interviews collecting during [AOI's Heal Michigan Project](https://ai.objectives.institute/blog/using-ai-to-give-people-a-voice-a-case-study-in-michigan). 

These moral graphs aim to provide a a visual summarize if the different values that different participants decided to emphacise during the interviews. 
The edges of the graph show how different participants seem to connect different values with each other. 

We looked at three different kinds of values (deontological, utilitarian, and virtues). 

More details: 

- we're using GPT-4 to extract moral graphs from the transcripts
- the colors of the dots correspond to different values
- the size of the dots correspond to the score/strength of the value
- you can hover on a dot to look at relevant quotes from original transcript
- you can move the dots around manually (there is no automatic layout algorithm)

### Comparing different types of ethics

The following graphs are for the same interviewee, but using three different set of prompts respectively from `./promts/deontological_ethics`, `./prompts/utilitarian_ethics`, and `./prompts/virtue_ethics`.

<img width="1150" alt="image" src="https://github.com/AIObjectives/moral-graphs-extraction-prototype/assets/3934784/75a0c0d7-36a1-4650-9c2f-6d7662512a41">

<img width="1249" alt="image" src="https://github.com/AIObjectives/moral-graphs-extraction-prototype/assets/3934784/d1592ba2-3a5d-4ee5-ac41-2678be87b58e">

<img width="1283" alt="image" src="https://github.com/AIObjectives/moral-graphs-extraction-prototype/assets/3934784/dadd0d7d-c8f1-49a4-926b-7ae7ee7bf413">

### Comparing two people

The following graphs are for two different participants. Note how they agree on several principles but not all. They put different weights on different things and they draw different edges.

<img width="1284" alt="image" src="https://github.com/AIObjectives/moral-graphs-extraction-prototype/assets/3934784/78082987-0646-4f05-ac0a-7eff334365d0">

<img width="1303" alt="image" src="https://github.com/AIObjectives/moral-graphs-extraction-prototype/assets/3934784/2a2a6658-23af-4606-87ae-4c1d5c935512">


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
