import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI || process.env.MONGO_URL;
const dbName = process.env.DB_NAME || 'sindhu_cement_works';

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

// In-memory fallback storage for when MongoDB is not connected
interface EnquiryDoc {
  reference: string;
  product_slug: string;
  product_name: string;
  quantity: string;
  unit: string;
  length?: string | null;
  width?: string | null;
  thickness?: string | null;
  requirements?: string | null;
  name: string;
  company?: string | null;
  buyer_type: string;
  phone: string;
  email?: string | null;
  city: string;
  postcode?: string | null;
  timeline?: string | null;
  notes?: string | null;
  consent: boolean;
  created_at: string;
}

interface ContactDoc {
  reference: string;
  name: string;
  phone: string;
  email?: string | null;
  subject?: string | null;
  message: string;
  created_at: string;
}

const memoryStore = {
  enquiries: new Map<string, EnquiryDoc>(),
  contacts: new Map<string, ContactDoc>(),
};

async function getDb(): Promise<Db | null> {
  if (!uri) return null;

  try {
    if (!clientPromise) {
      client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 3000,
      });
      clientPromise = client.connect();
    }
    const connectedClient = await clientPromise;
    return connectedClient.db(dbName);
  } catch (err) {
    console.warn('MongoDB connection unavailable, using fallback in-memory store:', err);
    return null;
  }
}

export async function saveEnquiry(doc: EnquiryDoc): Promise<EnquiryDoc> {
  const db = await getDb();
  if (db) {
    try {
      await db.collection('enquiries').insertOne({ ...doc });
      return doc;
    } catch (err) {
      console.warn('Failed to insert into MongoDB, falling back to memory store:', err);
    }
  }
  memoryStore.enquiries.set(doc.reference.toUpperCase(), doc);
  return doc;
}

export async function getEnquiryByReference(reference: string): Promise<Partial<EnquiryDoc> | null> {
  const ref = reference.toUpperCase();
  const db = await getDb();
  if (db) {
    try {
      const found = await db.collection('enquiries').findOne(
        { reference: ref },
        {
          projection: {
            _id: 0,
            reference: 1,
            product_name: 1,
            quantity: 1,
            unit: 1,
            name: 1,
            city: 1,
            created_at: 1,
          },
        }
      );
      if (found) return found as unknown as Partial<EnquiryDoc>;
    } catch (err) {
      console.warn('Failed to query MongoDB, falling back to memory store:', err);
    }
  }

  const inMem = memoryStore.enquiries.get(ref);
  if (!inMem) return null;
  return {
    reference: inMem.reference,
    product_name: inMem.product_name,
    quantity: inMem.quantity,
    unit: inMem.unit,
    name: inMem.name,
    city: inMem.city,
    created_at: inMem.created_at,
  };
}

export async function saveContactMessage(doc: ContactDoc): Promise<ContactDoc> {
  const db = await getDb();
  if (db) {
    try {
      await db.collection('contact_messages').insertOne({ ...doc });
      return doc;
    } catch (err) {
      console.warn('Failed to insert contact into MongoDB, falling back to memory store:', err);
    }
  }
  memoryStore.contacts.set(doc.reference.toUpperCase(), doc);
  return doc;
}

