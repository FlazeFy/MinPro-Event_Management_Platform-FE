"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { Calendar, ChevronDown, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import AtomText from "../atoms/text.atom";

interface EventCatalogItem {
  id: string;
  image: string;
  priceLabel: string;
  category: string;
  seatsLabel: string;
  title: string;
  time: string;
  location: string;
  ctaLabel: string;
}

interface OrganismEventCatalogProps {
  sortLabel?: string;
  events?: EventCatalogItem[];
}

const defaultEvents: EventCatalogItem[] = [
  {
    id: "wedding-workshop",
    image: "/images/event.jpg",
    priceLabel: "$45.00",
    category: "Lifestyle",
    seatsLabel: "24 Seats Left",
    title: "Minimalist Wedding Workshop",
    time: "10:00 AM - 4:00 PM",
    location: "Grand Plaza Hotel",
    ctaLabel: "Book Ticket",
  },
  {
    id: "acoustic-garden",
    image: "/images/event.jpg",
    priceLabel: "Free",
    category: "Music",
    seatsLabel: "Unlimited",
    title: "Acoustic Garden Sessions",
    time: "6:00 PM - 9:00 PM",
    location: "Community Park",
    ctaLabel: "Register Now",
  },
  {
    id: "retro-esports",
    image: "/images/event.jpg",
    priceLabel: "$25.00",
    category: "Gaming",
    seatsLabel: "10 Seats Left",
    title: "Retro E-Sports Tournament",
    time: "12:00 PM - 8:00 PM",
    location: "The Grid Lounge",
    ctaLabel: "Get Tickets",
  },
];

const OrganismEventCatalog: React.FC<OrganismEventCatalogProps> = ({sortLabel = "Newest First", events = defaultEvents,}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
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
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <AtomText
          type="sub-title"
          text="Event Catalog"
          extraClass="text-primary font-bold"
        />

        <div className="ml-auto flex items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-2 text-sm text-gray-500"
          >
            <span>Sort by:</span>
            <span className="font-semibold text-primary">{sortLabel}</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              className="rounded-full"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              aria-label="Previous events"
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
              aria-label="Next events"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-6 overflow-hidden" ref={emblaRef}>
        <div className="-ml-2 flex">
          {events.map((event) => (
            <div key={event.id} className="min-w-0 flex-[0_0_100%] pl-2 md:flex-[0_0_50%] xl:flex-[0_0_33.3333%]">
              <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.05)]">
                <div className="relative h-40 w-full">
                  <Image src={event.image} alt={event.title} fill className="object-cover" sizes="(min-width: 1280px) 360px, (min-width: 768px) 50vw, 100vw" />
                  <span className="absolute right-3 top-3 rounded-lg bg-[#eef0ff] px-3 py-1 text-sm font-semibold text-primary">{event.priceLabel}</span>
                </div>
                <div className="space-y-4 p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    {event.category}<span className="mx-2 text-gray-300">|</span><span className="normal-case text-gray-500">{event.seatsLabel}</span>
                  </div>
                  <AtomText type="content-title" text={event.title} extraClass="text-[28px] leading-tight font-semibold text-slate-800" />
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /><span>{event.time}</span></div>
                    <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /><span>{event.location}</span></div>
                  </div>
                  <Button className="h-11 w-full rounded-xl bg-[#f2f4fa] text-base font-semibold text-slate-700 hover:bg-[#e9edf8]" variant="ghost">{event.ctaLabel}</Button>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <Button variant="outline" className="h-11 rounded-xl border-gray-300 bg-white px-8 text-base font-semibold text-slate-700 hover:bg-slate-50">Load More Events</Button>
      </div>
    </section>
  );
};

export default OrganismEventCatalog;
