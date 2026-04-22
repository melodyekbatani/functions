# Functions

## Introduction
This project was created for Typography & Interaction in the Parsons MPS Communication Design program, taught by Michael Fehrenbach and Eric Li. The assignment was to create a solution to a problem or a tool using web technologies while focusing on clear user inputs and outputs. 

Using this framework, I developed a playful interface that generates a “girl dinner” based on items a user has in their fridge. The user selects ingredients from each of the four categories and as a result, the site selects the most ideal girl dinner pairings and provides the plate’s personality type. 

## Live Link
[https://melodyekbatani.github.io/functions/](https://melodyekbatani.github.io/functions)

## Tech Stack 
HTML
CSS
JavaScript

## Timeline
6 weeks

## Overview
Girl dinner is a term coined by TikTok creator Olivia Maher, a Castleton University graduate, in a video she posted on May 11, 2023. She posted a video showing herself eating a spread of bread, cheese, pickles, grapes, and other snacks and jokingly called it "girl dinner". The idea quickly went viral, with people across social media using the phrase to describe improvised, snack-style meals cobbled together from whatever they have at home. Historically, these kinds of "scraps-plated" dinners have existed long before the term, but giving them a name both celebrated and made visible a pattern of casual, low-effort dining.

When this trend first emerged, I noticed I had been unknowingly engaging in the “girl dinner” for years. I believe that a person's taste in food says a lot about their personality, and I wanted to create a relatable current experience around that. The interface transforms ingredient selections into a composed plate and personality reading, exploring how small everyday decisions can generate playful insights about identity and taste.

## Core Functionality 
The project walks users through the four essential elements of a Girl Dinner: base, protein, crunch, and sweets, one category at a time. In each step, the user selects ingredients from that section. Every item is tagged with a plate vibe and a short descriptive word. The ingredient data is stored externally in a JSON dataset that I designed using a Google Sheets document. 
Once the user moves through all the modals, the generator looks at the list of selected ingredients and calculates the dominant vibe across them. The final screen reveals the generated plate along with its Girl Dinner personality type and a playful line that begins with “You’re giving…”, which pulls together the descriptive words assigned to each selected food.

## Results
The project is structured as a sequence of interactive steps that guide the user from interaction to outcomes. Between each modal, I added a slide animation to give the cards more depth and more of a swiping interaction to play into the overall design concept. 

Selecting the items also functions as a toggle with an active and inactive state, so if the user clicks one by mistake, they can go back. At the same time, the design is meant to move the user through the process as a linear path from input to output, creating a clear and digestible user flow locked into the viewport height. 

## Visual Design
The visual design leans into the “playfully chaotic and fun nature of the girl dinner, through the use of bright colors, sticker-like food imagery, and background patterns. The website is typeset in RL Horizon, a slab serif font that plays with softness and contrast, originally designed by Radek Lukasiewicz. You can find more on the typeface here: https://www.radluka.com/rl-horizon 

The interaction style is designed to enforce the idea of picking food rather than filling out a form. The plate also acts as a central motif of the design, inspired by the cafeteria plate, reinforcing the idea that the user is building a dinner piece by piece. I also thought about the favicon, metadata, and iconography as an extension of the website, integrating the brand identity and colors. 

## Approach to Responsive Design
I designed the website across 2 key breakpoints, working up from the mobile experience. Typography, spacing, and image sizing were adapted to better suit desktop sizes while remaining thumb-tappable on devices. 

## Experiments
The project went through several conceptual and interaction iterations. Early versions used a scroll-based interface inspired by browsing foods at Trader Joe’s. Over time, the concept shifted toward a simpler ingredient selection system based on foods commonly seen in girl dinner videos on TikTok.

## Next Steps
If I had more time, I’d push the interaction further. I’d also love to expanded the ingredient dataset and introduce additional personality outcomes to create more varied results. The interaction could also be extended through more fun animations and elements.
