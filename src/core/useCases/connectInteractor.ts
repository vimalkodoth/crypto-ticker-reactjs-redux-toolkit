import { ConnectService } from "../services/connectService";

interface IConnect {
  initialize: (pair: string, url?: string) => void;
  on: (event: string, callback: Function) => void;
}
export type IConnectService = () => IConnect;

export const ConnectInteractor: IConnectService = () => {
  let connectService: IConnect;
  return {
    on: (event, callback) => {
      if (!connectService) throw new Error("ConnectService is not initialized");
      return connectService.on(event, callback);
    },
    initialize: (pair, url) => {
      connectService = ConnectService();
      connectService.initialize(pair, url);
    },
  };
};
