'use client';
import { getLinkCard } from "@/lib/api";
import { Metadata } from "fetch-site-metadata";
import React, { useEffect, useState } from "react";

export type LinkCardProps = {
  href: string;
  title?: string;
  children: React.ReactNode;
}

export const LinkCard = ({ href, title, children, ...others }: LinkCardProps) => {
  const [linkCardData, setLinkCardData] = useState(null);
  const dataLinkCard = others['data-linkcard'] as boolean | undefined

  useEffect(() => {
    const fetchLinkCardData = async () => {
      if (dataLinkCard) {
        const data = await getLinkCard(href);
        setLinkCardData(data);
      }
    };

    fetchLinkCardData();
  }, [href, dataLinkCard]);

  if (dataLinkCard) {
    console.info(linkCardData)
    return <div>
      link card
      <a href={href} {...others}>{children}</a>
    </div>
  }
  else {
    return <a href={href} {...others}>{children}</a>
  }
}
