---
title: "Git Basics: Pull Requests"
date: "2018-10-13T23:46:37.121Z"
---

![](https://cdn-images-1.medium.com/max/800/1*2nuioCxg2o7II-XfLLZ3hQ.jpeg)

Git is a powerful version-control system designed to make software development
collaboration easy. It can be used for personal (single contributor)
repositories, but it really stands out in projects where multiple developers
modify the same codebase every day. Multiple branching models can be adopted.
However, in most cases, a Pull Request (PR) will be created when a bug fix or a
new feature is ready to be merged into the main branch. The PR itself is an
attempt to merge specific changes from one branch to another. Let’s explore the
Pull Request workflow in detail.

### PR Creation

Whenever a PR is created, the following good practices should be considered:

* **Adding a helpful description to the PR** that answers the following questions:
What is the requirement or bug? Is there a link to the issue (e.g. on JIRA)? How
does your code fix it? Is there anything else the reviewer should take into
consideration?
* Making **small, consistent and logical PRs**: We want our PR to be merged as
soon as possible. Imagine how hard it would be to review hundreds of file
changes at the same time. If this happens, it is likely that the reviewer won’t
even have the time to do it properly. So try to keep it simple and concise.
* Making sure the PR’s metadata has been set. For example, by assigning the
reviewer (to trigger a notification), setting the assignees, adding a label (if
needed), etc.
* Configuring the repo’s branching security settings to keep developers away from
self-merging their PRs or pushing to a shared base branch. I recommend enforcing
Github’s branching security settings. When a large team of devs is collaborating
in the same repo, accidents may happen. A single miss click in a “merge” button
can cause terrible headaches. Protecting important branches is something I’d
advise most of the times.
* Avoiding submissions that include unresolved conflicts. Fixing those conflicts
shouldn’t be a reviewer’s responsibility. PR creators should dedicate time to
solve them either by using Github’s conflict resolution tool (when it’s simple
enough) or by using your favorite diff tool locally. You can achieve this by
pulling the base branch and merging it into your feature branch. After you
pushed it to the remote repo, the PR will automatically update.

### Automated tests

If a Continuous Integration system (such as Jenkins, Travis, or CircleCI) is set
up, a bunch of hooks can be configured to run unit tests on PR creation. This
will allow the team to detect and catch bugs rapidly, as well as prevent
conflictive code from being merged. This is a long topic that requires its own
blog post, so I’ll just move on to the following stages.

### Code Review

After everything related to the creation of the PR is dealt with and the CI
tests passed, it is time for a code review. Projects tend to have tight
deadlines, which sometimes makes code reviews seem like a waste of time by other
team members or external agents. Ironically, code revisions actually help to
increase productivity and reduce rework because we avoid bad practices in our
code and share knowledge between contributors.

Some benefits of implementing code reviews are:

* Less experienced devs get to learn from their mistakes.
* Experienced developers consolidate their knowledge as they teach others.
* A high-quality codebase is ensured.

### Humility: a soft skill that matters

Sometimes, as work starts to accumulate and things get tense, some engineers
tend to become less aware of their attitude towards their peers. It is always
important to avoid egocentric behavior, listen to our co-workers, and moderate
our communication when reviewing other people’s work. If we write a PR review in
a disrespectful/arrogant manner, we could be damaging the team’s confidence and
the work environment.

### The “reviewer” role

Ideally, teams should implement peer reviews. This means that anyone should have
the required experience and skills to review other’s code. In practice,
collaborators regularly have different levels of experience on both the
technology used for the project and the codebase itself, including its set-up,
architecture, code styling, deployment, etc. In this case, experienced
developers should be conducting the reviews and newer team members should be
included progressively as they get comfortable with the project.

### Merging the PR

After the PR was approved, it’s time to merge it. We have a couple of options to
do so. Let’s explore them:

* **Create a Merge Commit (default):** This option will merge all the commits from
the feature branch **plus a new merge commit**. This is the safest way to
perform the merge, since it is a “non-destructive” operation. The downside of
using this option is that since it creates a merge commit to tying together the
history of both branches, it pollutes your history tree with multiple
“irrelevant commits”.
* **Squash and Merge:** This option will “squash” all the commits into a single
one. If the PR includes a lot of commits, this could be the way to go. It will
make your history tree much cleaner and easier to read in your base branch.
Nevertheless, you will lose granularity due to the bigger size of the resulting
commit.
* **Rebase and Merge:** The “rebase” operation is another way to combine commits
from two different branches. This will put your feature branch commits on top of
your base branch’s latest commit, and effectively rewrite the commit history.
After this, it will perform a fast-forward merge, making it look like all the
work was done on the base branch. This is extremely dangerous when the rewritten
branch is public and shared with other team members. Generally,** the rule of
thumb is to keep rebasing operations for private-only branches.**

**Originally published at [santexgroup.com](https://santexgroup.com/blog/git-basics-pull-requests/)** on
October 10, 2018.
