//npm i -D del
import { deleteAsync } from "del";

export const reset = async () => {
  return await deleteAsync(global.app.path.clean);
};