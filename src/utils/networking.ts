// eslint-disable-next-line @typescript-eslint/ban-types
const postJson = (url: string, body: Object) => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });
};

const postSimpleBackend = async (
  simpleBackendUrl: string,
  data: any,
  version: string,
  sessionId: string,
) => {
  const res = await postJson(simpleBackendUrl, {
    version,
    sessionId,
    slug: data.slug,
    data: JSON.stringify(data),
  });
  const json = await res.json();

  if (!json.success) console.warn('error posting data to simple backend');
};

const getActiveCampaigns = async (platformUrl: string) => {
  const url = `${platformUrl}/api/campaigns/`;
  const activeCampaigns = await (await fetch(url)).json();
  return activeCampaigns;
};

const postEvent = async (
  platformUrl: string,
  campaign: any,
  message: string,
  data: any,
) => {
  const url = `${platformUrl}/api/events/`;
  const res = await postJson(url, { campaign, message, data });
  if (!res.ok) console.warn(res);
};

const postDonation = async (result) => {};

export { getActiveCampaigns, postSimpleBackend, postEvent };
