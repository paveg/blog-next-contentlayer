'use client';
import GithubSlugger from 'github-slugger';
import { useEffect, useRef, useState } from 'react';
import { ReaderIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Props = {
  source: string;
};

type UseIntersectionObserverType = (setActiveId: (id: string) => void) => void;

const useIntersectionObserver: UseIntersectionObserverType = (setActiveId) => {
  const headingElementsRef = useRef<{
    [key: string]: IntersectionObserverEntry;
  }>({});

  useEffect(() => {
    const callback = (headings: IntersectionObserverEntry[]) => {
      headingElementsRef.current = headings.reduce((map, headingElement) => {
        map[headingElement.target.id] = headingElement;

        return map;
      }, headingElementsRef.current);

      const visibleHeadings: IntersectionObserverEntry[] = [];

      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key];
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
      });

      const getIndexFromId = (id: string) =>
        headingElements.findIndex((heading) => heading.id === id);

      if (visibleHeadings.length === 1) {
        setActiveId(visibleHeadings[0].target.id);
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort(
          (a, b) => getIndexFromId(b.target.id) - getIndexFromId(a.target.id)
        );

        setActiveId(sortedVisibleHeadings[0].target.id);
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: '0px 0px -70% 0px',
    });

    const headingElements = Array.from(
      document.querySelectorAll('article h2,h3')
    );

    headingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [setActiveId]);
};

export const TableOfContents = ({ source }: Props) => {
  const headingLines = source
    .split('\n')
    .filter((line) => line.match(/^###?\s/));
  const headings = headingLines.map((raw) => {
    const text = raw.replace(/^###*\s/, '');
    const level = raw.slice(0, 3) === '###' ? 3 : 2;
    const slugger = new GithubSlugger();

    return {
      text,
      level,
      id: slugger.slug(text),
    };
  });

  const [activeId, setActiveId] = useState<string>();

  useIntersectionObserver(setActiveId);

  return (
    <div className="mt-10">
      <div className="mb-3 flex items-center gap-1.5">
        <ReaderIcon className="size-4" />
        <span className="text-lg font-semibold transition-colors">Outline</span>
      </div>
      <div className="flex flex-col items-start justify-start">
        {headings.map((heading, index) => {
          return (
            <Button
              key={index}
              size="sm"
              variant="link"
              className={cn(
                heading.id === activeId ? 'font-bold underline' : 'font-normal',
                heading.level === 3 && 'pl-6',
                'text-left text-sm transition-colors'
              )}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(`#${heading.id}`)?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                  inline: 'nearest',
                });
              }}
            >
              {heading.text}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
