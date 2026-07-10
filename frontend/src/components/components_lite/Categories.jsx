import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const Category = [
    "Frontend Developer", "Backend Developer", "Full Stack Developer", 
    "Mern Developer", "Data Scientist", "Data Analyst", "DevOps Engineer", 
    "Machine Learning Engineer", "Artificial Intelligence Engineer", 
    "Cybersecurity Engineer", "Product Manager", "UX/UI Designer", 
    "Graphics Engineer", "Graphics Designer", "Video Editor"
];

const Categories = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const searchjobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <div className="py-16 bg-[#0a0b10] border-t border-white/[0.03]">
            {/* Section Title */}
            <div className="text-center max-w-xl mx-auto mb-12 px-4">
                <h2 className="text-xs font-bold text-violet-400 uppercase tracking-widest bg-violet-500/10 w-fit mx-auto px-4 py-1.5 rounded-full mb-4">
                    Trending Jobs
                </h2>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
                    Explore Verticals
                </h1>
                <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                    Filter job pools tailored precisely around core ecosystems and tech specializations.
                </p>
            </div>

            <div className="max-w-6xl mx-auto px-4 md:px-12 relative group">
                <Carousel opts={{ align: "start", loop: true }} className="w-full">
                    <CarouselContent className="-ml-4">
                        {Category.map((category, index) => (
                            <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                                <div className="p-1">
                                    <Button 
                                        onClick={() => searchjobHandler(category)}
                                        variant="outline"
                                        className="w-full h-14 bg-white/[0.02] text-slate-300 font-semibold text-sm rounded-xl border border-white/10 hover:border-violet-500 hover:text-white hover:bg-violet-600/20 transition-all duration-300 shadow-md whitespace-nowrap overflow-hidden text-ellipsis px-4 cursor-pointer"
                                    >
                                        {category}
                                    </Button>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    
                    <div className="flex md:block justify-center gap-4 mt-6 md:mt-0">
                        <CarouselPrevious className="static md:absolute top-1/2 md:-translate-y-1/2 left-0 md:-left-4 bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white h-10 w-10 rounded-xl cursor-pointer" />
                        <CarouselNext className="static md:absolute top-1/2 md:-translate-y-1/2 right-0 md:-right-4 bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white h-10 w-10 rounded-xl cursor-pointer" />
                    </div>
                </Carousel>
            </div>
        </div>
    );
};

export default Categories;