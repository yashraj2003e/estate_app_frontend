import { useState } from "react";
import "./filter.scss";
import { Link, useSearchParams } from "react-router-dom";

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    city: searchParams.get("location") || "",
    type: searchParams.get("type") || "",
    property: searchParams.get("property") || "",
    minPrice: searchParams.get("minPrice") || 1,
    maxPrice: searchParams.get("maxPrice") || 10000000,
    bedroom: searchParams.get("bedroom") || 1,
  });

  const searchedCity = searchParams.get("location");

  const handleChange = (e) => {
    setQuery((value) => ({ ...value, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    setSearchParams(query);
  };

  return (
    <div className="filter">
      <h1>
        {searchedCity && (
          <p>
            Search results for <b>{searchedCity}</b>
          </p>
        )}
      </h1>
      <form>
        <div className="top">
          <div className="item">
            <label htmlFor="city">Location</label>
            <input
              value={query.city}
              onChange={handleChange}
              type="text"
              id="city"
              name="city"
              placeholder="City Location"
            />
          </div>
        </div>
        <div className="bottom">
          <div className="item">
            <label htmlFor="type">Type</label>
            <select
              name="type"
              id="type"
              onChange={handleChange}
              value={query.type}
            >
              <option value="">any</option>
              <option value="buy">Buy</option>
              <option value="rent">Rent</option>
            </select>
          </div>
          <div className="item">
            <label htmlFor="property">Property</label>
            <select
              name="property"
              id="property"
              onChange={handleChange}
              value={query.property}
            >
              <option value="">any</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="condo">Condo</option>
              <option value="land">Land</option>
            </select>
          </div>
          <div className="item">
            <label htmlFor="minPrice">Min Price</label>
            <input
              type="number"
              id="minPrice"
              min={1}
              onChange={handleChange}
              value={query.minPrice}
              name="minPrice"
              placeholder="any"
            />
          </div>
          <div className="item">
            <label htmlFor="maxPrice">Max Price</label>
            <input
              type="text"
              id="maxPrice"
              name="maxPrice"
              min={1}
              value={query.maxPrice}
              placeholder="any"
              onChange={handleChange}
            />
          </div>
          <div className="item">
            <label htmlFor="bedroom">Bedroom</label>
            <input
              type="text"
              value={query.bedroom}
              id="bedroom"
              min={1}
              name="bedroom"
              placeholder="any"
              onChange={handleChange}
            />
          </div>

          <button type="submit" onClick={handleSubmit}>
            <img src="/search.png" alt="" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Filter;
