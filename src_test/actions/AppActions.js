export const APP_SET_NETWORK_STATE: string = 'APP_SET_NETWORK_STATE';

export function setNetworkState(isConnected: boolean): Object {
  return {
    type: APP_SET_NETWORK_STATE,
    isConnected,
  };
}

export function setAppState(appState: 'active' | 'background' | 'inactive'): Object {
  return {
    type: APP_SET_NETWORK_STATE,
    appState,
  };
}

