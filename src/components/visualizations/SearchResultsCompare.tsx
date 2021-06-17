import { RecommendedVideo } from '@algorithmwatch/harke';
import { faNewspaper } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import _ from 'lodash';
import React, { useState } from 'react';
import { Placement } from 'tippy.js';
import { ScrapingResultSaved } from '../../db/types';
import { Options } from '../Carousel/types';
import Explainer from '../Explainer';

interface SearchResultsCompareDataItem {
  query: string;
  signedInVideos: RecommendedVideo[];
  signedOutVideos: RecommendedVideo[];
}

function VideoList({
  items,
  tippyPlacement,
}: {
  items: RecommendedVideo[];
  tippyPlacement: Placement;
}) {
  return (
    <div className="space-y-2">
      {items.map(({ channelName, duration, id, percWatched, title }) => (
        <div
          key={id}
          className="w-24 h-12 xl:w-28 xl:h-16 bg-gray-300 overflow-hidden flex place-items-center"
        >
          <Tippy
            content={
              <>
                <div className="font-bold">{title}</div>
                <div>{channelName}</div>
              </>
            }
            delay={[250, 0]}
            theme="process-info"
            placement={tippyPlacement}
          >
            <img
              src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
              alt=""
            />
          </Tippy>
        </div>
      ))}
    </div>
  );
}

function Visual({ session }: { session: SearchResultsCompareDataItem }) {
  const [displayCount, setDisplayCount] = useState(10);

  return (
    <div className="flex bg-yellow-200 border-2 border-yellow-400 w-full max-w-2xl mx-auto px-5 py-4 cursor-auto">
      <div className="mr-8 w-80 space-y-3">
        <div className="font-bold text-sm text-yellow-1500 mb-3">
          Ausgangsvideo
        </div>
        <div className="w-80 h-44 bg-gray-300 overflow-hidden flex place-items-center place-content-center">
          <img
            src={`https://img.youtube.com/vi/${session.video.id}/hqdefault.jpg`}
            alt=""
          />
        </div>
        <div className="font-bold leading-snug">{session.video.title}</div>
        <div className="flex">
          <div className="bg-gray-300 rounded-full w-10 h-10 overflow-hidden flex place-items-center place-content-center">
            <img src={session.video.channel.thumbnail} alt="" />
          </div>
          <div className="text-sm ml-2 flex items-center">
            {session.video.channel.name}
          </div>
        </div>

        <div className="mt-4 text-right">
          <input
            className="border border-yellow-1100 bg-yellow-200 rounded-none pl-2 text-sm"
            type="number"
            min="5"
            max="16"
            value={displayCount}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setDisplayCount(Number(event.target.value))
            }
          />
        </div>
      </div>
      <div className="flex">
        <div className="mr-8">
          <div className="font-bold text-sm text-yellow-1500 mb-3">
            Angemeldet
          </div>
          <VideoList
            items={session.signedInVideos.slice(0, displayCount)}
            tippyPlacement="left"
          />
        </div>
        <div className="">
          <div className="font-bold text-sm text-yellow-1500 mb-3">
            Nicht angemeldet
          </div>
          <VideoList
            items={session.signedOutVideos.slice(0, displayCount)}
            tippyPlacement="right"
          />
        </div>
      </div>
    </div>
  );
}

