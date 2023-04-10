const crypto = require("crypto");

const MAX_PARTITION_KEY_LENGTH = 256;

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  
  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  if (!event.partitionKey) {
    const stringifiedEvent = JSON.stringify(event);
    // This function will always return a 128 length string so no need to validate it's length.
    return createHash(stringifiedEvent);
  }

  return lengthValidatedKey(event.partitionKey);
};

function createHash(data) {
  return crypto.createHash("sha3-512").update(data).digest("hex");
}

function lengthValidatedKey(key) {
  const stringifiedKey = typeof key === 'string' ? key : JSON.stringify(key);

  if (stringifiedKey.length > MAX_PARTITION_KEY_LENGTH) {
    return createHash(stringifiedKey);
  }

  return stringifiedKey;
}

// exports.deterministicPartitionKeyOld = (event) => {
//   const TRIVIAL_PARTITION_KEY = "0";
//   let candidate;

//   if (event) {
//     if (event.partitionKey) {
//       candidate = event.partitionKey;
//     } else {
//       const data = JSON.stringify(event);
//       candidate = createHash(data);
//     }
//   }

//   if (candidate) { // This if is always true when `event` is truthy
//     if (typeof candidate !== "string") { 
//       candidate = JSON.stringify(candidate); // This is a dead code if flow goes to the `else` part in previous nested if.
//     }
//   } else {
//     candidate = TRIVIAL_PARTITION_KEY; // If event is falsy this value could have returned straight away, because this is the shortast path.
//   }
//   if (candidate.length > MAX_PARTITION_KEY_LENGTH) { // This seems to be a mandatory validation in all cases
//     candidate = createHash(candidate);
//   }
//   return candidate;
// };