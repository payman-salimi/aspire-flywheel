import { AppLayout } from "@/components/layout/AppLayout";
import { TodoList } from "@/components/dashboard/TodoList";
import { DiscoverCreators } from "@/components/dashboard/DiscoverCreators";
import { RecentContent } from "@/components/dashboard/RecentContent";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu, ArrowUp, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-normal">Welcome, Payman</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-black text-white hover:bg-black/90">
                Quick Actions
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>New Campaign</DropdownMenuItem>
              <DropdownMenuItem>Add Creator</DropdownMenuItem>
              <DropdownMenuItem>Create Content Brief</DropdownMenuItem>
              <DropdownMenuItem>Schedule Post</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Time Filter */}
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="h-8">
            Last 30 days
          </Button>
          <Button variant="ghost" size="sm" className="h-8">
            <Menu className="mr-2 h-4 w-4" />
            View More
          </Button>
        </div>

        {/* Metrics Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <div className="bg-card rounded-lg p-4 border">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Creators</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-semibold">2,401</p>
                <ArrowUp className="h-4 w-4 text-green-600" />
              </div>
              <p className="text-xs text-muted-foreground">
                +23% increase MoM
              </p>
            </div>
          </div>

          <div className="bg-card rounded-lg p-4 border">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Content</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-semibold">224</p>
                <ArrowDown className="h-4 w-4 text-red-600" />
              </div>
              <p className="text-xs text-muted-foreground">
                -7% decrease MoM
              </p>
            </div>
          </div>

          <div className="bg-card rounded-lg p-4 border">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Impressions</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-semibold">997K</p>
                <ArrowUp className="h-4 w-4 text-green-600" />
              </div>
              <p className="text-xs text-muted-foreground">
                +12% increase MoM
              </p>
            </div>
          </div>

          <div className="bg-card rounded-lg p-4 border">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Engagement</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-semibold">50K</p>
                <ArrowUp className="h-4 w-4 text-green-600" />
              </div>
              <p className="text-xs text-muted-foreground">
                +11% increase MoM
              </p>
            </div>
          </div>

          <div className="bg-card rounded-lg p-4 border">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">TMV</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-semibold">$997K</p>
                <ArrowUp className="h-4 w-4 text-green-600" />
              </div>
              <p className="text-xs text-muted-foreground">
                +20% increase MoM
              </p>
            </div>
          </div>

          <div className="bg-card rounded-lg p-4 border">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Sales</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-semibold">$50K</p>
                <ArrowUp className="h-4 w-4 text-green-600" />
              </div>
              <p className="text-xs text-muted-foreground">
                +41% increase MoM
              </p>
            </div>
          </div>
        </div>

        {/* Activity Feed and Recommendations Grid */}
        <div className="grid grid-cols-10 gap-6">
          {/* Activity Feed - 40% */}
          <div className="col-span-4">
            <TodoList />
          </div>

          {/* Right Column - 60% */}
          <div className="col-span-6 flex flex-col gap-6">
            {/* Recommendation Box */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg p-6 border">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold mb-2">
                    It's time to launch your Mother's Day campaign.
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Based on our estimates, a $10,000 budget could generate $25,000 in organic sales.
                    Furthermore, by increasing your Paid spend by just 15%, we project total sales could
                    reach $40,000. Shall I begin the recruitment process for you?
                  </p>
                  <div className="flex items-center gap-3">
                    <Button className="bg-black text-white hover:bg-black/90">
                      Yes, let's start
                    </Button>
                    <Button variant="outline">Tell me more</Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Content - Horizontal Scroll */}
            <div className="bg-card rounded-lg border flex-1">
              <div className="p-6 pb-4 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Recent Content</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      Latest posts from your creators
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/assets">More Content</Link>
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <div className="relative">
                  <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                    {/* Content Item 1 */}
                    <div className="group cursor-pointer flex-shrink-0 w-[180px]">
                      <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3">
                        <img
                          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=533&fit=crop"
                          alt="Mason Wilson"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                          </svg>
                        </div>
                        <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-white border-2 border-white overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" alt="Mason Wilson" className="w-full h-full object-cover" />
                          </div>
                          <span className="text-xs font-medium text-white drop-shadow-lg">Mason Wilson</span>
                        </div>
                      </div>
                    </div>

                    {/* Content Item 2 */}
                    <div className="group cursor-pointer flex-shrink-0 w-[180px]">
                      <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3">
                        <img
                          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=533&fit=crop"
                          alt="Sophia Anderson"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                          </svg>
                        </div>
                        <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-white border-2 border-white overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face" alt="Sophia Anderson" className="w-full h-full object-cover" />
                          </div>
                          <span className="text-xs font-medium text-white drop-shadow-lg">Sophia Anderson</span>
                        </div>
                      </div>
                    </div>

                    {/* Content Item 3 */}
                    <div className="group cursor-pointer flex-shrink-0 w-[180px]">
                      <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3">
                        <img
                          src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=533&fit=crop"
                          alt="Noah Brown"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                          </svg>
                        </div>
                        <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-white border-2 border-white overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" alt="Noah Brown" className="w-full h-full object-cover" />
                          </div>
                          <span className="text-xs font-medium text-white drop-shadow-lg">Noah Brown</span>
                        </div>
                      </div>
                    </div>

                    {/* Content Item 4 */}
                    <div className="group cursor-pointer flex-shrink-0 w-[180px]">
                      <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3">
                        <img
                          src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=533&fit=crop"
                          alt="Emma Davis"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                          </svg>
                        </div>
                        <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-white border-2 border-white overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" alt="Emma Davis" className="w-full h-full object-cover" />
                          </div>
                          <span className="text-xs font-medium text-white drop-shadow-lg">Emma Davis</span>
                        </div>
                      </div>
                    </div>

                    {/* Content Item 5 */}
                    <div className="group cursor-pointer flex-shrink-0 w-[180px]">
                      <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3">
                        <img
                          src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=533&fit=crop"
                          alt="Alex Rivera"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                          </svg>
                        </div>
                        <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-white border-2 border-white overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="Alex Rivera" className="w-full h-full object-cover" />
                          </div>
                          <span className="text-xs font-medium text-white drop-shadow-lg">Alex Rivera</span>
                        </div>
                      </div>
                    </div>

                    {/* Content Item 6 */}
                    <div className="group cursor-pointer flex-shrink-0 w-[180px]">
                      <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3">
                        <img
                          src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=533&fit=crop"
                          alt="Marco Rossi"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                          </svg>
                        </div>
                        <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-white border-2 border-white overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" alt="Marco Rossi" className="w-full h-full object-cover" />
                          </div>
                          <span className="text-xs font-medium text-white drop-shadow-lg">Marco Rossi</span>
                        </div>
                      </div>
                    </div>

                    {/* Content Item 7 */}
                    <div className="group cursor-pointer flex-shrink-0 w-[180px]">
                      <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3">
                        <img
                          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=533&fit=crop"
                          alt="Nina Garcia"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                          </svg>
                        </div>
                        <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-white border-2 border-white overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face" alt="Nina Garcia" className="w-full h-full object-cover" />
                          </div>
                          <span className="text-xs font-medium text-white drop-shadow-lg">Nina Garcia</span>
                        </div>
                      </div>
                    </div>

                    {/* Content Item 8 */}
                    <div className="group cursor-pointer flex-shrink-0 w-[180px]">
                      <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3">
                        <img
                          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=533&fit=crop"
                          alt="Lucas Thompson"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                          </svg>
                        </div>
                        <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-white border-2 border-white overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face" alt="Lucas Thompson" className="w-full h-full object-cover" />
                          </div>
                          <span className="text-xs font-medium text-white drop-shadow-lg">Lucas Thompson</span>
                        </div>
                      </div>
                    </div>

                    {/* Content Item 9 */}
                    <div className="group cursor-pointer flex-shrink-0 w-[180px]">
                      <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3">
                        <img
                          src="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=533&fit=crop"
                          alt="Sarah Kim"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                          </svg>
                        </div>
                        <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-white border-2 border-white overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face" alt="Sarah Kim" className="w-full h-full object-cover" />
                          </div>
                          <span className="text-xs font-medium text-white drop-shadow-lg">Sarah Kim</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Discover Creators */}
            <DiscoverCreators />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
