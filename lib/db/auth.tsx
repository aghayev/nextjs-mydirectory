export function makeUniqueId(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export async function getUser(username: string, password: string) {
  await new Promise((res) => setTimeout(res, 1000));
  if (username === "admin" && password === "admin") {
    return {
      id: 5,
    };
  }

  return null;
}