export default function SearchResultsCompare({
  data,
}: {
  data: ScrapingResultSaved[];
}) {
  const queryGroups = _(data)
    .filter({ slug: 'yt-search-results-videos' })
    .groupBy('fields.query')
    .map((items, query) => ({
      query,
      signedInVideos: items[0].fields.videos,
      signedOutVideos: items[1].fields.videos,
    }))
    .value();

  // console.warn('queryGroups', queryGroups);

  const [explainerIsOpen, setExplainerIsOpen] = useState(true);
  const carouselOptions: Options = {
    focusAt: 'center',
    gap: 0,
    peek: 250,
    breakpoints: {
      // 1500: {
      // peek: 400,
      // gap: 40,
      // },
      1400: {
        peek: 250,
        gap: 40,
      },
      1300: {
        peek: 200,
        gap: 40,
      },
      1200: {
        peek: 175,
        gap: 40,
      },
      1100: {
        peek: 0,
        focusAt: 0,
      },
    },
  };

  return (
    <>
      <Explainer
        isOpen={explainerIsOpen}
        onIsOpenChange={(val: boolean) => setExplainerIsOpen(val)}
      >
        <FontAwesomeIcon
          icon={faNewspaper}
          size="6x"
          className="text-blue-200"
        />
        <div className="max-w-prose">
          <h1 className="hl-4xl my-6">News Top 5</h1>
          <p className="mb-4">
            Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas
            Böses getan hätte, wurde er eines Morgens verhaftet. »Wie ein Hund!«
            sagte er, es war, als sollte die Scham ihn überleben.
          </p>
          <p className="mb-4">
            Als Gregor Samsa eines Morgens aus unruhigen Träumen erwachte, fand
            er sich in seinem Bett zu einem ungeheueren Ungeziefer verwandelt.
            Und es war ihnen wie eine Bestätigung ihrer neuen Träume und guten
            Absichten, als am Ziele ihrer Fahrt die Tochter als erste sich erhob
            und ihren jungen Körper dehnte.
          </p>
          <p className="mb-4">
            »Es ist ein eigentümlicher Apparat«, sagte der Offizier zu dem
            Forschungsreisenden und überblickte mit einem gewissermaßen
            bewundernden Blick den ihm doch wohlbekannten Apparat. Sie hätten
            noch ins Boot springen können, aber der Reisende hob ein schweres,
            geknotetes Tau vom Boden, drohte ihnen damit und hielt sie dadurch
            von dem Sprunge ab.
          </p>
          <p className="mb-4">
            In den letzten Jahrzehnten ist das Interesse an Hungerkünstlern sehr
            zurückgegangen. Aber sie überwanden sich, umdrängten den Käfig und
            wollten sich gar nicht fortrühren.
          </p>
          <p className="mb-4">
            Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas
            Böses getan hätte, wurde er eines Morgens verhaftet. »Wie ein Hund!«
            sagte er, es war, als sollte die Scham ihn überleben.
          </p>
          <p className="mb-4">
            Als Gregor Samsa eines Morgens aus unruhigen Träumen erwachte, fand
            er sich in seinem Bett zu einem ungeheueren Ungeziefer verwandelt.
            Und es war ihnen wie eine Bestätigung ihrer neuen Träume und guten
            Absichten, als am Ziele ihrer Fahrt die Tochter als erste sich erhob
            und ihren jungen Körper dehnte.
          </p>
          <p className="mb-4">
            »Es ist ein eigentümlicher Apparat«, sagte der Offizier zu dem
            Forschungsreisenden und überblickte mit einem gewissermaßen
            bewundernden Blick den ihm doch wohlbekannten Apparat. Sie hätten
            noch ins Boot springen können, aber der Reisende hob ein schweres,
            geknotetes Tau vom Boden, drohte ihnen damit und hielt sie dadurch
            von dem Sprunge ab.
          </p>
          <p className="mb-4">
            In den letzten Jahrzehnten ist das Interesse an Hungerkünstlern sehr
            zurückgegangen. Aber sie überwanden sich, umdrängten den Käfig und
            wollten sich gar nicht fortrühren.
          </p>
          <p className="mb-4">
            Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas
            Böses getan hätte, wurde er eines Morgens verhaftet. »Wie ein Hund!«
            sagte er, es war, als sollte die Scham ihn überleben.
          </p>
          <p className="mb-4">
            Als Gregor Samsa eines Morgens aus unruhigen Träumen erwachte, fand
            er sich in seinem Bett zu einem ungeheueren Ungeziefer verwandelt.
            Und es war ihnen wie eine Bestätigung ihrer neuen Träume und guten
            Absichten, als am Ziele ihrer Fahrt die Tochter als erste sich erhob
            und ihren jungen Körper dehnte.
          </p>
          <p className="mb-4">
            »Es ist ein eigentümlicher Apparat«, sagte der Offizier zu dem
            Forschungsreisenden und überblickte mit einem gewissermaßen
            bewundernden Blick den ihm doch wohlbekannten Apparat. Sie hätten
            noch ins Boot springen können, aber der Reisende hob ein schweres,
            geknotetes Tau vom Boden, drohte ihnen damit und hielt sie dadurch
            von dem Sprunge ab.
          </p>
          <p className="mb-4">
            In den letzten Jahrzehnten ist das Interesse an Hungerkünstlern sehr
            zurückgegangen. Aber sie überwanden sich, umdrängten den Käfig und
            wollten sich gar nicht fortrühren.
          </p>
        </div>
      </Explainer>
      <Carousel options={carouselOptions}>
        {queryGroups.length &&
          queryGroups.map((session) => (
            <Slide key={session.query}>
              <Visual session={session} />
            </Slide>
          ))}
      </Carousel>
    </>
  );
}
