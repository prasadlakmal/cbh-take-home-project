const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when event is falsy", () => {
    const mockEvent = undefined;
    // if someone refactors the function adding a default param value the test will be invalid. So passng `undefined` explicitly.
    const trivialKey = deterministicPartitionKey(mockEvent);
    expect(trivialKey).toBe("0");
  });

  it("Returns a valid key when partitionKey is falsy", () => {
    const mockEvent = { partitionKey: undefined };
    const trivialKey = deterministicPartitionKey(mockEvent);
    expect(trivialKey).toBe("c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862");
  });

  it("Returns a valid key when partitionKey is truthy and length < 256", () => {
    const mockEvent = { partitionKey: "1".repeat(255) };
    const trivialKey = deterministicPartitionKey(mockEvent);
    expect(trivialKey).toBe(mockEvent.partitionKey);
  });

  it("Returns a valid key when partitionKey is truthy and length = 256", () => {
    const mockEvent = { partitionKey: "1".repeat(256) };
    const trivialKey = deterministicPartitionKey(mockEvent);
    expect(trivialKey).toBe(mockEvent.partitionKey);
  });

  it("Returns a valid key when partitionKey is truthy and length > 256", () => {
    const mockEvent = { partitionKey: "1".repeat(257) };
    const trivialKey = deterministicPartitionKey(mockEvent);
    expect(trivialKey).toBe("3f2e417dd3287bb9d5a0e47a8a25191210abdd7739d882cea800f3180dc91508c047c737c51abad48d4d4f2469776294e2b4d9de0af65bffb147d7655ff49fa8");
  });

  it("Returns a valid key when partitionKey is not a string", () => {
    const mockEvent = { partitionKey: 11111111 };
    const trivialKey = deterministicPartitionKey(mockEvent);
    expect(trivialKey).toBe(String(mockEvent.partitionKey));
  });
});
