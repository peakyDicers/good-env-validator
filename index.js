const validate = (vars) => {
  if (
    process.env.APP_ENV !== "staging" &&
    process.env.APP_ENV !== "development" &&
    process.env.APP_ENV !== "production"
  ) {
    const err = new Error();
    err.name = "INVALID_APP_ENV";
    throw err;
  }

  const mode =
    process.env.APP_ENV === "production"
      ? "prod"
      : process.env.APP_ENV === "development"
      ? "dev"
      : "staging";

  let isMissing = false;
  const missing = [];
  for (let i = 0; i < vars.length; i++) {
    if (vars[i].required[mode] && !process.env[vars[i].name]) {
      missing.push(vars[i].name);
      isMissing = true;
    }
  }

  if (isMissing) {
    const err = new Error();
    err.name = "VARS_MISSING";
    err.missing = missing;
    throw err;
  }
};

module.exports = {
  validate: validate
}
