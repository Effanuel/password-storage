import { generatePassword, scorePassword } from "../utils";

test("Generates strong password", () => {
  const generated_password = generatePassword(15);
  const password_score = scorePassword(generated_password);
  expect(password_score).toBeGreaterThan(40);
});

// describe("Encodes/decodes password", () => {
//   it("encoded and decodes to the same value", async () => {
//     const value = "avs123&***a";
//     const key = "TESTKEY";
//     const encrypted_value = await encrypt(key, value);
//     const decrypted_value = await decrypt(key, encrypted_value);

//     expect(value).toBeEqual(decrypted_value);
//   });
// });
