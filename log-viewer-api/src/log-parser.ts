import { createReadStream, ReadStream } from 'fs';
import { createInterface, Interface } from 'readline';

export default async function seedDatabase() {
  const fileStream: ReadStream = createReadStream('../sample.log');

  const rl: Interface = createInterface({
    input     : fileStream,
    crlfDelay : Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in sample.log as a single line break.

  for await (const line of rl) {
    console.log(line);
  }
}

seedDatabase();
