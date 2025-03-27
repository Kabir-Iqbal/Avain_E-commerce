import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// Sanity client setup
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2021-08-31'
});

async function deleteOrders() {
  try {
    const orders = await client.fetch(`*[_type == "order"]{_id}`);

    for (const order of orders) {
      await client.delete(order._id);
      console.log(`✅ Deleted order: ${order._id}`);
    }

    console.log('✅ All orders deleted successfully!');
  } catch (error) {
    console.error('❌ Error deleting orders:', error);
  }
}

deleteOrders();
