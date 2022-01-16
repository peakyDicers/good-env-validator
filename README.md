# GOOD ENV VALIDATOR

Okay. So, you've got environment variables, some are required for development, some for staging and some for prod. How do you handle this?

You use **GOOD-ENV-VALIDATOR**.

With good-env-validator, you specify what env vars exist, and whether they're required in dev, staging and prod. Then in a single function call, you can check whether or not your environment is valid.

Used with https://github.com/motdotla/dotenv.

The only requirement is that you need the environment variable `APP_ENV` set to `development`, `staging` or `production`.

```typescript
import { validate } from "good-env-validator";

const myRequirements = [
  {
    name: "PORT",
    required: {
      dev: true,
      staging: true,
      prod: false,
    },
  },
  {
    name: "SOME_OTHER_FLAG",
    required: {
      dev: true,
      staging: false,
      prod: false,
    },
  },
];

try {
  validate(myRequirements);
} catch (err) {
  if (err.name === "INVALID_APP_ENV") {
    console.error(
      "process.env.APP_ENV must be set to development, staging or production"
    );
  } else if (err.name === "VARS_MISSING") {
    err.missing.forEach((name) => {
      console.error(`Env var ${name} is required for ${process.env.APP_ENV}`);
    });
  }
  process.exit(1);
}
```
