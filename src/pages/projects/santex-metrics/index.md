---
title: "Santex Metrics"
date: "2018-11-30T23:46:37.121Z"
cover: "screenshot2.png"
---
<br />
Internal project at Santex that allows PMs to track their project's metrics (rework, completion, margin, release count, etc.). These metrics are visualized afterwards in another platform called Grafana. It was a good opportunity for me to learn GraphQL and use it later for bigger projects.
This small (but end-to-end app) handles data queries and mutations, customized authentication through Firebase, local sorting and filtering, Material UI components, and autocomplete components using Downshift. It was also a good place to start playing with functional programming concepts.
All the data is sorted, and filtered through data pipelines which are composed curried functions with lodash/fp.

#### Tech stack
Javascript (ES2015), React.js, Node.js, GraphQL, Apollo, ESLint, Lodash FP, Firebase Auth, MySQL, Sequelize ORM, Functional Programming

#### Screenshots

![](screenshot1.png)

![](screenshot2.png)

![](screenshot3.png)

![](screenshot4.png)
