function Filter() {
  return (
    <div className="mt-12 flex justify-between gap-3">
      <div className="flex gap-6 flex-wrap">
        <select
          name="type"
          id=""
          className="py-2 px-4 rounded-2xl font-medium bg-[#EBEDED]"
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
        />

        <input
          type="text"
          name="max"
          placeholder="max price"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
        />
        <select
          name="type"
          id=""
          className="py-2 px-4 rounded-2xl font-medium bg-[#EBEDED]"
        >
          <option>Size</option>
          <option value={""}>Size</option>
        </select>

        <select
          name="type"
          id=""
          className="py-2 px-4 rounded-2xl font-medium bg-[#EBEDED]"
        >
          <option>Type</option>
          <option value={"physical"}>Physical</option>
          <option value={"digital"}>Digital</option>
        </select>

        <select
          name="category"
          id=""
          className="py-2 px-4 rounded-2xl font-medium bg-[#EBEDED]"
        >
          <option>Category</option>
          <option value={"category"}>Category</option>
          <option value={"digital"}>Digital</option>
        </select>

        <select
          name="allFilter"
          id=""
          className="py-2 px-4 rounded-2xl font-medium bg-[#EBEDED]"
        >
          <option>All Filters</option>
          <option value={"physical"}>Physical</option>
          <option value={"digital"}>Digital</option>
        </select>
      </div>

      <div className="">
        <select
          name=""
          id=""
          className="py-2 px-4 rounded-2xl font-medium bg-[#EBEDED]"
        >
          <option value={""}>Sort By</option>
          <option value={"physical"}>Price (low to high)</option>
          <option value={"digital"}>Price (high to low)</option>
          <option value={"digital"}>Newest </option>
          <option value={"digital"}>Oldest</option>
        </select>
      </div>
    </div>
  );
}

export default Filter;
