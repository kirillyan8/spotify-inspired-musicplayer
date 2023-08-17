"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import qs from "query-string";

import useDebounce from "@/hooks/useDebounce";
import Input from "@/components/Input";

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value);

  useEffect(() => {
    setValue(window.location.href.split("=")[1] ?? "");
  }, []);

  useEffect(() => {
    if (debouncedValue) {
      const query = {
        title: debouncedValue,
      };

      const url = qs.stringifyUrl({
        url: "/search",
        query: query,
      });

      router.push(url);
    } else {
      router.push("/search");
    }
  }, [debouncedValue, router]);

  return (
    <div>
      <Input
        type="search"
        placeholder="What song you want to hear now?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
