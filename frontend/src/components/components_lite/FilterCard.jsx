import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const FilterCard = () => {
  const filterData = [
    {
      filterType: "Location",
      array: [
        "Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", 
        "Ahmedabad", "Jaipur", "Lucknow", "Indore", "Bhopal", "Patna", "Vadodara", "Surat", "Remote"
      ]
    },
    {
      filterType: "Technology",
      array: [
        "Mern", "Data Scientist", "Full stack", "Frontend", "Backend",
        "Machine Learning ", 
        "App Developer", "React", "Node", "Python", "Java", "desktop",
      ],
    },
    {
      filterType: "Experience",
      array: ["0-3 years", "3-5 years", "5-7 years", "7+ years"],
    },
    {
      filterType: "Salary",
      array: ["0-50k", "50k-100k", "100k-200k", "200k+"],
    },
  ];

  const [selectedValues, setSelectedValues] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (value) => {
    setSelectedValues((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValues));
  }, [selectedValues, dispatch]);

  return (
    <div className="bg-[#131118]/80 backdrop-blur-md border border-neutral-800 rounded-2xl p-6 shadow-2xl h-[85vh] overflow-y-auto custom-scrollbar sticky top-24">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h1 className="font-extrabold text-xl text-white tracking-tight">Filter Jobs</h1>
        {selectedValues.length > 0 && (
          <button 
            onClick={() => setSelectedValues([])}
            className="text-[11px] font-bold text-violet-400 hover:text-violet-300 bg-violet-950/40 border border-violet-900/30 px-2.5 py-1 rounded-lg transition-all"
          >
            Clear All
          </button>
        )}
      </div>
      <hr className="mt-4 border-neutral-800" />

      {/* Filter Sections */}
      <div className="mt-6 space-y-6">
        {filterData.map((data, index) => (
          <div key={index} className="border-b border-neutral-800/40 pb-5 last:border-none">
            <h2 className="font-bold text-sm text-neutral-400 uppercase tracking-wider mb-3">
              {data.filterType}
            </h2>
            
            <div className="space-y-2.5">
              {data.array.map((item, indx) => {
                const itemId = `Id${index}-${indx}`;
                const isChecked = selectedValues.includes(item);
                
                return (
                  <div key={itemId} className="flex items-center space-x-3 group cursor-pointer">
                    <input
                      type="checkbox"
                      id={itemId}
                      value={item}
                      checked={isChecked}
                      onChange={() => handleChange(item)}
                      className="w-4.5 h-4.5 bg-neutral-900 border-neutral-700 checked:bg-violet-600 checked:border-violet-500 rounded focus:ring-violet-500/30 focus:ring-offset-0 cursor-pointer transition-all duration-200 accent-violet-600"
                    />
                    <label 
                      htmlFor={itemId} 
                      className={`text-sm font-medium cursor-pointer transition-colors duration-200 select-none ${
                        isChecked 
                          ? "text-violet-400 font-semibold" 
                          : "text-neutral-400 group-hover:text-neutral-200"
                      }`}
                    >
                      {item}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterCard;