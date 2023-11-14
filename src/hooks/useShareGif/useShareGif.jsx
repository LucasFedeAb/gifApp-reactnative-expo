import { useState, useCallback } from "react";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const useShareGif = () => {
  const [isSharing, setIsSharing] = useState(false);

  const shareGif = useCallback(async (gif, message = "Compartir GIF") => {
    try {
      setIsSharing(true);

      const fileUri = FileSystem.cacheDirectory + "gif.gif";
      const response = await FileSystem.downloadAsync(gif, fileUri);

      if (response.status === 200) {
        await Sharing.shareAsync(response.uri, {
          mimeType: "image/gif",
          dialogTitle: message,
        });

        console.log("GIF compartido con éxito");
        await FileSystem.deleteAsync(response.uri, { idempotent: true });
      } else {
        console.error("Error al descargar la imagen GIF");
      }

      setIsSharing(false);
    } catch (error) {
      setIsSharing(false);
      console.error("Error al compartir el GIF", error);
    }
  }, []);

  return { isSharing, shareGif };
};

export default useShareGif;
