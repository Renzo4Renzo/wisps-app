import { getUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchCommunities } from "@/lib/actions/community.actions";
import CommunityCard from "@/components/cards/CommunityCard";

export default async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await getUser(user.id);

  if (!userInfo.onboarded) redirect("/onboarding");

  //Get communities
  const result = await fetchCommunities({ searchString: "", pageNumber: 1, pageSize: 25 });

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>

      {/* Search Bar */}

      <div className="mt-14 flex flex-col gap-9">
        {result.communities.length === 0 ? (
          <p className="no-result">No communities</p>
        ) : (
          <>
            {result.communities.map((community) => (
              <CommunityCard
                key={community.id}
                id={community.id}
                name={community.name}
                username={community.username}
                imgUrl={community.image}
                bio={community.bio}
                members={community.members}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}
