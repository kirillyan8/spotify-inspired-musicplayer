import React from "react";

import getSongsBySearch from "@/lib/actions/getSongsBySearch";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import SearchContent from "@/app/search/components/SearchContent";
import PageContainer from "@/components/PageContainer";

export const metadata = {
  title: "Search songs",
  description: "On this page you can search for any song",
};

interface SearchProps {
  searchParams: {
    title: string;
  };
}

const SearchPage = async ({ searchParams }: SearchProps) => {
  const songs = await getSongsBySearch(searchParams.title);

  return (
    <PageContainer>
      <Header>
        <h1 className="mb-2 text-3xl font-semibold text-white">Search</h1>
        <SearchInput />
      </Header>
      <SearchContent songs={songs} />
    </PageContainer>
  );
};

export default SearchPage;
