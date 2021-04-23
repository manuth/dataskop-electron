type GetCurrentHtml = () => Promise<string>;

type GetHtmlFunction = (url: string) => Promise<GetCurrentHtml>;

type GetHtmlLazyFunction = (
  url: string,
  scrollBottom: number,
  loadingDone: (html: string) => boolean,
  loadingAbort: (html: string) => boolean,
) => Promise<string>;

type SeedCreator = {
  maxVideos: number;
  getVideos: (getHtml: GetHtmlFunction) => Promise<ScrapingResult>;
};

type PersonalScraper = (getHtml: GetHtmlFunction) => Promise<ScrapingResult>;

type ProcedureConfig = {
  // id of videos that are further processed
  seedVideosFixed: Array<string>;
  // function that provides seed videos, including the approx. amount of videos (for the progress bar)
  seedVideosDynamic: Array<SeedCreator>;
  // how many videos to follow for each seed video
  followVideos: number;
  // how often to scroll down for lazy loading
  scrollingBottomForComments: number;
  profileScrapers: Array<PersonalScraper>;
};
