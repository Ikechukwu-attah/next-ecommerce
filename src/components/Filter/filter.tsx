"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React from "react";

function Filter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="mt-12 flex justify-between gap-3">
      <div className="flex gap-6 flex-wrap">
        <select
          name="type"
          id=""
          className="py-2 px-4 rounded-2xl font-medium bg-[#EBEDED]"
          onChange={handleFilterChange}
        >
          <option>Type</option>
          <option value={"physical"}>Physical</option>
          <option value={"digital"}>Digital</option>
        </select>
        <input
          type="text"
          name="min"
          placeholder="min price"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
          onChange={handleFilterChange}
        />

        <input
          type="text"
          name="max"
          placeholder="max price"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
          onChange={handleFilterChange}
        />

        <select
          name="category"
          id=""
          className="py-2 px-4 rounded-2xl font-medium bg-[#EBEDED]"
          onChange={handleFilterChange}
        >
          <option>Category</option>
          <option value={"category"}>Category</option>
          <option value={"digital"}>Digital</option>
        </select>

        <select
          name="allFilter"
          id=""
          className="py-2 px-4 rounded-2xl font-medium bg-[#EBEDED]"
          onChange={handleFilterChange}
        >
          <option>All Filters</option>
          <option value={"physical"}>Physical</option>
          <option value={"digital"}>Digital</option>
        </select>
      </div>

      <div className="">
        <select
          name="sort"
          id=""
          className="py-2 px-4 rounded-2xl font-medium bg-[#EBEDED]"
          onChange={handleFilterChange}
        >
          <option>Sort By</option>
          <option value="asc price">Price (low to high)</option>
          <option value="desc price">Price (high to low)</option>
          <option value="asc lastUpdated">Newest</option>
          <option value="desc lastUpdated">Oldest</option>
        </select>
      </div>
    </div>
  );
}

export default Filter;
