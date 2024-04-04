import { openDB } from "idb";

const initdb = async () => {
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });
};

//  Added logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB("jate", 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction("jate", "readwrite");

  // Get the object store from the transaction.
  const store = tx.objectStore("jate");

  // Clear the database.
  await store.clear();

  // If content is a string, create a new object that includes the string as a property.
  if (typeof content === "string") {
    content = { value: content };
  }

  // Set the 'id' property to 1.
  content.id = 1;

  // Use the .add() method to add data to the database.
  const request = store.add(content);

  // Get confirmation of the request.
  const result = await request;
  return result;
};

//  Added logic for a method that gets all the content from the database
export const getDb = async () => {
  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB("jate", 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction("jate", "readonly");

  // Get the object store from the transaction.
  const store = tx.objectStore("jate");

  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();

  // Get confirmation of the request.
  const result = await request;
  return result;
};
// Start the database.
initdb();
