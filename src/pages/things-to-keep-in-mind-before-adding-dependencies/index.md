---
title: "Things to keep in mind before adding another software dependency to your project"
date: "2017-01-20T23:46:37.121Z"
---

![](dependencies.jpg)

In my work experience, one basic thing I learned about software engineering is that you don’t need to “reinvent the wheel” every time you want to achieve some functionality. Open source projects have revolutionized the way we work in that we can reutilize existing software in addition to collaborating with others devs. In the web-development ecosystem, there are plenty of frameworks and tools that already simplify things like user authentication, routes, templating (client-side and server-side), state-management, database queries, web sockets, etc. On the other hand, however, sometimes the existing solutions are just not good enough or it may be that there are no alternatives at all, but that’s a completely different story.

The ability to know when to implement the feature yourself and when to use an existing solution will be a crucial asset for your team. Adopting a new library, language or technology as a dependency to build your product without extensive research could become headache in the future, so you should always ask yourself at least these questions about it:

#### Does it meet all your needs?
Sometimes you’ll find a solution for your problem that does not cover all the specific features you need. In that case, you might have to deal with forking and extending it (if it’s an open source project), and this means greater time investments and costs. Are your team and the client prepared for this scenario?

#### Is there any documentation?
If so, is it well documented? Just as an example, one of the things I like the most about Django (web framework) is the quality they put into the docs. It’s remarkably easy to find the topics you need for the framework version you’re using. https://docs.djangoproject.com/en/.

#### Is it supported by a “big” community and/or a private company?
Having a company or a community behind it helps a lot when you’re having trouble and need assistance from others. You may have to send a “help-desk” ticket (probably if it’s a paid service), find information on blogs or StackOverflow, or maybe even post a question to those sites. If you’re relying on the community to help you, your chances of being helped are proportional to the popularity of the software dependency.

#### Is it an “external service”?
If you rely on services like “Google Maps API”, “Facebook Graph API”, “Google’s Firebase”, etc. be aware that they may change in the future without notice, or they could just stop working at any time (temporarily or permanently). SaaS/BaaS solutions are great but you should think twice before setting them up as a critical piece of your system. Just as an example, read about what happened to Facebook’s Parse: (https://techcrunch.com/2016/01/28/facebook-shutters-its-parse-developer-platform/).

#### Is it actively maintained and improved?
If hosted on Github, “Pulse” and “Graphs” tabs will give you an idea of the latest activity. You probably don’t want to set up an outdated library, because it could bring retrocompatibility issues to your project. Also, if it’s constantly evolving, sometimes it could mean you’ll have to update your code repeatedly.

#### Is it tested?
Some libraries use automated tools to build and test every change that is introduced (applying continuous integration tools like Travis CI, Circle CI, etc.). This makes the library more reliable.

#### Are you compromising another dependency if you adopt this new library?
Sometimes libraries don’t play well together.

#### Will it affect your product’s performance, speed, size, etc.?
You should always take this into consideration. In the “web environment”, a giant front-end library could affect the browser’s performance and also increase network transfer times. On the back-end side, you want to avoid server overloading. In the mobile world, things get even more critical because mobile phones don’t have as many resources as a desktop computer. In Android, an app that wastes memory and CPU is a real candidate to be killed automatically by the operating system.

## Finishing!
Every product relies on dependencies (whether it’s an OS, a service, a framework, a library or some other kind of software). The goal is to pick the best ones to maximize your productivity, without affecting your product’s performance, scalability, and capacity to evolve over time.