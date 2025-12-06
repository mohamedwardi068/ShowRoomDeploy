import React from 'react';
import { Truck, Award, RotateCcw } from 'lucide-react';

const QualityGoods = () => {
    return (
        // Changed background to dark gray (900) and text to white
        <section className="py-16 md:py-24 px-4 sm:px-6 bg-gray-900 font-inter">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12 md:mb-16">
                    {/* Increased contrast and bolded for impact */}
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 md:mb-6 text-white tracking-tight leading-tight">
                        We Provide <span className="text-cyan-400">High-Quality</span> Goods
                    </h2>
                    {/* Supporting text in lighter gray */}
                    <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed px-2">
                        A client that's unhappy for a reason is a problem, a client that's unhappy though he or she can't articulate why is a challenge we embrace.
                    </p>
                </div>

                {/* Features Grid - Horizontal scroll on mobile */}
                <div className="flex overflow-x-auto pb-8 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0 space-x-4 sm:space-x-6 md:space-x-0 scrollbar-hide">
                    
                    {/* Feature Card Styling (Dark/Contrast) */}
                    <div className="min-w-[85vw] xs:min-w-[300px] sm:min-w-[320px] md:min-w-0 text-center p-6 sm:p-8 group bg-gray-800/50 hover:bg-gray-800 rounded-xl transition-all duration-300 flex-shrink-0 border border-gray-700 hover:border-cyan-500/50 shadow-2xl">
                        <div className="flex justify-center mb-4 sm:mb-6">
                            {/* Icon Circle Styling (Dark base, Cyan accent) */}
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-cyan-900/50 group-hover:scale-110 transition-all duration-300 ring-2 ring-cyan-500/20">
                                <Truck size={32} className="sm:w-9 sm:h-9 text-cyan-400" />
                            </div>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 tracking-wide">
                            Fast Delivery
                        </h3>
                        <p className="text-gray-400 leading-relaxed text-sm sm:text-base max-w-xs mx-auto">
                            Chances are there wasn't collaboration and checkpoints, there wasn't a process. We guarantee speed and reliability.
                        </p>
                    </div>

                    {/* Best Quality */}
                    <div className="min-w-[85vw] xs:min-w-[300px] sm:min-w-[320px] md:min-w-0 text-center p-6 sm:p-8 group bg-gray-800/50 hover:bg-gray-800 rounded-xl transition-all duration-300 flex-shrink-0 border border-gray-700 hover:border-cyan-500/50 shadow-2xl">
                        <div className="flex justify-center mb-4 sm:mb-6">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-cyan-900/50 group-hover:scale-110 transition-all duration-300 ring-2 ring-cyan-500/20">
                                <Award size={32} className="sm:w-9 sm:h-9 text-cyan-400" />
                            </div>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 tracking-wide">
                            Best Quality
                        </h3>
                        <p className="text-gray-400 leading-relaxed text-sm sm:text-base max-w-xs mx-auto">
                            It's content strategy gone awry right from the start. We only source the finest materials and craftsmanship.
                        </p>
                    </div>

                    {/* Free Return */}
                    <div className="min-w-[85vw] xs:min-w-[300px] sm:min-w-[320px] md:min-w-0 text-center p-6 sm:p-8 group bg-gray-800/50 hover:bg-gray-800 rounded-xl transition-all duration-300 flex-shrink-0 border border-gray-700 hover:border-cyan-500/50 shadow-2xl">
                        <div className="flex justify-center mb-4 sm:mb-6">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-cyan-900/50 group-hover:scale-110 transition-all duration-300 ring-2 ring-cyan-500/20">
                                <RotateCcw size={32} className="sm:w-9 sm:h-9 text-cyan-400" />
                            </div>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 tracking-wide">
                            30-Day Free Return
                        </h3>
                        <p className="text-gray-400 leading-relaxed text-sm sm:text-base max-w-xs mx-auto">
                            True enough, but that's not all that it takes to get things back on track out there. Enjoy peace of mind with our return policy.
                        </p>
                    </div>
                </div>
            </div>

            {/* Custom scrollbar hiding utility - add to your CSS */}
            <style jsx>{`
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
};

export default QualityGoods;