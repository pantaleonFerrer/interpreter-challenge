
# Intcode interpreter

## How to start

### Dev: 

`npm install`

`npm run dev`

### Dist:

`npm install`

`npm run build`

`npm start`

## What do we expect from this test?

We expect you to create an interpreter which fulfills our requirements and still be open for more additions and/or modifications.

The interpreter should be fully testable. There are no strange third party dependencies, so it can be fully developed by following TDD and have 100% coverage of unit tests. We don't ask for 100% coverage, though. Test the parts you consider most relevant.

This challenge will allow you to show us your understanding of SOLID principles and offers very good opportunities for implementing design patterns, so we expect to see some of that in your solution.

---

## Part 1

We need you to build an Intcode interpreter.

An Intcode program is a list of integers separated by commas which represent an instructions and parameters. Programs always finish with `99`. Encountering an unknown opcode means something went wrong.

We need you to implement two basic instructions for the language.

* Opcode `1`. Adds together numbers read from two positions **from the program** and stores the result in a third position.
    * The three integers **immediately after** the opcode tell you these three positions. 
    * Positions one and two indicate the **positions** from which you should read the input values.
    * Third position tells you where to store the output.

For example, this Intcode program `1, 10, 20, 30` reads values from `10` and `20`, add those values, and then overwrite the value at position `30` with their sum.

* Opcode `2`. Works exactly like opcode 1, except it **multiplies** the two inputs instead of adding them.
    * Again, the three arguments it accepts indicate **positions**, not their values.

Once you're done processing an opcode, move to the next one by stepping forward `4` positions.

### Part 1 example

Given the program:

`1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50`

We can split it into:

```
1, 9, 10, 3
2, 3, 11, 0,
99,
30, 40, 50
```

The first four integers represent an opcode `1`. We need to sum numbers from positions `9` and `10` in the program and store it at position `3`.

First, we need to get the values at the input positions. Position `9` contains `30` and positions `10` contains `40`. We add these numbers so we get `70`. Then, we store this value at the output position, which is `3`.

After running this opcode the program looks like this:

```
1, 9, 10, 70,
2, 3, 11, 0,
99,
30, 40, 50
```

Next, we step `4` positions and encounter an opcode `2`. It tells us to multiply inputs from positions `3` and `11` and store the result at `0`. The result of that operation would leave the program like this:

```
3500, 9, 10, 70,
2, 3, 11, 0,
99,
30, 40, 50
```

Then, we move forward `4` positions again, encountering a 99 and halting the program.

### More examples

* `1, 0, 0, 0, 99` becomes `2, 0, 0, 0, 99`
* `2, 3, 0, 3, 99` becomes `2, 3, 0, 6, 99`
* `2, 4, 4, 5, 99, 0` becomes `2, 4, 4, 5, 99, 9801`
* `1, 1, 1, 4, 99, 5, 6, 0, 99` becomes `30, 1, 1, 4, 2, 5, 6, 0, 99`

---
## Part 2

We are going to add two new instructions to the Intcode language.

* Opcode `3` takes a single integer as input and saves it to the position given by its only parameter.
    * For example, the instruction `3, 50` would take an input value from the user and store it at address 50.
* Opcode `4` outputs the value of its only parameter.
    * For example, the instruction `4, 50` would print the value at address 50.

The program `3, 0, 4, 0, 99` will output whatever it gets as input and then will halt.

---
### Part 3

We are going to add **parameter modes** to the interpreter.

Each parameter of an instruction is handled based on its paremeter mode. Right now, your interpreter already understands parameter mode `0`, **position mode**, which causes the parameter to be interpreted as a **position**.
A parameter with value `50` means that you need to look whats inside position `50` to know the value.

Now we need to handle parameters in mode `1`, **inmediate mode**. In immediate mode, a paremter is interpreted as **value**. If the paremeter is `50`, its values is simply `50`.

Parameter modes will be stored in the same value as the instruction's opcode. Opcode is a two-digit number based only on the ones and tens digit of the value. Parameter modes are single digits, one per parameter, read right-to-left from the opcode.

For example, consider the program `1002, 4, 3, 4, 33`.

The first instruction is a **multiply instruction** and parameters are one positional and the other immediate:

```
ABCDE
 1002

DE - Two digit opcode,      02 == opcode 2
 C - mode of 1st parameter,  0 == position mode
 B - mode of 2nd parameter,  1 == immediate mode
 A - mode of 3rd parameter,  0 == position mode,
                                  omitted due to being a leading zero
```

This instruction multiplies its first two parameters. The first, `4` in position mode works like it did before. The second parameter, `3` in immediate mode, simply has value 3. The result of this operation, `33*3 == 9`, is written according to the third parameter, `4` in position mode.

Parameters that an instruction writes to will **never be in immediate mode**
