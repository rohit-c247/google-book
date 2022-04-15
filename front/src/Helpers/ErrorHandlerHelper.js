export class ErrorHandlerHelper {
  rawError;
  error = {
    code: 500,
    isError: true,
    timestamp: Date.now(),
    error: "Unknown error",
    messages: [],
    data: undefined,
  };
  constructor(err) {
    this.rawError = err;
    this.setError();
  }

  setError = () => {
    if (this.rawError !== undefined)
      this.error.code = this.rawError.status
        ? this.rawError.status
        : this.error.code;
    this.error.timestamp = Date.now();
    this.error.messages = [];
    if (
      this.rawError !== undefined &&
      this.rawError.data &&
      typeof this.rawError.data === "object"
    ) {
      this.error.messages.push(this.rawError.data.message);
    } else {
      this.error.error = "Unknown";
      this.error.messages = ["An unexpected error occured."];
    }
  };
}
