const TAB_ID_KEY = "hcm_game_tab_id";
const CHANNEL_NAME = "hcm_game_tab_channel";

export function getOrCreateTabId() {
  let tabId = sessionStorage.getItem(TAB_ID_KEY);

  if (!tabId) {
    tabId = crypto.randomUUID();
    sessionStorage.setItem(TAB_ID_KEY, tabId);
  }

  return tabId;
}

export function resetTabId() {
  const tabId = crypto.randomUUID();
  sessionStorage.setItem(TAB_ID_KEY, tabId);
  return tabId;
}

export function ensureUniqueTabId() {
  const tabId = getOrCreateTabId();
  const channel = new BroadcastChannel(CHANNEL_NAME);

  channel.onmessage = (event) => {
    if (event.data?.type === "CHECK_TAB_ID" && event.data?.tabId === tabId) {
      channel.postMessage({
        type: "TAB_ID_EXISTS",
        tabId
      });
    }

    if (event.data?.type === "TAB_ID_EXISTS" && event.data?.tabId === tabId) {
      const newTabId = resetTabId();

      sessionStorage.removeItem("role");
      sessionStorage.removeItem("playerId");
      sessionStorage.removeItem("roomCode");
      sessionStorage.removeItem("activeMapId");

      console.warn("[TabIdentity] Duplicate tab detected. Generated new tabId", {
        oldTabId: tabId,
        newTabId
      });
    }
  };

  channel.postMessage({
    type: "CHECK_TAB_ID",
    tabId
  });

  return tabId;
}
