---
path: "/blog/iex-open-setup-for-vscodium-vscode"
date: "2020-05-20"
title: "Elixir and IEx open command and VSCodium/VSCode"
---

In Elixir, IEx has many conveniences which make it easy to debug/navigate your code. One convenience is `IEx.Helpers.open/1`, which will open up your editor to where a given module.function/arity is defined.

For example, if my project has a file like:

```elixir
# lib/samplemodule.ex
defmodule SampleModule do
  # other definitions
  def sample_function() do
    # do useful things
  end
end
```

In IEx, I can do:

```shell
iex(1)> open SampleModule.sample_function/0
```

which runs something like:

```shell
$ editor_executable /Users/mat/projects/open-sample/lib/samplemodule.ex:4
```

which will open my editor, open `samplemodule.ex` and put the cursor on line 4.

During compilation, Elixir stores information about where each function is defined from the source code. `open/1` pieces that information back together and and passes it to the editor. If you're interested in see how, you can look at `open/1`'s source: `iex(1)> open open/1`

Recently, I tried to use `open/1`, and quickly realized, I didn't have it setup properly for use with VSCodium (the fully open-sourced, telemetry-free version of Visual Studio Code; see [https://vscodium.com/](https://vscodium.com/) for more info).

Referencing the `open/1` [documentation](https://hexdocs.pm/iex/IEx.Helpers.html#open/1), I needed to setup a few things. Here's how.

1. Install the codium/code executable for the command line.

For VSCodium, this executable is `codium`; for VSCode, its `code`. The executable already exists in the VSCodium app, however, it needs to be added somewhere in your PATH to be useable.

Thankfully, VSCodium has a command to make it easy. Follow the instructions for [lauching from the command line](https://code.visualstudio.com/docs/setup/mac#_launching-from-the-command-line). For VSCodium users, substitute `codium` instead of `code` when typing commands.

2. Export the `ELIXIR_EDITOR`/`EDITOR` shell variable

Now the editor executable is installed, Elixir and IEx need to know about it. As per the `open/1` [documentation](https://hexdocs.pm/iex/IEx.Helpers.html#open/1) from above, IEx uses the `ELIXIR_EDITOR` variable, or if that isn't set, falls back to the more generic `EDITOR` variable.

In whatever shell you use, you'll need to set and export the `ELIXIR_EDITOR` variable.

For [fish](http://fishshell.com/):

```shell
set -x ELIXIR_EDITOR "codium --goto"
```

For bash/zsh:

```shell
export ELIXIR_EDITOR="codium --goto"
```

`codium`/`code` uses the `--goto` flag to open a file path and go to that line number.

  > Per the `codium -h` documentation, `--goto` can be shortended to `-g`. Since this is a saved command that I'm not typing, I prefer `codium --goto` to remind me of what the command is doing; `-g` seems vague while looking through my environment variables.

All set!

