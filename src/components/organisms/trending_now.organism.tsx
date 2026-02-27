"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { Calendar, ChevronLeft, ChevronRight, Flame, MapPin } from "lucide-react";
import AtomText from "../atoms/text.atom";
import { Button } from "../ui/button";

interface TrendingEventItem {
  id: string;
  image: string;
  category: string;
  title: string;
  date: string;
  location: string;
}

interface OrganismTrendingNowProps {
  events?: TrendingEventItem[];
}

const defaultTrendingEvents: TrendingEventItem[] = [
  {
    id: "neon-nights",
    image: "/images/event.jpg",
    category: "Music",
    title: "Neon Nights Festival 2024",
    date: "Oct 24, 2024",
    location: "Starlight Arena",
  },
  {
    id: "global-dev-summit",
    image: "/images/event.jpg",
    category: "Tech",
    title: "Global Dev Summit",
    date: "Nov 12, 2024",
    location: "Silicon Valley",
  },
  {
    id: "future-builders",
    image: "/images/event.jpg",
    category: "Startup",
    title: "Future Builders Expo",
    date: "Dec 6, 2024",
    location: "Innovation Hub",
  },
];

const OrganismTrendingNow: React.FC<OrganismTrendingNowProps> = ({events = defaultTrendingEvents}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi)
    return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) 
    return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="w-full">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" />
          <AtomText type="sub-title" text="Trending Now" extraClass="font-bold text-slate-900" />
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            className="rounded-full"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Previous trending events"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            className="rounded-full"
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Next trending events"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-3 flex">
          {events.map((event) => (
            <div
              key={event.id}
              className="min-w-0 flex-[0_0_100%] pl-3 md:flex-[0_0_50%]"
            >
              <article className="relative h-72 overflow-hidden rounded-3xl">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/35 to-black/20" />

                <div className="absolute bottom-0 z-10 flex w-full flex-col gap-3 p-6">
                  <span className="w-fit rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                    {event.category}
                  </span>

                  <AtomText
                    type="sub-title"
                    text={event.title}
                    extraClass="font-bold text-white leading-tight"
                  />

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-200">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      {event.location}
                    </span>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrganismTrendingNow;
