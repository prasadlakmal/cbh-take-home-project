# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

- If the input event is falsy we already have got enough information to return a value. Which is the default value. So there's no point on checking other validations or letting the code execute further.

- If `event.partitionKey` is falsy, again we have got already enough information to make a decision on return value. No point on going further.

- `candidate.length > MAX_PARTITION_KEY_LENGTH` validation logic, we could easily break it into a seperate function. It moves a part of the cognitive compexity away from the main function.

- There are some additional comments I've put in the code.