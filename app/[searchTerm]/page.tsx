import React from "react";
import getWikiResult from "@/lib/getWikiResult";
import { promises } from "dns";
import { describe } from "node:test";
import Item from "./components/Item";

type Props = {
  params: {
    searchTerm: string;
  };
};

export async function generateMetadata( {params: {searchTerm}} : Props) {
  const wikiData: Promise<SearchResult> = getWikiResult(searchTerm);
  const data = await wikiData;
  const displayTerm = searchTerm.replaceAll('20%', ' ');

  if(!data?.query?.pages) {
    return{
      title: `${searchTerm} not found`
    }
  }
  else{
    return{
      title: displayTerm,
      description: `search result for ${displayTerm}`
    }
  }
}

export default async function SearchResult({ params: { searchTerm } }: Props) {
  const wikiData: Promise<SearchResult> = getWikiResult(searchTerm);
  const data = await wikiData;
  const results: Result[] | undefined = data?.query?.pages;

  const content = (
    <main className="bg-slate-200 mx-auto max-w-lg py-1 min-h-screen">
      {results ? (
        Object.values(results).map((result, index) => (
          <Item key={result.pageid} result={result}/>
        ))
      ) : (
        <h2 className="p-2 text-xl">{`${searchTerm} not found`}</h2>
      )}
    </main>
  );

  return content
}
