---
path: "/blog/focus-using-tags-in-mix-test"
date: "2020-06-03"
title: "Focus using tags in mix test"
---

When writing or debugging tests in Elixir, I often need to focus on just one test.

The `mix test` documentation shows a few ways to accomplish that using [Filters](https://hexdocs.pm/mix/Mix.Tasks.Test.html#module-filters). Probably the most common one, the test's filename and line number, for example `mix test test/some/particular/file_test.exs:12`, can be used to run that specific test.

If I need to edit the test and rerun, my test may not contain line 12 anymore, so I would need to change the line number in the `mix test` command. With a more difficult test, changing the line number over and over gets annoying.

A line-number-agnostic way to focus is uses tags and filters.

I add a `@tag focus: true` above the test I'm focusing on, like:

```elixir
@tag focus: true
test "the best feature ever" do
  assert my_feature == "best"
end
```

Then, on the command line, I use the `--only` flag to say only run the tests with my tag:

```shell
$ mix test --only focus:true
Excluding tags: [:test]
Including tags: [focus: "true"]

.

Finished in 0.06 seconds
4 tests, 0 failures, 3 excluded

Randomized with seed 418541
```
