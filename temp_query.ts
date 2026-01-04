import { db } from './src/lib/db';

async function run() {
  const product = await db.product.findFirst();
  console.log(product?.imageUrl);
  await db.$disconnect();
}

run();