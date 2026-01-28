import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ContentCard, type ContentAsset } from "@/components/content-hub/ContentCard";

const recentContent: ContentAsset[] = [
  {
    id: "1",
    name: "Summer Outfit Haul",
    thumbnail: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300&h=200&fit=crop",
    creator: "Sarah Johnson",
    creatorUsername: "sarah_beautystyle",
    creatorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    type: "video",
    collaboration: "Summer Collection Launch",
    status: "approved",
    readyForAds: true,
    rights: { scope: "paid", duration: "12 months" },
    views: 45200,
    project: "Summer Collection Launch",
    group: "Beauty Influencers",
    date: "Jan 27, 2026",
  },
  {
    id: "2",
    name: "Product Review",
    thumbnail: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&h=200&fit=crop",
    creator: "Mike Chen",
    creatorUsername: "mike_techreview",
    creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    type: "video",
    collaboration: "Product Review Campaign",
    status: "approved",
    readyForAds: true,
    rights: { scope: "paid", duration: "6 months" },
    views: 28100,
    project: "Product Review Campaign",
    group: "Tech Reviewers",
    date: "Jan 27, 2026",
  },
  {
    id: "3",
    name: "Morning Routine",
    thumbnail: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=200&fit=crop",
    creator: "Emily Davis",
    creatorUsername: "emily_lifestyle",
    creatorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    type: "image",
    collaboration: "Lifestyle Campaign",
    status: "approved",
    readyForAds: true,
    rights: { scope: "organic", duration: "perpetual" },
    views: 32500,
    project: "Lifestyle Content Q1",
    group: "Lifestyle Creators",
    date: "Jan 27, 2026",
  },
  {
    id: "4",
    name: "Workout Challenge",
    thumbnail: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&h=200&fit=crop",
    creator: "Alex Rivera",
    creatorUsername: "alex_fitness",
    creatorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    type: "video",
    collaboration: "Health & Wellness",
    status: "approved",
    readyForAds: true,
    rights: { scope: "paid", duration: "12 months" },
    views: 52800,
    project: "Fitness Challenge 2026",
    group: "Fitness Influencers",
    date: "Jan 26, 2026",
  },
  {
    id: "5",
    name: "Recipe Tutorial",
    thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop",
    creator: "Marco Rossi",
    creatorUsername: "marco_cooking",
    creatorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    type: "video",
    collaboration: "Food Content Series",
    status: "approved",
    readyForAds: true,
    rights: { scope: "paid", duration: "12 months" },
    views: 38900,
    project: "Food Content Series",
    group: "Food Creators",
    date: "Jan 26, 2026",
  },
  {
    id: "6",
    name: "Fashion Week Highlights",
    thumbnail: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&h=200&fit=crop",
    creator: "Nina Gonzales",
    creatorUsername: "nina_fashion",
    creatorAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    type: "image",
    collaboration: "Fashion Week 2026",
    status: "approved",
    readyForAds: true,
    rights: { scope: "paid", duration: "6 months" },
    views: 41200,
    project: "Fashion Week 2026",
    group: "Fashion Influencers",
    date: "Jan 26, 2026",
  },
];

export function RecentContent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Content</CardTitle>
        <CardDescription>Latest posts from your creators</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {recentContent.map((content) => (
            <ContentCard
              key={content.id}
              asset={content}
              variant="all"
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
