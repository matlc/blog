---
path: "/blog/ways-to-interact-with-elixir-code"
date: "2020-06-03"
title: "Ways to interact with Elixir code"
---

While coding/debugging Elixir, there's a lot of ways to run and interact with code.

Commands directly in IEx

```shell
$ iex
Erlang/OTP 22 [erts-10.7.2] [source] [64-bit] [smp:8:8] [ds:8:8:10] [async-threads:1] [hipe]

Interactive Elixir (1.10.3) - press Ctrl+C to exit (type h() ENTER for help)
iex(1)> 1 + 1
2
iex(2)> m = [1, 2, 3]
[1, 2, 3]
iex(3)> Enum.map(m, &(&1 * 2))
[2, 4, 6]
iex(4)>
```

For general scripts outside of a Mix project:

```shell
$ cat example-script.exs
IO.puts(1 + 1)
m = [1, 2, 3]
IO.inspect(m, label: "Processing: ")
result = Enum.map(m, &(&1 * 2))
IO.inspect(result, label: "Result: "
$ elixir example-script.exs
2
Processing: : [1, 2, 3]
Result: : [2, 4, 6]
```

Script file inside of a Mix project:

```shell
$ mix run lib/example-script.exs
2
Processing: : [1, 2, 3]
Result: : [2, 4, 6]
```

Compile/run script file in IEx:

```shell
$ iex -S mix
Erlang/OTP 22 [erts-10.7.2] [source] [64-bit] [smp:8:8] [ds:8:8:10] [async-threads:1] [hipe]

Interactive Elixir (1.10.3) - press Ctrl+C to exit (type h() ENTER for help)
iex(1)> c "lib/example-script.exs"
2
Processing: : [1, 2, 3]
Result: : [2, 4, 6]
[]
```

Run script file with module in IEx:

```shell
$ cat lib/module-example.exs
defmodule ExampleMod do
  def say_hello() do
    IO.puts("Hello")
  end
end
ExampleMod.say_hello()
$ iex -S mix
Erlang/OTP 22 [erts-10.7.2] [source] [64-bit] [smp:8:8] [ds:8:8:10] [async-threads:1] [hipe]
Interactive Elixir (1.10.3) - press Ctrl+C to exit (type h() ENTER for help)
iex(1)> c "lib/example-script.exs"
Hello
[ExampleMod]
```

Compile then run command to execute in IEx:

```shell
$ cat lib/module-example.exs
defmodule ExampleMod do
  def say_hello() do
    IO.puts("Hello")
  end
end
$ iex -S mix
iex(1)> c "lib/example-script.exs"
[ExampleMod]
iex(2)> ExampleMod.say_hello()
Hello
:ok
```

Execute code within Mix context:

```shell
$ cat lib/greeter.ex
defmodule Greeter do
  def hidey_ho do
    IO.puts("Hidey ho there, neighbor")
  end

  def hidey_ho(num) do
    IO.puts(String.duplicate("Hidey ho there, neighbor!", num))
  end
end
$ mix run -e Greeter.hidey_ho
Compiling 1 file (.ex)
Generated iex-examples app
Hidey ho there, neighbor
$ mix run -e "Greeter.hidey_ho(2)"
Hidey ho there, neighbor!Hidey ho there, neighbor!
```
