import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("sessions.db");

export const initDb = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS sessions (localId TEXT PRIMARY KEY NOT NULL , email TEXT NOT NULL, token TEXT NOT NULL)",
        [],
        () => {
          tx.executeSql(
            "CREATE TABLE IF NOT EXISTS favorites (url TEXT, localId TEXT, gifId TEXT, title TEXT)",
            [],
            () => resolve(),
            (_, error) => reject(error)
          );
        },
        (_, error) => reject(error)
      );
    });
  });
  return promise;
};

export const insertSession = ({ localId, email, token }) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO sessions (localId, email, token) VALUES (?, ?, ?);",
        [localId, email, token],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
  return promise;
};

export const fetchSession = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM sessions",
        [],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
  return promise;
};

export const deleteSession = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM sessions",
        [],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
  return promise;
};

export const addFavoriteGifFromDb = (url, localId, gifId, title) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "INSERT INTO favorites (url, localId, gifId, title) VALUES (?, ?, ?, ?);",

          [url, localId, gifId, title],
          (_, result) => {
            console.log("Favorito agregado con éxito. URL:", url);
            resolve(result);
            console.log("result", result);
          },
          (_, error) => {
            console.log("Error al agregar el favorito:", error);
            reject(error);
          }
        );
      },
      (error) => console.log("Transaction error:", error)
    );
  });
};

export const removeFavoriteGifFromDb = (url, localId, gifId, title) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "DELETE FROM favorites WHERE url = ? AND localId = ? AND gifId = ? AND title = ?",
          [url, localId, gifId, title],
          (_, result) => {
            console.log(
              "Favorito eliminado con éxito. URL:",
              url,
              "Filas afectadas:",
              result.rowsAffected
            );

            resolve(result.rowsAffected);
          },
          (_, error) => {
            console.log("Error al eliminar el favorito:", error);
            reject(error);
          }
        );
      },
      (error) => console.log("Transaction error:", error)
    );
  });
};

export const resetAllFavorites = () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "DELETE FROM favorites",
          [],
          (_, result) => {
            console.log("Se han eliminado todos los favoritos con éxito.");
            resolve(result.rowsAffected);
          },
          (_, error) => {
            console.log("Error al eliminar los favoritos:", error);
            reject(error);
          }
        );
      },
      (error) => console.log("Transaction error:", error)
    );
  });
};

export const getFavoriteGifsFromDb = (localId) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "SELECT gifId, url, title FROM favorites WHERE localId = ?",
          [localId],
          (_, { rows }) => {
            const favorites = [];
            for (let i = 0; i < rows.length; i++) {
              const item = rows.item(i);
              favorites.push({
                url: item.url,
                gifId: item.gifId,
                title: item.title,
              });
            }

            resolve(favorites);
          },
          (_, error) => {
            reject(error);
          }
        );
      },
      (error) => console.log("Transaction error:", error)
    );
  });
};
